"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Calendar, 
  User,
  MessageSquare
} from "lucide-react"

interface Post {
  id: string
  title: string
  content?: string
  published: boolean
  createdAt: string
  updatedAt: string
  author: {
    id: string
    name?: string
    email: string
  }
}

interface PostsListProps {
  onCreatePost?: () => void
  onEditPost?: (post: Post) => void
  onViewPost?: (post: Post) => void
}

export function PostsList({ onCreatePost, onEditPost, onViewPost }: PostsListProps) {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/posts')
      if (!response.ok) {
        throw new Error('Failed to fetch posts')
      }
      const data = await response.json()
      setPosts(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleDeletePost = async (postId: string) => {
    if (!confirm('Are you sure you want to delete this post?')) {
      return
    }

    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
      })
      
      if (!response.ok) {
        throw new Error('Failed to delete post')
      }
      
      setPosts(posts.filter(post => post.id !== postId))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete post')
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="p-6">
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-3 bg-muted rounded w-1/2"></div>
              <div className="h-3 bg-muted rounded w-full"></div>
            </div>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <Card className="p-6">
        <div className="text-center text-destructive">
          <p>Error: {error}</p>
          <Button onClick={fetchPosts} variant="outline" className="mt-2">
            Try Again
          </Button>
        </div>
      </Card>
    )
  }

  if (posts.length === 0) {
    return (
      <Card className="p-12 text-center">
        <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">No posts yet</h3>
        <p className="text-muted-foreground mb-4">
          Get started by creating your first post.
        </p>
        {onCreatePost && (
          <Button onClick={onCreatePost}>
            <Plus className="mr-2 h-4 w-4" />
            Create Post
          </Button>
        )}
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Posts</h2>
        {onCreatePost && (
          <Button onClick={onCreatePost}>
            <Plus className="mr-2 h-4 w-4" />
            Create Post
          </Button>
        )}
      </div>
      
      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-xl">{post.title}</CardTitle>
                    <Badge variant={post.published ? "default" : "secondary"}>
                      {post.published ? "Published" : "Draft"}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>{post.author.name || post.author.email}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  {onViewPost && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onViewPost(post)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  )}
                  {onEditPost && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEditPost(post)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeletePost(post.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            {post.content && (
              <>
                <Separator />
                <CardContent>
                  <p className="text-muted-foreground line-clamp-3">
                    {post.content}
                  </p>
                </CardContent>
              </>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}