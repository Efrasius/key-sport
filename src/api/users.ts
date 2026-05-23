import { collection, query, getDocs, where, orderBy, limit } from "firebase/firestore";
import { db } from "../config/firebase";
import { UserData } from "../types/userData";

export async function getLeaderBoard(): Promise<UserData[]> {
    const q = query(collection(db, 'users'), orderBy('totalPoints', 'desc'), limit(10))

    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    })) as UserData[]
}

export async function getPosition(totalPoints: number): Promise<number> {
    const q = query(
        collection(db, 'users'),
        where('totalPoints', '>', totalPoints)
    )
    const snapshot = await getDocs(q)
    const rank = snapshot.size + 1

    return rank
}