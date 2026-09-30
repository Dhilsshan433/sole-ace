import { useEffect, useState } from 'react'
import api from '../api/axios'

export function useProducts(filters = {}) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(true)
    api.get('/products', { params: filters })
      .then((res) => setProducts(res.data))
      .catch(() => setError('Could not load products'))
      .finally(() => setLoading(false))
  }, [JSON.stringify(filters)])

  return { products, loading, error }
}