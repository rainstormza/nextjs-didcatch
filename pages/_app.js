import App, { Container } from 'next/app'
import Error from 'next/error'
import ErrorBoundary from 'react-error-boundary'

export default class MyApp extends App {
  state = {
    hasError: false
  }

  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ hasError: true })
    console.log('CUSTOM ERROR HANDLING', error)
    // This is needed to render errors correctly in development / production
    super.componentDidCatch(error, errorInfo)
  }

  render() {
    const { Component, pageProps } = this.props

    return (
      <ErrorBoundary FallbackComponent={Error}>
        <Container>
          <Component {...pageProps} />
        </Container>
      </ErrorBoundary>
    )
  }
}
