import { ElNotification } from 'element-plus';
import { Position } from './use-notification.enums';
import { IMessageConfig, INotification, INotificationConfig } from './use-notification.types';

export const useNotification = ({
  duration = 5000,
  position = Position.topRight,
}: INotificationConfig = {}): INotification => {
  const config = { duration, position, title: '', showClose: true };
  const notify = ({ title = '', message = '', showClose = true }: IMessageConfig): void => {
    const mergeConfig = { ...config, title, message, showClose, customClass: 'notify' };
    ElNotification(mergeConfig);
  };
  const notifyInfo = ({ title = '', message, showClose = true }: IMessageConfig): void => {
    const mergeConfig = { ...config, title, message, showClose, customClass: 'notify notify--icon notify--info' };
    ElNotification.info(mergeConfig);
  };
  const notifyError = ({ title = 'Ошибка', message, showClose = true }: IMessageConfig): void => {
    const mergeConfig = { ...config, title, message, showClose, customClass: 'notify notify--icon notify--error' };
    ElNotification.error(mergeConfig);
  };
  const notifySuccess = ({ title = '', message, showClose = true }: IMessageConfig): void => {
    const mergeConfig = { ...config, title, message, showClose, customClass: 'notify notify--icon notify--success' };
    ElNotification.success(mergeConfig);
  };
  const notifyWarning = ({ title = '', message, showClose = true }: IMessageConfig): void => {
    const mergeConfig = { ...config, title, message, showClose, customClass: 'notify notify--icon notify--warning' };
    ElNotification.warning(mergeConfig);
  };

  return { notify, notifyInfo, notifySuccess, notifyError, notifyWarning };
};
