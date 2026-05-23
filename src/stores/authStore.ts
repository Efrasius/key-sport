import { create } from 'zustand'
import { User } from 'firebase/auth'
import { UserData } from '../types/userData'

interface StoreState {
    user: User | null
    id: string
    userName: string
    totalPoints: number
    isAuthenticated: boolean
    signIn: (user: User, userName: UserData) => void
    signOut: () => void
}


export const useAuthStore = create<StoreState>((set) => ({
    id: '',
    user: null,
    userName: '',
    totalPoints: 0,
    isAuthenticated: false,
    signIn: (user: User, userData: UserData) => set(() => ({
        user: user,
        id: userData.id,
        userName: userData.userName,
        totalPoints: userData.totalPoints,
        isAuthenticated: true
    })),
    signOut: () => set(() => ({
        user: null,
        id: '',
        userName: '',
        isAuthenticated: false,
        totalPoints: 0
    }))
}))