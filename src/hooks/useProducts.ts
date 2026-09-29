import { useEffect, useState } from 'react'
import { getProducts } from '../services/api'
import type { Product } from '../types/product'

interface ProductsState {
  products: Product[]
  loading: boolean
  error: boolean
}

export function useProducts() {
  const [state, setState] = useState<ProductsState>({ products: [], loading: true, error: false })
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    setState((current) => ({ ...current, loading: true, error: false }))

    getProducts(controller.signal)
      .then((products) => setState({
        products: products.filter((product) => product.category === 'groceries'),
        loading: false,
        error: false,
      }))
      .catch((error: unknown) => {
        if (error instanceof Error && error.name === 'AbortError') return
        setState((current) => ({ ...current, loading: false, error: true }))
      })

    return () => controller.abort()
  }, [attempt])

  return { ...state, retry: () => setAttempt((current) => current + 1) }
}