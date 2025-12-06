"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { 
  Save, 
  X, 
  Loader2,
  Eye,
  FileText
} from "lucide-react"

interface User {
  id: string
  name?: string
  email: string
}

interface Post {
  id?: string
  title: string
  content?: string
  published: boolean
  authorId: string
}

interface PostFormProps {
  post?: Post
  onSave?: (post: Post) => void
  onCancel?: () => void
  mode?: "create" | "edit"
}

export function PostForm({ post, onSave, onCancel, mode = "create" }: PostFormProps) {
  const [formData, setFormData] = useState<Post>({
    title: "",
    content: "",
    published: false,
    authorId: "",
    ...post,
  })
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [usersLoading, setUsersLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      setUsersLoading(true)
      const response = await fetch('/api/users')
      if (!response.ok) {
        throw new Error('Failed to fetch users')
      }
      const data = await response.json()
      setUsers(data)
      
      // If no authorId is set and we have users, set the first one as default
      if (!formData.authorId && data.length > 0) {
        setFormData(prev => ({ ...prev, authorId: data[0].id }))
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch users')
    } finally {
      setUsersLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title.trim()) {
      setError('Title is required')
      return
    }
    
    if (!formData.authorId) {
      setError('Author is required')
      return
    }

    try {
      setLoading(true)
      setError(null)
      
      const url = mode === "edit" && post?.id 
        ? `/api/posts/${post.id}` 
        : '/api/posts'
      
      const method = mode === "edit" ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to save post')
      }
      
      const savedPost = await response.json()
      onSave?.(savedPost)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save post')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: keyof Post, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setError(null)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              {mode === "edit" ? "Edit Post" : "Create New Post"}
            </CardTitle>
            <CardDescription>
              {mode === "edit" 
                ? "Make changes to your post"
                : "Share your thoughts with the world"
              }
            </CardDescription>
          </div>
          <Badge variant={formData.published ? "default" : "secondary"}>
            {formData.published ? "Published" : "Draft"}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm">
              {error}
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Enter post title..."
              disabled={loading}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={formData.content || ""}
              onChange={(e) => handleInputChange('content', e.target.value)}
              placeholder="Write your post content..."
              rows={8}
              disabled={loading}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="author">Author *</Label>
            {usersLoading ? (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading users...
              </div>
            ) : (
              <select
                id="author"
                value={formData.authorId}
                onChange={(e) => handleInputChange('authorId', e.target.value)}
                className="w-full p-2 border rounded-md bg-background"
                disabled={loading}
              >
                <option value="">Select an author...</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name || user.email}
                  </option>
                ))}
              </select>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              id="published"
              checked={formData.published}
              onCheckedChange={(checked) => handleInputChange('published', checked)}
              disabled={loading}
            />
            <Label htmlFor="published">Publish immediately</Label>
          </div>
          
          <div className="flex gap-2 pt-4">
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {mode === "edit" ? "Updating..." : "Creating..."}
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  {mode === "edit" ? "Update Post" : "Create Post"}
                </>
              )}
            </Button>
            
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}