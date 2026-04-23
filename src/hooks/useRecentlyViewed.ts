import { useState, useEffect, useCallback } from 'react';

export interface ViewedProduct {
  id: string;
  slug: string;
  name: string;
  price: string;
  image: string;
  category: string;
}

const MAX_HISTORY = 10;
const STORAGE_KEY = 'geco_recently_viewed';

export function useRecentlyViewed() {
  const [viewedProducts, setViewedProducts] = useState<ViewedProduct[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try { 
        setViewedProducts(JSON.parse(stored)); 
      } catch (e) {
        console.error("Error leyendo historial", e);
      }
    }
  }, []);

  // 🚀 LA CORRECCIÓN ESTÁ AQUÍ: Usamos useCallback
  const addProduct = useCallback((product: ViewedProduct) => {
    setViewedProducts(prev => {
      const filtered = prev.filter(p => p.id !== product.id);
      const updated = [product, ...filtered].slice(0, MAX_HISTORY);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []); // El array vacío asegura que la función nunca se re-cree

  return { viewedProducts, addProduct };
}