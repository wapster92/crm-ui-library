import { ref, onMounted, onUnmounted, reactive } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import { useWebSocketStore } from './socket-client-store';
import { JSONSchemaType } from 'ajv';
import { isString } from 'lodash';
import Cookies from 'js-cookie';
import { IConfig, IMessage, ISubscription, IUseSocketClient } from './use-socket-client.types';

export const useSocketClient = ({
  url,
  mode = 'production',
  cookieAccessName = '',
  maxAttempts = 5,
  globalMaxAttempts = 10,
  stopRetryCodes = [],
}: IConfig): IUseSocketClient => {
  const connectUrl = new URL(url);
  if (mode === 'development' && cookieAccessName.length) {
    const token = Cookies.get(cookieAccessName) ?? '';
    connectUrl.searchParams.append('authorization', token);
  }
  const store = useWebSocketStore();
  const uuid: string = uuidv4();
  let socket: null | WebSocket = null;
  let connectionDelay = 500;
  let connectionTimer: number;
  let resetTimer: number;
  let connectionAttempts = 1;
  let globalConnectionAttempts = 1;
  const idsSubscribes: Record<string, ISubscription> = {};
  const openEvent = ref<null | Event>(null);
  const isConnected = ref(false);
  const message = reactive<IMessage>({ idMessage: '', content: '' });
  const messageEvent = ref<null | MessageEvent>(null);
  const closeEvent = ref<null | CloseEvent>(null);
  const isClosed = ref(true);
  const errorEvent = ref<null | Event>(null);
  const subscribeMessages = ref<Record<string, string>>({});
  const sendMessage = (message: string): void => {
    if (isConnected.value) {
      socket?.send(message);
    } else {
      console.warn(`WebSocket по адресу ${url} не подключен`);
    }
  };
  const subscribe = (
    subscribeMessage: string,
    unsubscribeMessage: string,
    schema: JSONSchemaType<unknown>,
    idSub?: string
  ): string => {
    const idSubscribe = store.addSubscription(url, uuid, subscribeMessage, unsubscribeMessage, schema, idSub);
    if (idSubscribe.length) {
      const isSending = store.getSendingSubscribeMessage(url, idSubscribe);
      if (!isSending) {
        sendMessage(subscribeMessage);
        store.setSendingSubscribeMessage(url, idSubscribe); // заменить на экшен
      }
      idsSubscribes[idSubscribe] = { subscribeMessage, unsubscribeMessage, schema };
      subscribeMessages.value[idSubscribe] = store.getLastMessageSubscribe(url, idSubscribe);
      return idSubscribe;
    }
    return '';
  };

  const reSubscribe = (): void => {
    const idsSubscribesKeys = Object.keys(idsSubscribes);
    if (idsSubscribesKeys.length) {
      idsSubscribesKeys.forEach((idSubscribe) => {
        const { subscribeMessage, unsubscribeMessage, schema } = idsSubscribes[idSubscribe];
        subscribe(subscribeMessage, unsubscribeMessage, schema, idSubscribe);
      });
    }
  };

  const unsubscribe = (idSubscribe: string): void => {
    const isDeleted = store.removeSubscription(url, uuid, idSubscribe);
    const unsubscribeMessage = idsSubscribes[idSubscribe].unsubscribeMessage;
    if (isString(unsubscribeMessage) && unsubscribeMessage.length) {
      if (isDeleted) {
        sendMessage(unsubscribeMessage);
      }
      delete idsSubscribes[idSubscribe];
    }
  };

  const safeSubscribeMessage = (payload: string): void => {
    const subscribesIds = Object.keys(idsSubscribes);
    if (subscribesIds.length) {
      const lastMessageObj = store.saveLastMessage(url, subscribesIds, payload);
      if (lastMessageObj) {
        subscribeMessages.value[lastMessageObj.subscribe] = lastMessageObj.payload;
      }
    }
  };

  const handlerOpenConnection = (event: Event): void => {
    openEvent.value = event;
    isConnected.value = true;
    isClosed.value = false;

    connectionDelay = 500;
    connectionAttempts = 1; // сбрасываем счетчик попыток подключения
    // Очищаем старый таймер, если он есть, и устанавливаем новый
    if (resetTimer) clearTimeout(resetTimer);
    resetTimer = window.setTimeout(
      () => {
        globalConnectionAttempts = 1; // обнуляем глобальный счетчик после 1 часа без ошибок
      },
      60 * 60 * 1000
    ); // задержка в 1 час
    reSubscribe();
  };

  const setMessage = (payload: string): void => {
    message.content = payload;
    message.idMessage = uuidv4();
  };

  const handlerMessage = (event: MessageEvent): void => {
    messageEvent.value = event;
    setMessage(event.data);
    safeSubscribeMessage(event.data);
  };

  const handlerCloseConnection = (event: CloseEvent): void => {
    console.warn('Ошибка подключения ', event);
    closeEvent.value = event;
    isClosed.value = true;
    isConnected.value = false;
    removeConnection();
    if (stopRetryCodes.includes(event.code)) {
      return;
    }
    if (resetTimer) clearTimeout(resetTimer);
    if (connectionAttempts < maxAttempts && globalConnectionAttempts < globalMaxAttempts) {
      connectionTimer = window.setTimeout(() => {
        addConnection();
      }, connectionDelay);

      connectionDelay *= 2;
      connectionAttempts += 1; // увеличиваем количество попыток подключения
      globalConnectionAttempts += 1; // увеличиваем количество попыток подключения
    }
  };

  const handlerError = (event: Event): void => {
    errorEvent.value = event;
  };

  const addListeners = (wss: WebSocket | null): void | undefined => {
    if (!wss) {
      console.warn("Can't add listeners: no WebSocket provided.");
      return;
    }
    wss.addEventListener('open', handlerOpenConnection);
    wss.addEventListener('message', handlerMessage);
    wss.addEventListener('close', handlerCloseConnection);
    wss.addEventListener('error', handlerError);
  };

  const removeListeners = (wss: WebSocket | null): void | undefined => {
    if (!wss) {
      console.warn("Can't add listeners: no WebSocket provided.");
      return;
    }
    wss.removeEventListener('open', handlerOpenConnection);
    wss.removeEventListener('message', handlerMessage);
    wss.removeEventListener('close', handlerCloseConnection);
    wss.removeEventListener('error', handlerError);
  };

  const addConnection = (): void => {
    store.addConnection(url, connectUrl.href, uuid);
    socket = store.getSocket(url);
    addListeners(socket);
  };

  const removeConnection = (): void => {
    store.removeConnection(url, uuid);
    removeListeners(socket);
  };

  onMounted(() => {
    addConnection();
  });

  onUnmounted(() => {
    clearTimeout(connectionTimer);
    Object.keys(idsSubscribes).forEach((subscribe) => {
      unsubscribe(subscribe);
    });
    removeConnection();
  });

  return {
    openEvent,
    isConnected,
    message,
    messageEvent,
    closeEvent,
    isClosed,
    errorEvent,
    sendMessage,
    subscribe,
    unsubscribe,
    subscribeMessages,
  };
};
