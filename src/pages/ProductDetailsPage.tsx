import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ProductDetailsSkeleton } from '../components/Feedback'
import { getProductById } from '../services/api'
import type { Product } from '../types/product'
import { formatCategory, formatPrice, formatRating, getStockInfo } from '../utils/format'

type ProductResult = { product: Product } | { notFound: true } | { error: true } | { loading: true }

export function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const [result, setResult] = useState<ProductResult>({ loading: true })
  const [attempt, setAttempt] = useState(0)
  const [imageFailed, setImageFailed] = useState(false)

  useEffect(() => {
    const productId = Number(id)
    if (!id || !Number.isInteger(productId) || productId < 1) {
      setResult({ notFound: true })
      return
    }

    const controller = new AbortController()
    setResult({ loading: true })
    setImageFailed(false)
    getProductById(productId, controller.signal)
      .then((product) => setResult(
        product.category === 'groceries' ? { product } : { notFound: true },
      ))
      .catch((error: unknown) => {
        if (error instanceof Error && error.name === 'AbortError') return
        if (error instanceof Error && 'status' in error && error.status === 404) {
          setResult({ notFound: true })
          return
        }
        setResult({ error: true })
      })

    return () => controller.abort()
  }, [attempt, id])

  if ('loading' in result) return <div className="page-container"><ProductDetailsSkeleton /></div>

  if ('notFound' in result) {
    return (
      <div className="page-container details-state-wrap">
        <section className="state-panel">
          <span className="state-icon state-error-icon" aria-hidden="true">?</span>
          <h1>Product not found.</h1>
          <p>That item may have moved or is no longer in the collection.</p>
          <Link className="button button-dark" to="/products">Back to Products</Link>
        </section>
      </div>
    )
  }

  if ('error' in result) {
    return (
      <div className="page-container details-state-wrap">
        <section className="state-panel" role="alert">
          <h1>Unable to load this product.</h1>
          <p>Please check your connection and try again.</p>
          <button className="button button-dark" type="button" onClick={() => setAttempt((current) => current + 1)}>Retry</button>
          <Link className="text-link" to="/products">Back to Products</Link>
        </section>
      </div>
    )
  }

  const product = result.product
  const stock = getStockInfo(product.stock)
  return (
    <div className="page-container detail-page">
      <Link className="back-link" to="/products"><span aria-hidden="true">←</span> Back to Products</Link>
      <div className="detail-layout">
        <div className="detail-image-panel">
          <span className="detail-image-note">A closer look</span>
          {!imageFailed ? <img src={product.images[0] || product.thumbnail} alt={product.title} onError={() => setImageFailed(true)} /> : <div className="image-fallback">Image unavailable</div>}
          <span className="detail-image-number">NO. {String(product.id).padStart(3, '0')}</span>
        </div>
        <section className="detail-copy">
          <span className="category-chip">{formatCategory(product.category)}</span>
          <h1>{product.title}</h1>
          <div className="detail-rating"><span aria-hidden="true">★</span> {formatRating(product.rating)} <span className="rating-separator">/</span> 5 <span className="review-count">Customer rating</span></div>
          <div className="detail-price-row"><span className="detail-price">{formatPrice(product.price)}</span><span className="detail-discount">{Math.round(product.discountPercentage)}% off</span></div>
          <div className={`detail-stock ${stock.className}`}><span className="stock-dot" />{stock.label}</div>
          <div className="detail-divider" />
          <h2 className="detail-section-title">The details</h2>
          <p className="detail-description">{product.description}</p>
          <dl className="product-facts">
            <div><dt>Category</dt><dd>{formatCategory(product.category)}</dd></div>
            <div><dt>Brand</dt><dd>{product.brand || 'Independent label'}</dd></div>
            <div><dt>Availability</dt><dd>{product.availabilityStatus}</dd></div>
          </dl>
          <Link className="button button-dark detail-back-button" to="/products">← Back to Products</Link>
        </section>
      </div>
    </div>
  )
}