import { useMemo, useState } from 'react'
import { EmptyState, ErrorState, ProductGridSkeleton } from '../components/Feedback'
import { ProductCard } from '../components/ProductCard'
import { useProducts } from '../hooks/useProducts'
import { formatCategory } from '../utils/format'

export function ProductsPage() {
  const { products, loading, error, retry } = useProducts()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const categories = useMemo(() => [...new Set(products.map((product) => product.category))].sort(), [products])
  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase()
    return products.filter((product) => product.title.toLocaleLowerCase().includes(normalizedQuery)
      && (category === 'all' || product.category === category))
  }, [category, products, query])
  const clearFilters = () => {
    setQuery('')
    setCategory('all')
  }

  return (
    <div className="page-container catalog-page">
      <section className="catalog-heading">
        <div className="heading-copy">
          <p className="eyebrow"><span className="eyebrow-dot" /> THE GROCERY EDIT</p>
          <h1>Good food,<br /><em>good finds.</em></h1>
          <p className="heading-description">Browse pantry staples and everyday groceries, all in one considered collection.</p>
        </div>
        <div className="heading-stamp" aria-hidden="true"><span>GOOD<br />THINGS</span><span className="stamp-spark">✳</span><span>LIVE HERE</span></div>
      </section>

      <section className="catalog-toolbar" aria-label="Find products">
        <label className="search-control">
          <span className="search-icon" aria-hidden="true" />
          <span className="visually-hidden">Search products by title</span>
          <input type="search" placeholder="Search products by title..." value={query} onChange={(event) => setQuery(event.target.value)} />
          {query && <button className="clear-search" type="button" aria-label="Clear search" onClick={() => setQuery('')}>×</button>}
        </label>
        <label className="filter-control">
          <span className="filter-caption">Category</span>
          <select value={category} onChange={(event) => setCategory(event.target.value)} aria-label="Filter by category">
            <option value="all">All categories</option>
            {categories.map((item) => <option key={item} value={item}>{formatCategory(item)}</option>)}
          </select>
        </label>
      </section>

      <section className="results-section" aria-live="polite">
        <div className="results-heading">
          <h2>Curated finds</h2>
          {!loading && !error && <p><strong>{filteredProducts.length}</strong> {filteredProducts.length === 1 ? 'product' : 'products'} found</p>}
        </div>
        {loading ? <ProductGridSkeleton /> : error ? <ErrorState onRetry={retry} /> : filteredProducts.length === 0 ? <EmptyState onClear={clearFilters} /> : (
          <div className="product-grid">{filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)}</div>
        )}
      </section>
    </div>
  )
}