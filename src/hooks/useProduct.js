import { useEffect, useState } from 'react'
import api from '../api/axios'

export function useProduct(id) {
  const [product, setProduct] = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    Promise.all([api.get(`/products/${id}`), api.get(`/products/${id}/related`)])
      .then(([p, r]) => { setProduct(p.data); setRelated(r.data) })
      .catch(() => setProduct(null))
      .finally(() => setLoading(false))
  }, [id])

  return { product, related, loading }
}