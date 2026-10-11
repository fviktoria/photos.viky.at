import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing.config';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !(routing.locales as readonly string[]).includes(locale)) {
    locale = routing.defaultLocale;
  }
  const messageImports: Record<string, () => Promise<{ default: Record<string, unknown> }>> = {
    'de': () => import('../messages/de-AT.json'),
    'en': () => import('../messages/en.json'),
  };
  const messages = (await (messageImports[locale] ?? messageImports[routing.defaultLocale])()).default;

  return {
    locale,
    messages,
  };
});
