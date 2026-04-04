import BlogPostPage from '@/components/BlogPostPage'
import { blogPosts } from '@/lib/blogPosts'

export default function BlogPost3() {
  return <BlogPostPage post={blogPosts[2]} />
}
