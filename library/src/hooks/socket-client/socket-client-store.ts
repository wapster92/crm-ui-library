import { defineStore } from 'pinia';
import Ajv, { JSONSchemaType } from 'ajv';
import { set } from 'lodash';
import { v4 as uuidv4 } from 'uuid';

interface ISubscription {
  subscribeMessage: string;
  unsubscribeMessage: string | null;
  lastSubscribeMessage: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  subscribeMessageSchema: JSONSchemaType<any>;
  sendingSubscribeMessage: boolean;
  connectionsId: Set<string>;
}
type IdsSubscribes = Record<string, ISubscription>;
interface IConnection {
  socket: WebSocket;
  connections: string[];
  subscriptions: IdsSubscribes;
}
interface ILastMessage {
  subscribe: string;
  payload: string;
}

type WebSocketState = Record<string, IConnection>;
interface IState {
  connections: WebSocketState;
}
const ajv = new Ajv();

const checkCurrentSubscriptions = (subscribes: IdsSubscribes, subscribeMessage: string): string | undefined => {
  const foundSubscribe = Object.entries(subscribes).find((value) => value[1].subscribeMessage === subscribeMessage);
  return foundSubscribe ? foundSubscribe[0] : undefined;
};

export const useWebSocketStore = defineStore('socket-connections', {
  state: (): IState => ({
    connections: {},
  }),
  actions: {
    addConnection(url: string, connectingUrl: string, id: string) {
      if (this.$state.connections[url]) {
        this.$state.connections[url].connections.push(id);
      } else {
        this.$state.connections[url] = {
          socket: new WebSocket(connectingUrl),
          connections: [id],
          subscriptions: {},
        };
      }
    },
    removeConnection(url: string, id: string) {
      if (this.$state.connections[url]) {
        this.$state.connections[url].connections = this.$state.connections[url].connections.filter(
          (connection: string) => connection !== id
        );
        if (!this.$state.connections[url].connections.length) {
          this.$state.connections[url].socket.close();
          delete this.$state.connections[url];
        }
      }
    },

    addSubscription(
      url: string,
      idConnection: string,
      subscribeMessage: string,
      unsubscribeMessage: string | null,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      subscribeMessageSchema: any,
      idSub?: string
    ): string {
      if (!this.$state.connections[url]) {
        return '';
      }
      const stateSubscriptions = this.$state.connections[url].subscriptions;
      // Добавляем новую подписку
      const subscribeObj = {
        subscribeMessage,
        unsubscribeMessage,
        subscribeMessageSchema,
        lastSubscribeMessage: '',
        sendingSubscribeMessage: false,
        connectionsId: new Set([idConnection]),
      };
      const idSubscribe = checkCurrentSubscriptions(stateSubscriptions, subscribeMessage) || idSub || uuidv4();
      const path = `[${idSubscribe}]`;
      if (stateSubscriptions[idSubscribe]) {
        const saveSubscribe = stateSubscriptions[idSubscribe];
        saveSubscribe.connectionsId.add(idConnection);
        set(stateSubscriptions, path, saveSubscribe);
      } else {
        set(stateSubscriptions, path, subscribeObj);
      }
      return idSubscribe;
    },

    setSendingSubscribeMessage(url: string, idSubscribe: string): void {
      if (!this.$state.connections[url]) {
        return;
      }
      this.$state.connections[url].subscriptions[idSubscribe].sendingSubscribeMessage = true;
    },
    removeSubscription(url: string, idConnection: string, idSubscribe: string): boolean {
      if (!this.$state.connections[url]) {
        return false;
      }

      const targetSubscription = this.$state.connections[url].subscriptions[idSubscribe];

      if (targetSubscription.connectionsId.has(idConnection)) {
        targetSubscription.connectionsId.delete(idConnection);
        if (targetSubscription.connectionsId.size === 0) {
          delete this.$state.connections[url].subscriptions[idSubscribe];
          return true;
        }
      }

      return false;
    },
    saveLastMessage(url: string, idSubscribes: string[], payload: string): ILastMessage | void {
      if (!this.$state.connections[url]) {
        return;
      }
      try {
        const data = JSON.parse(payload);
        const subscriptions = this.$state.connections[url].subscriptions;
        for (let i = 0; i < idSubscribes.length; i++) {
          const subscribe = idSubscribes[i];
          const schema = subscriptions[subscribe].subscribeMessageSchema;
          const valid = ajv.validate(schema, data);
          if (valid) {
            subscriptions[subscribe].lastSubscribeMessage = payload;
            return { subscribe, payload };
          }
        }
        return;
      } catch (e) {
        console.error('JSON parse error');
      }
    },
  },
  getters: {
    getSocket(state) {
      return (url: string): WebSocket => {
        return state.connections[url].socket;
      };
    },
    getSendingSubscribeMessage(state) {
      return (url: string, idSubscribe: string): boolean => {
        return state.connections[url].subscriptions[idSubscribe].sendingSubscribeMessage;
      };
    },
    getLastMessageSubscribe(state) {
      return (url: string, idSubscribe: string): string => {
        return state.connections[url].subscriptions[idSubscribe].lastSubscribeMessage;
      };
    },
  },
});
