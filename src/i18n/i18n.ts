import {initReactI18next} from 'react-i18next';

import i18next from 'i18next';
import {RecursiveKeyOf} from 'types';

import en from './lang/en';
import jp, {Translations} from './lang/jp';

export enum ECountryCode {
  EN = 'en',
  JP = 'jp',
}

type languageDetectorType = {
  type:
    | 'backend'
    | 'logger'
    | 'languageDetector'
    | 'postProcessor'
    | 'i18nFormat'
    | 'formatter'
    | '3rdParty';
  async: boolean;
  detect: (cb: (value: string) => void) => void;
  init: () => void;
  cacheUserLanguage: () => void;
};

const getLocalize = async (callback: any) => {
  callback(ECountryCode.JP);
};

const languageDetector: languageDetectorType = {
  type: 'languageDetector',
  async: true,
  detect: async (callback: any) => {
    getLocalize(callback);
  },
  init: () => {
    console.log('innit');
  },
  cacheUserLanguage: () => {
    console.log('innit');
  },
};

const initI18n = () => {
  i18next
    .use(languageDetector)
    .use(initReactI18next)
    .init({
      compatibilityJSON: 'v3',
      fallbackLng: ECountryCode.JP,
      lng: ECountryCode.JP,
      debug: true,
      resources: {
        en: {translation: en},
        jp: {translation: jp},
      },
    });
};
export type TxKeyPath = RecursiveKeyOf<Translations>;

export {initI18n};
