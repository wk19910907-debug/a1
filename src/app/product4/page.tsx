import ProductDetailPage from '@/components/ProductDetailPage'
import { productsData } from '@/lib/products'

export default function Product4() {
  return <ProductDetailPage product={productsData[3]} />
}
