/**
 * Logger utility for development and production error logging
 * In production, errors are not logged to console to prevent information leakage
 */

interface LoggerConfig {
  isDevelopment: boolean
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development'

  error(message: string, error?: Error | unknown) {
    if (this.isDevelopment) {
      console.error(`[ERROR] ${message}`, error)
    }
    // In production, integrate with error tracking service like Sentry
    // Sentry.captureException(error, { tags: { context: message } })
  }

  warn(message: string, details?: any) {
    if (this.isDevelopment) {
      console.warn(`[WARN] ${message}`, details)
    }
  }

  log(message: string, data?: any) {
    if (this.isDevelopment) {
      console.log(`[LOG] ${message}`, data)
    }
  }
}

export const logger = new Logger()
