import ProductDetailPage from '@/components/ProductDetailPage'
import { productsData } from '@/lib/products'

export default function Product1() {
  return <ProductDetailPage product={productsData[0]} />
}
