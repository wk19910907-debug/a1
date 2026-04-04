import ProductDetailPage from '@/components/ProductDetailPage'
import { productsData } from '@/lib/products'

export default function Product5() {
  return <ProductDetailPage product={productsData[4]} />
}
