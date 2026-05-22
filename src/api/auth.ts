import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth, db } from '../config/firebase'
import { doc, setDoc } from 'firebase/firestore'

export async function signUp(email: string, password: string, userName: string) {

    try {
        const user = await createUserWithEmailAndPassword(auth, email, password)

        await setDoc(doc(db, "users", user.user.uid), {
            userName: userName,
            predictionsCount: 0,
            correctPredictionsCount: 0,
            totalPoints: 0
        })

        return user
    }
    catch (error) {
        if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
        }

        console.error(error);
        throw error
    }
}

export async function signIn(email: string, password: string) {
    try {
        await signInWithEmailAndPassword(auth, email, password)
    }
    catch (error) {
        console.error(error);
        throw error
    }
}

export async function disconnect() {
    try {
        signOut(auth)
    }
    catch (error) {
        return (error)
    }
}
