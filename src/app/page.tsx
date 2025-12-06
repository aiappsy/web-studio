"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { 
  Code2, 
  Database, 
  Palette, 
  Zap, 
  Globe, 
  Lock, 
  Sparkles, 
  ArrowRight,
  CheckCircle,
  Users,
  Rocket,
  BookOpen,
  Github,
  Heart
} from "lucide-react"

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const features = [
    {
      icon: <Code2 className="h-6 w-6" />,
      title: "Next.js 15",
      description: "Latest version with App Router for optimal performance and developer experience",
      badge: "Latest"
    },
    {
      icon: <Palette className="h-6 w-6" />,
      title: "Tailwind CSS 4",
      description: "Modern utility-first CSS framework with shadcn/ui components",
      badge: "Modern"
    },
    {
      icon: <Database className="h-6 w-6" />,
      title: "Prisma ORM",
      description: "Type-safe database access with SQLite for development",
      badge: "Type-Safe"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "AI-Powered",
      description: "Integrated with Z.ai SDK for intelligent development features",
      badge: "AI"
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Responsive Design",
      description: "Mobile-first approach with beautiful dark/light themes",
      badge: "Responsive"
    },
    {
      icon: <Lock className="h-6 w-6" />,
      title: "Authentication",
      description: "NextAuth.js integration for secure user management",
      badge: "Secure"
    }
  ]

  const techStack = [
    "Next.js 15",
    "TypeScript 5",
    "Tailwind CSS 4",
    "shadcn/ui",
    "Prisma ORM",
    "NextAuth.js",
    "Zustand",
    "TanStack Query",
    "Framer Motion",
    "Lucide Icons"
  ]

  const benefits = [
    "Production-ready architecture",
    "Type-safe development",
    "Modern UI components",
    "Database integration",
    "Authentication system",
    "State management",
    "API routes ready",
    "Dark/light themes",
    "Mobile responsive",
    "SEO optimized"
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <div className="relative w-8 h-8 mr-2">
              <img
                src="/logo.svg"
                alt="Z.ai Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-bold">Z.ai Code Scaffold</span>
          </div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <nav className="flex items-center space-x-2">
              <ThemeToggle />
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="mx-auto max-w-4xl">
            <Badge variant="outline" className="mb-4">
              <Sparkles className="mr-2 h-4 w-4" />
              AI-Powered Development
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
              Modern Next.js Scaffold
              <br />
              <span className="text-primary">Built for AI Development</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              A comprehensive, production-ready Next.js 15 application with TypeScript, 
              Tailwind CSS, shadcn/ui, and integrated AI capabilities. Start building 
              amazing projects in minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8" asChild>
                <Link href="/demo">
                  <Rocket className="mr-2 h-5 w-5" />
                  Try Live Demo
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8">
                <BookOpen className="mr-2 h-5 w-5" />
                Documentation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Everything You Need</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Packed with modern tools and best practices to accelerate your development
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="relative overflow-hidden">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                      {feature.icon}
                    </div>
                    <Badge variant="secondary">{feature.badge}</Badge>
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Modern Technology Stack</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Built with the latest and greatest tools for optimal performance
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {techStack.map((tech, index) => (
              <Badge key={index} variant="outline" className="text-sm py-2 px-4">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Why Choose This Scaffold?</h2>
              <p className="text-xl text-muted-foreground mb-8">
                This isn't just another template. It's a carefully crafted foundation 
                that follows best practices and includes everything you need to build 
                production applications.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <Card className="p-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5" />
                  Developer Experience
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Hot reload development</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>TypeScript throughout</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>ESLint configuration</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Component library ready</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Database integration</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>AI-powered features</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Ready to Build Something Amazing?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Start your next project with a solid foundation and focus on what matters most - 
              building great features for your users.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8">
                <Github className="mr-2 h-5 w-5" />
                View on GitHub
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8">
                <ArrowRight className="mr-2 h-5 w-5" />
                Get Started Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="relative w-6 h-6">
                <img
                  src="/logo.svg"
                  alt="Z.ai Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-sm text-muted-foreground">
                © 2024 Z.ai Code Scaffold. Built with <Heart className="inline h-4 w-4 text-red-500" /> by AI.
              </span>
            </div>
            <div className="flex space-x-6">
              <Button variant="ghost" size="sm">
                Documentation
              </Button>
              <Button variant="ghost" size="sm">
                GitHub
              </Button>
              <Button variant="ghost" size="sm">
                Support
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}