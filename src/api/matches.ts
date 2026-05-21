import { collection, query, getDocs } from "firebase/firestore";
import { Match } from "../types/match";
import { db } from "../config/firebase";


export async function getMatches(): Promise<Match[]> {
    const q = query(collection(db, 'matches'))

    const querySnapshot = await getDocs(q)

    return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    })) as Match[]
}