interface ErrorStateProps {
  message?: string
  onRetry: () => void
}

export function ErrorState({ message = 'Unable to load products.', onRetry }: ErrorStateProps) {
  return (
    <section className="state-panel" role="alert">
      <span className="state-icon state-error-icon" aria-hidden="true">!</span>
      <h2>{message}</h2>
      <p>Something interrupted the request. Please try again.</p>
      <button className="button button-dark" type="button" onClick={onRetry}>Retry</button>
    </section>
  )
}

interface EmptyStateProps {
  onClear: () => void
}

export function EmptyState({ onClear }: EmptyStateProps) {
  return (
    <section className="state-panel">
      <span className="state-icon" aria-hidden="true">⌕</span>
      <h2>No products found.</h2>
      <p>Try changing your search or filter.</p>
      <button className="button button-dark" type="button" onClick={onClear}>Clear filters</button>
    </section>
  )
}

export function ProductGridSkeleton() {
  return (
    <div className="product-grid" aria-label="Loading products" aria-busy="true">
      {Array.from({ length: 8 }, (_, index) => (
        <div className="skeleton-card" key={index}>
          <div className="skeleton skeleton-image" />
          <div className="skeleton-content">
            <div className="skeleton skeleton-short" />
            <div className="skeleton skeleton-title" />
            <div className="skeleton skeleton-price" />
            <div className="skeleton skeleton-button" />
          </div>
        </div>
      ))}
    </div>
  )
}

export function ProductDetailsSkeleton() {
  return (
    <div className="details-skeleton" aria-label="Loading product details" aria-busy="true">
      <div className="skeleton details-skeleton-image" />
      <div className="details-skeleton-copy">
        <div className="skeleton skeleton-short" />
        <div className="skeleton skeleton-title" />
        <div className="skeleton skeleton-price" />
        <div className="skeleton skeleton-description" />
        <div className="skeleton skeleton-description" />
        <div className="skeleton skeleton-button" />
      </div>
    </div>
  )
}