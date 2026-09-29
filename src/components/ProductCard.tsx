import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { Product } from '../types/product'
import { formatCategory, formatPrice, formatRating, getStockInfo } from '../utils/format'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [imageFailed, setImageFailed] = useState(false)
  const stock = getStockInfo(product.stock)

  return (
    <article className="product-card">
      <Link className="product-image-link" to={`/products/${product.id}`} aria-label={`View ${product.title}`}>
        <div className="product-image-wrap">
          {!imageFailed ? (
            <img className="product-image" src={product.thumbnail} alt={product.title} loading="lazy" onError={() => setImageFailed(true)} />
          ) : (
            <div className="image-fallback">Image unavailable</div>
          )}
          <span className="discount-pill">-{Math.round(product.discountPercentage)}%</span>
        </div>
      </Link>
      <div className="product-card-body">
        <div className="product-meta-row">
          <span className="category-label">{formatCategory(product.category)}</span>
          <span className={`stock-label ${stock.className}`}>{stock.label}</span>
        </div>
        <h2 className="product-title">{product.title}</h2>
        <div className="card-bottom-row">
          <span className="product-price">{formatPrice(product.price)}</span>
          <span className="rating-label" aria-label={`Rated ${formatRating(product.rating)} out of 5`}><span aria-hidden="true">★</span> {formatRating(product.rating)}</span>
        </div>
        <Link className="button button-card" to={`/products/${product.id}`}>View details <span aria-hidden="true">↗</span></Link>
      </div>
    </article>
  )
}