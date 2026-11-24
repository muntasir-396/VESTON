import { Product } from '../types';
import { DEFAULT_PRODUCTS } from '../data/defaultProducts';
import { supabaseClient } from './supabaseClient';

export async function fetchAllProducts(): Promise<Product[]> {
  // 1. First attempt: Fetch from local/hosted Express API endpoint
  try {
    const res = await fetch('/api/products');
    if (res.ok) {
      const contentType = res.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          return data;
        }
      }
    }
  } catch (err) {
    // API endpoint is not active or returned non-JSON (e.g. on Vercel static deployments)
  }

  // 2. Second attempt: Direct client-side fetch from Supabase if credentials are provided
  if (supabaseClient) {
    try {
      const { data, error } = await supabaseClient.from('products').select('*');
      if (!error && Array.isArray(data) && data.length > 0) {
        return data.map((p: any) => ({
          ...p,
          sizeChart: p.size_chart ? (typeof p.size_chart === 'string' ? JSON.parse(p.size_chart) : p.size_chart) : undefined,
          is_available: p.is_available === 1 || p.is_available === true || p.is_available == null
        }));
      }
    } catch (supabaseErr) {
      console.warn('Direct Supabase fetch encountered error:', supabaseErr);
    }
  }

  // 3. Fallback: Return curated luxury catalog (guarantees dresses and products are always displayed)
  return DEFAULT_PRODUCTS;
}

