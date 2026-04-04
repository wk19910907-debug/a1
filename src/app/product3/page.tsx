import ProductDetailPage from '@/components/ProductDetailPage'
import { productsData } from '@/lib/products'

export default function Product3() {
  return <ProductDetailPage product={productsData[2]} />
}
