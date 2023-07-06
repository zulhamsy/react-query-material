import { QueryErrorResetBoundary } from '@tanstack/react-query'
import FallbackError from 'page/fallback'
import { ReactNode } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

export default function ErrorQuery({ children }: { children: ReactNode }) {
	return (
		<QueryErrorResetBoundary>
			{
				({ reset }) => (
					<ErrorBoundary onError={reset} fallbackRender={FallbackError}>{children}</ErrorBoundary>
				)
			}
		</QueryErrorResetBoundary>
	)
}
