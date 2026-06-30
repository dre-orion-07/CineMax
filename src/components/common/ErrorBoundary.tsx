import { Component, type ReactNode, type ErrorInfo } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
    window.location.href = '/'
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="min-h-screen flex flex-col items-center justify-center px-4 text-center"
          style={{ backgroundColor: 'var(--color-bg-primary)' }}
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
            style={{ backgroundColor: 'var(--color-bg-card)' }}
          >
            <AlertTriangle size={28} style={{ color: 'var(--color-accent-primary)' }} />
          </div>
          <h1
            className="text-2xl font-bold mb-2"
            style={{ color: 'var(--color-text-primary)' }}
          >
            Something Went Wrong
          </h1>
          <p
            className="text-sm mb-6 max-w-md"
            style={{ color: 'var(--color-text-muted)' }}
          >
            We hit an unexpected error. Try refreshing the page, or head back home.
          </p>
          <button
            onClick={this.handleReset}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm cursor-pointer"
            style={{ backgroundColor: 'var(--color-accent-primary)', color: 'white' }}
          >
            <RefreshCw size={16} />
            Back to Home
          </button>
        </div>
      )
    }

    return this.props.children
  }
}