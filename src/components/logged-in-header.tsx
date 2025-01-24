"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, LogOut, FileText, Home } from "lucide-react"
import { auth } from "@/lib/auth"
import { ThemeToggle } from "@/components/theme-toggle"

interface LoggedInHeaderProps {
  user: {
    name: string
    email: string
    image?: string
  }
}

export function LoggedInHeader({ user }: LoggedInHeaderProps) {
  const router = useRouter()

  const handleLogout = async () => {
    await auth.logout()
    router.push("/login")
  }

  return (
    <header className="border-b bg-background">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <FileText className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">ResumeAI</span>
        </Link>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={() => router.push("/")} className="mr-2">
            <Home className="h-4 w-4 mr-2" />
            Home
          </Button>
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.image} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuItem className="flex items-center" onClick={() => router.push("/profile")}>
                <User className="mr-2 h-4 w-4" />
                <span>My Account</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center" onClick={() => router.push("/saved-resumes")}>
                <FileText className="mr-2 h-4 w-4" />
                <span>Saved Resumes</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

