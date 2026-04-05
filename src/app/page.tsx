'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import FeaturedProducts from '@/components/FeaturedProducts'
import Collections from '@/components/Collections'
import PostsPreview from '@/components/PostsPreview'
import Footer from '@/components/Footer'

interface Product {
  id: string
  name: string
  size: string
  image: string
  category: string
}

export default function Home() {
  const [cart, setCart] = useState<Product[]>([])

  const handleAddToCart = (product: Product) => {
    setCart([...cart, product])
    alert(`${product.name} added to cart!`)
  }

  return (
    <main className="min-h-screen bg-thangka-parchment text-stone-900">
      <Header cartCount={cart.length} />
      <Hero />
      <FeaturedProducts onAddToCart={handleAddToCart} />
      <Collections />
      <PostsPreview />
      <Footer />
    </main>
  )
}
