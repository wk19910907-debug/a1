import BlogPostPage from '@/components/BlogPostPage'
import { blogPosts } from '@/lib/blogPosts'

export default function BlogPost2() {
  return <BlogPostPage post={blogPosts[1]} />
}
