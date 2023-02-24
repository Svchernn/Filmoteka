export const fireBaseErrors = [
  {
    code: 'auth/user-not-found',
    massage_ru: 'Пользователь с такой почтой и паролем не найден',
    message_ua: 'Користувача за цією поштою або паролем не знайдено ',
    message_en: "User with this password or email don'n found ",
  },
  {
    code: 'auth/network-request-failed',
    massage_ru: 'Ошибка подключения . Проверьте наличие интернета.',
    message_ua: 'Помилка підключення. Перевірте наявність інтернета',
    message_en: 'Network error!',
  },
  {
    code: 'auth/email-already-in-use',
    massage_ru: 'Пользователь с такой почтой уже зарегистрирован!',
    message_ua: 'Користувач з такую поштою вже в системі!',
    message_en: 'This email already in use!',
  },
  {
    code: 'auth/login',
    massage_ru:
      'Не авторизированные пользователи не могут пользоваться библиотекой',
    message_ua:
      'Не автризовані користувачи не можуть користуватися бібліотекою!',
    message_en: "Not auth users can't use library. Please  login!",
  },
  {
    code: 'noData/available',
    message_ua: 'Зараз тут пусто',
    message_ru: 'Здесь сейчас пусто',
    message_en: 'Now there is no films here',
  },
  {
    code: 'films/place',
    message_ru: 'Не правильно указан источник',
    message_ua: 'Не правильно вказана папка ',
    message_en: 'Invalid  folder',
  },
  {
    code: 'auth/wrong-password',
    message_ru: 'Не правильный пароль',
    message_ua: 'Не правильно вказано пароль ',
    message_en: 'Invalid  password.',
  },
  {
    code: 'films/film-not-fount',
    message_ru: 'Фильм не найден',
    message_ua: 'Фильм не найден',
    message_en: 'Film not found',
  },
];

const defaultMessage = {
  code: 'default',
  message_ru: 'Что-то пошло не так!',
  message_ua: 'Упс Щось пішло не так!',
  message_en: 'Oops. Something went wrong!',
};

export function returnMessage(inCode, language = 'en') {
  const mes = fireBaseErrors.find(({ code }) => code == inCode);
  if (mes) return mes['message_' + language];

  return defaultMessage['message_' + language];
}
