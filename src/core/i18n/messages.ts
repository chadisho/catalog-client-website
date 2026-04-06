import enMessages from '../../../locales/en.json';
import faMessages from '../../../locales/fa.json';
import type { AppLocale } from './globalLocale';

export type AppMessages = typeof enMessages;

const messagesByLocale: Record<AppLocale, AppMessages> = {
  en: enMessages,
  fa: faMessages,
};

export function getMessages(locale: AppLocale): AppMessages {
  return messagesByLocale[locale];
}
