"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PostsList } from "@/components/posts/posts-list"
import { PostForm } from "@/components/posts/post-form"
import { ArrowLeft, Database, Users, FileText } from "lucide-react"
import Link from "next/link"

type ViewMode = "list" | "create" | "edit"

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

export default function DemoPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("list")
  const [currentPost, setCurrentPost] = useState<Post | null>(null)

  const handleCreatePost = () => {
    setCurrentPost(null)
    setViewMode("create")
  }

  const handleEditPost = (post: Post) => {
    setCurrentPost(post)
    setViewMode("edit")
  }

  const handleViewPost = (post: Post) => {
    setCurrentPost(post)
    setViewMode("edit")
  }

  const handleSavePost = () => {
    setViewMode("list")
    setCurrentPost(null)
  }

  const handleCancel = () => {
    setViewMode("list")
    setCurrentPost(null)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <Database className="h-5 w-5" />
              <span className="font-semibold">Demo: Full-Stack Features</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8">
        <div className="max-w-6xl mx-auto">
          {/* Info Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Interactive Demo
              </CardTitle>
              <CardDescription>
                This demo showcases the full-stack capabilities of the scaffold including 
                database operations, state management, and modern UI components.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">Next.js 15 API Routes</Badge>
                <Badge variant="outline">Prisma ORM</Badge>
                <Badge variant="outline">SQLite Database</Badge>
                <Badge variant="outline">Zustand State Management</Badge>
                <Badge variant="outline">shadcn/ui Components</Badge>
                <Badge variant="outline">TypeScript</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Demo Content */}
          <Tabs value={viewMode === "list" ? "posts" : "form"} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="posts" onClick={() => setViewMode("list")}>
                <FileText className="mr-2 h-4 w-4" />
                Posts ({viewMode === "list" ? "Active" : "View"})
              </TabsTrigger>
              <TabsTrigger value="form" onClick={() => setViewMode("create")}>
                <Users className="mr-2 h-4 w-4" />
                {viewMode === "create" ? "Create Post" : 
                 viewMode === "edit" ? "Edit Post" : "Post Form"}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="posts" className="mt-6">
              <PostsList
                onCreatePost={handleCreatePost}
                onEditPost={handleEditPost}
                onViewPost={handleViewPost}
              />
            </TabsContent>

            <TabsContent value="form" className="mt-6">
              <div className="flex justify-center">
                <PostForm
                  post={currentPost || undefined}
                  mode={currentPost ? "edit" : "create"}
                  onSave={handleSavePost}
                  onCancel={handleCancel}
                />
              </div>
            </TabsContent>
          </Tabs>

          {/* Instructions */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Try It Out!</CardTitle>
              <CardDescription>
                Experiment with the following features:
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">Posts Management</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• View all posts with author information</li>
                    <li>• Create new posts with rich content</li>
                    <li>• Edit existing posts</li>
                    <li>• Delete posts with confirmation</li>
                    <li>• Toggle publish/draft status</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">Technical Features</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Real-time database operations</li>
                    <li>• Type-safe API with Zod validation</li>
                    <li>• Responsive design with Tailwind CSS</li>
                    <li>• Loading states and error handling</li>
                    <li>• Modern UI with shadcn/ui</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}