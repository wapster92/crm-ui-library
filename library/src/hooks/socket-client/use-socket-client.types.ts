import { Ref } from 'vue';

export interface ISubscription {
  subscribeMessage: string;
  unsubscribeMessage: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  schema: any;
}

export interface IMessage {
  idMessage: string;
  content: string;
}

export interface IUseSocketClient {
  openEvent: Ref<null | Event>;
  isConnected: Ref<boolean>;
  message: IMessage;
  messageEvent: Ref<null | MessageEvent>;
  closeEvent: Ref<null | CloseEvent>;
  isClosed: Ref<boolean>;
  errorEvent: Ref<null | Event>;
  sendMessage: (message: string) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  subscribe: (subscribeMessage: string, unsubscribeMessage: string, schema: any) => string;
  unsubscribe: (idSubscribe: string) => void;
  subscribeMessages: Ref<Record<string, string>>;
}
export interface IConfig {
  url: string;
  mode?: string;
  cookieAccessName?: string;
  maxAttempts?: number;
  globalMaxAttempts?: number;
  stopRetryCodes?: number[];
}
