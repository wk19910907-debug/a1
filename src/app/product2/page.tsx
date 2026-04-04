import ProductDetailPage from '@/components/ProductDetailPage'
import { productsData } from '@/lib/products'

export default function Product2() {
  return <ProductDetailPage product={productsData[1]} />
}
