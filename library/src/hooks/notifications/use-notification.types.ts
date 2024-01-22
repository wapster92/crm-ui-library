import { Position } from './use-notification.enums';

export interface INotificationConfig {
  position?: Position;
  duration?: number;
}

export interface IMessageConfig {
  title?: string;
  message: string;
  showClose?: boolean;
  useHTML?: boolean;
}

export interface INotification {
  notify: (config: IMessageConfig) => void;
  notifyInfo: (config: IMessageConfig) => void;
  notifySuccess: (config: IMessageConfig) => void;
  notifyError: (config: IMessageConfig) => void;
  notifyWarning: (config: IMessageConfig) => void;
}
