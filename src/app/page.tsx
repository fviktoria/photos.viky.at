import { routing } from '@/i18n/routing.config';

export default function RootPage() {
  return (
    <html>
      <head>
        <meta httpEquiv="refresh" content={`0; url=/${routing.defaultLocale}`} />
      </head>
      <body />
    </html>
  );
}
