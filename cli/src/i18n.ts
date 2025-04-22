import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          appName: 'My App',
          login: 'Login',
          register: 'Register',
          profile: 'Profile',
          logout: 'Logout',
          language: 'Language',
          darkMode: 'Dark Mode',
          lightMode: 'Light Mode'
        }
      },
      ru: {
        translation: {
          appName: 'Мое Приложение',
          login: 'Вход',
          register: 'Регистрация',
          profile: 'Профиль',
          logout: 'Выход',
          language: 'Язык',
          darkMode: 'Темная тема',
          lightMode: 'Светлая тема'
        }
      },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;