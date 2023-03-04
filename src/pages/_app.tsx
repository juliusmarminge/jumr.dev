import '../styles/globals.css';
import { type AppType } from 'next/app';
import { Analytics } from '@vercel/analytics/react';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

import { api } from '~/lib/api';

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps,
}) => {
  return (
    <>
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
      <Analytics />
    </>
  );
};

export default api.withTRPC(MyApp);
