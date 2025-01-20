import type { User } from "@/types/user"

// Initialize the users array with a default test user
const users: User[] = [
  {
    id: "1",
    name: "Test User",
    email: "test@example.com",
    password: "password123",
    image: "/placeholder.svg",
    savedResumes: [],
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
  },
]

export const auth = {
  signup: async (name: string, email: string, password: string) => {
    // Check if user already exists
    if (users.some((user) => user.email === email)) {
      return { success: false, error: "User already exists" }
    }

    const newUser: User = {
      id: String(users.length + 1),
      name,
      email,
      password, // This will be stored in the users array but not in sessionStorage
      image: "/placeholder.svg",
      savedResumes: [],
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
    }

    users.push(newUser)
    const userWithoutPassword = { ...newUser, password: undefined }
    sessionStorage.setItem("user", JSON.stringify(userWithoutPassword))
    return { success: true, user: userWithoutPassword }
  },

  login: async (email: string, password: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const user = users.find((u) => u.email === email && u.password === password)
    if (user) {
      user.lastLogin = new Date().toISOString()
      const userWithoutPassword = { ...user, password: undefined }
      sessionStorage.setItem("user", JSON.stringify(userWithoutPassword))
      return { success: true, user: userWithoutPassword }
    }
    return { success: false, error: "Invalid email or password" }
  },

  loginWithOAuth: async (provider: "google" | "linkedin" | "github") => {
    // Simulate OAuth login
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const mockUser = users[0] || {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      image: "/placeholder.svg",
      savedResumes: [],
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
    }
    sessionStorage.setItem("user", JSON.stringify(mockUser))
    return { success: true, user: mockUser }
  },

  logout: async () => {
    sessionStorage.removeItem("user")
  },

  getCurrentUser: async (): Promise<User | null> => {
    const userJson = sessionStorage.getItem("user")
    return userJson ? JSON.parse(userJson) : null
  },

  isAuthenticated: () => {
    return !!sessionStorage.getItem("user")
  },

  updateUserImage: async (file: File): Promise<User> => {
    // Simulate image upload and user update
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const userJson = sessionStorage.getItem("user")
    if (userJson) {
      const user = JSON.parse(userJson)
      const updatedUser = { ...user, image: URL.createObjectURL(file) }
      sessionStorage.setItem("user", JSON.stringify(updatedUser))
      return updatedUser
    }
    throw new Error("User not found")
  },

  getSavedResumes: async (): Promise<any[]> => {
    const userJson = sessionStorage.getItem("user")
    if (userJson) {
      const user = JSON.parse(userJson)
      return user.savedResumes || []
    }
    return []
  },

  saveResume: async (resume: any): Promise<void> => {
    const userJson = sessionStorage.getItem("user")
    if (userJson) {
      const user = JSON.parse(userJson)
      const existingResumeIndex = user.savedResumes.findIndex((r: any) => r.id === resume.id)
      if (existingResumeIndex !== -1) {
        user.savedResumes[existingResumeIndex] = resume
      } else {
        user.savedResumes = [...(user.savedResumes || []), resume]
      }
      sessionStorage.setItem("user", JSON.stringify(user))
    }
  },
}

