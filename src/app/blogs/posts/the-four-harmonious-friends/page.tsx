import BlogPostPage from '@/components/BlogPostPage'
import { blogPosts } from '@/lib/blogPosts'

export default function BlogPost1() {
  return <BlogPostPage post={blogPosts[0]} />
}
