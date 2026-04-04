import { notFound } from 'next/navigation'
import { collectionsData } from '@/lib/collections'
import CollectionDetailClient from '@/components/CollectionDetailClient'

type Props = {
  params: { slug: string }
}

export function generateStaticParams() {
  return collectionsData.map((c) => ({ slug: c.slug }))
}

export default function CollectionDetailPage({ params }: Props) {
  const current = collectionsData.find((c) => c.slug === params.slug)
  if (!current) notFound()

  const related = collectionsData.filter((c) => c.slug !== current.slug).slice(0, 6)

  return <CollectionDetailClient current={current} related={related} />
}
