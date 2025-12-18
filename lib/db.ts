export interface Project {
  id: string
  title: string
  description: string
  technologies: string[]
  featured: boolean
  createdAt?: string
  updatedAt?: string
}

export interface Message {
  id: string
  name: string
  email: string
  message: string
  timestamp: string
  read: boolean
}

export interface Stats {
  totalProjects: number
  yearsExperience: number
  technologies: number
  certifications: number
  auditsCompleted: number
}

// In-memory storage (replace with actual database in production)
class InMemoryDB {
  private projects: Project[] = []
  private messages: Message[] = []
  private stats: Stats = {
    totalProjects: 15,
    yearsExperience: 3,
    technologies: 25,
    certifications: 2,
    auditsCompleted: 10,
  }

  // Projects
  async getProjects(): Promise<Project[]> {
    return this.projects
  }

  async getProjectById(id: string): Promise<Project | undefined> {
    return this.projects.find((p) => p.id === id)
  }

  async createProject(project: Omit<Project, "id" | "createdAt" | "updatedAt">): Promise<Project> {
    const newProject: Project = {
      ...project,
      id: String(Date.now()),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    this.projects.push(newProject)
    return newProject
  }

  async updateProject(id: string, updates: Partial<Project>): Promise<Project | null> {
    const index = this.projects.findIndex((p) => p.id === id)
    if (index === -1) return null

    this.projects[index] = {
      ...this.projects[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    }
    return this.projects[index]
  }

  async deleteProject(id: string): Promise<boolean> {
    const initialLength = this.projects.length
    this.projects = this.projects.filter((p) => p.id !== id)
    return this.projects.length < initialLength
  }

  // Messages
  async getMessages(): Promise<Message[]> {
    return this.messages
  }

  async createMessage(message: Omit<Message, "id" | "timestamp" | "read">): Promise<Message> {
    const newMessage: Message = {
      ...message,
      id: String(Date.now()),
      timestamp: new Date().toISOString(),
      read: false,
    }
    this.messages.push(newMessage)
    return newMessage
  }

  async markMessageAsRead(id: string, read: boolean): Promise<Message | null> {
    const message = this.messages.find((m) => m.id === id)
    if (!message) return null
    message.read = read
    return message
  }

  async deleteMessage(id: string): Promise<boolean> {
    const initialLength = this.messages.length
    this.messages = this.messages.filter((m) => m.id !== id)
    return this.messages.length < initialLength
  }

  // Stats
  async getStats(): Promise<Stats> {
    return this.stats
  }

  async updateStats(updates: Partial<Stats>): Promise<Stats> {
    this.stats = { ...this.stats, ...updates }
    return this.stats
  }
}

export const db = new InMemoryDB()

// Example: To use a real database (PostgreSQL, MySQL, MongoDB, etc.)
/*
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function getProjects() {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data
}

// ... other database functions
*/
