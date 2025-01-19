import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, FileText, Briefcase, User } from 'lucide-react'

export default function Home() {

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white">
      <header className="border-b bg-white">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center space-x-2">
            <FileText className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">ResumeAI</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost">Log In</Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-primary text-primary-foreground">Start For Free</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
            Create Your Perfect Resume
            <span className="block text-primary mt-2">
              With AI-Powered Tools
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Build professional resumes in minutes with our AI-powered resume builder. Choose from expert-designed templates and customize them to match your style.
          </p>
          <Link href="/signup">
            <Button size="lg" className="bg-primary text-primary-foreground">
              Get Started For Free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </main>

      <footer className="border-t mt-16 py-8 text-center text-sm text-muted-foreground">
        <p>&copy; 2023 ResumeAI. All rights reserved.</p>
      </footer>
    </div>
  )
}

