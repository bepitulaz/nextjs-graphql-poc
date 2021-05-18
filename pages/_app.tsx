import type { AppProps } from 'next/app'
import '../styles/global.scss'

function NextGraphQLApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default NextGraphQLApp
