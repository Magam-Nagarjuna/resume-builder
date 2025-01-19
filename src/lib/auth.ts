// src/lib/auth.ts
import { User } from '@/types/user'

let user: User | null = null

export const auth = {
  getCurrentUser: async (): Promise<User | null> => {
    if (user) return user
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      user = JSON.parse(storedUser)
      return user
    }
    return null
  },
  getSavedResumes: async (): Promise<any[]> => {
    const currentUser = await auth.getCurrentUser()
    if (currentUser) return currentUser.savedResumes
    return []
  },
  saveResume: async (resumeData: any): Promise<void> => {
    const currentUser = await auth.getCurrentUser()
    if (currentUser) {
      const existingResumeIndex = currentUser.savedResumes.findIndex(r => r.id === resumeData.id)
      if (existingResumeIndex !== -1) {
        currentUser.savedResumes[existingResumeIndex] = resumeData
      } else {
        currentUser.savedResumes.push(resumeData)
      }
      localStorage.setItem('user', JSON.stringify(currentUser))
    }
  },
  signup: async (userData: User): Promise<void> => {
    user = userData
    localStorage.setItem('user', JSON.stringify(user))
  },
  login: async (email: string, password: string): Promise<User | null> => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      const user = JSON.parse(storedUser)
      if (user.email === email && user.password === password) {
        return user
      }
    }
    return null
  },
  logout: async (): Promise<void> => {
    localStorage.removeItem('user')
    user = null
    delete auth.user
  }
}