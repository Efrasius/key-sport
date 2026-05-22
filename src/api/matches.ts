import { collection, query, getDocs, getDoc, doc } from "firebase/firestore";
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

export async function getMatch(id: string) {
    const matchDoc = await getDoc(doc(db, "matches", id))
    const matchData = matchDoc.data() as Match

    return matchData
}