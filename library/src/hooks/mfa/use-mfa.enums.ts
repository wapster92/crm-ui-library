export enum SessionTypesEnum {
  // Подтверждения для Passport Service
  addYubikey = 'add_yubikey', // Регистрация у пользователя нового ключа Yubikey
  addGA = 'add_ga', // Привязать Google Authenticator
  deleteGA = 'delete_ga', // Удалить Google Authenticator
  deleteYubikey = 'delete_yubikey', // Удаление у пользоватляя существующего ключа Yubikey
  setConfirmationSms = 'set_confirmation_sms', // Установка SMS в качестве подтверждения в ЛК
  setConfirmationGA = 'set_confirmation_ga', // Установка GA в качестве подтверждения в ЛК
  setConfirmationYubikey = 'set_confirmation_yubikey', // Установка Yubikey в качестве подтверждения в ЛК
  setTwoFactorOff = 'set_two_factor_off', // Отключение 2ФА
  setTwoFactorSms = 'set_two_factor_sms', // Установка SMS в качестве 2ФА
  setTwoFactorGA = 'set_two_factor_ga', // Установка GA в качестве 2ФА
  setTwoFactorYubikey = 'set_two_factor_yubikey', // Установка Yubikey в качестве 2ФА

  // Подтверждения для Trader Profile
  createWalletSecret = 'create_wallet_secret', // Создание секретного кода для белого списка
  resetWalletSecret = 'reset_wallet_secret', // Сброс секретного кода для белого списка
  createWithdraw = 'create_withdraw', // Вывод
  createApiKey = 'create_api_key', // Создание API ключа
  updateApiKey = 'update_api_key', // Изменение настроек API ключа
  deleteApiKey = 'delete_api_key', // Удаление API ключа
  transferBetweenExchanges = 'transfer_between_exchanges', // Перевод между биржами
}
