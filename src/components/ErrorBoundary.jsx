import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error('App crashed:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-paper p-6 text-center">
          <p className="text-6xl font-bold text-accent">!</p>
          <h1 className="text-2xl font-bold">Something went wrong</h1>
          <p className="max-w-sm text-sm text-muted">
            We hit an unexpected problem loading this page. Try refreshing — if it keeps happening, let us know.
          </p>
          <button
            onClick={() => (window.location.href = '/')}
            className="mt-2 rounded-xl bg-ink px-6 py-3 text-sm font-semibold text-white"
          >
            Back to home
          </button>
        </div>
      )
    }
    return this.props.children
  }
}