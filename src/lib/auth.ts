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
    securityQuestion: "What is your mother's maiden name?",
    securityAnswer: "Smith",
  },
]

// Simulated OTP storage
const otpStorage: { [email: string]: { otp: string; expiry: number } } = {}

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
      password,
      image: "/placeholder.svg",
      savedResumes: [],
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      securityQuestion: "",
      securityAnswer: "",
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

  sendPasswordResetOTP: async (email: string): Promise<{ success: boolean; error?: string }> => {
    const user = users.find((u) => u.email === email)
    if (user) {
      // Generate a random 6-digit OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString()
      // Set OTP expiry to 10 minutes from now
      const expiry = Date.now() + 10 * 60 * 1000

      // Store OTP (in a real application, this would be securely stored)
      otpStorage[email] = { otp, expiry }

      // Simulate sending OTP via email
      console.log(`OTP for ${email}: ${otp}`)

      return { success: true }
    }
    return { success: false, error: "User not found" }
  },

  verifyOTP: async (email: string, otp: string): Promise<{ success: boolean; error?: string }> => {
    const storedOTP = otpStorage[email]
    if (storedOTP && storedOTP.otp === otp && Date.now() < storedOTP.expiry) {
      // Clear the OTP after successful verification
      delete otpStorage[email]
      return { success: true }
    }
    return { success: false, error: "Invalid or expired OTP" }
  },

  getSecurityQuestion: async (email: string): Promise<{ success: boolean; question?: string; error?: string }> => {
    const user = users.find((u) => u.email === email)
    if (user && user.securityQuestion) {
      return { success: true, question: user.securityQuestion }
    }
    return { success: false, error: "User not found or security question not set" }
  },

  verifySecurityAnswer: async (email: string, answer: string): Promise<{ success: boolean; error?: string }> => {
    const user = users.find((u) => u.email === email)
    if (user && user.securityAnswer && user.securityAnswer.toLowerCase() === answer.toLowerCase()) {
      return { success: true }
    }
    return { success: false, error: "Incorrect answer" }
  },

  resetPassword: async (email: string, newPassword: string): Promise<{ success: boolean; error?: string }> => {
    // Simulate API call to reset password
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const userIndex = users.findIndex((u) => u.email === email)
    if (userIndex !== -1) {
      users[userIndex].password = newPassword
      return { success: true }
    }
    return { success: false, error: "User not found" }
  },

  setSecurityQuestion: async (
    email: string,
    question: string,
    answer: string,
  ): Promise<{ success: boolean; error?: string }> => {
    const userIndex = users.findIndex((u) => u.email === email)
    if (userIndex !== -1) {
      users[userIndex].securityQuestion = question
      users[userIndex].securityAnswer = answer
      return { success: true }
    }
    return { success: false, error: "User not found" }
  },
}

