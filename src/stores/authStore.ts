import { create } from 'zustand'
import { User } from 'firebase/auth'

interface StoreState {
    user: User | null
    userName: string
    totalPoints: number
    isAuthenticated: boolean
    signIn: (user: User, userName: string) => void
    signOut: () => void
}

export const useAuthStore = create<StoreState>((set) => ({
    user: null,
    userName: '',
    totalPoints: 0,
    isAuthenticated: false,
    signIn: (user: User, userName: string) => set(() => ({
        user: user, userName: userName, isAuthenticated: true
    })),
    signOut: () => set(() => ({
        user: null,
        userName: '',
        isAuthenticated: false,
        totalPoints: 0
    }))
}))