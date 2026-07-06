import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth"
import { auth, googleProvider } from "../firebase/config"
import { FirebaseError } from "firebase/app"

interface SigninType{
    email :string
    password:string
}

interface Signuptype extends SigninType{
    name:string
}
export async function signup({name , email , password}:Signuptype){
    try{
        const credentials =  await createUserWithEmailAndPassword(
            auth,
            email,
            password
        )

        await updateProfile(credentials.user ,{
            displayName:name
        })

        return credentials.user
    }catch(error){
        if (error instanceof FirebaseError) {
            console.error(error.code, error.message);
        }

        throw error;

    }
}

export async function signin({email , password}:SigninType) {
    try{
        const credentials= await signInWithEmailAndPassword(
            auth,
            email,
            password
        )

        return credentials.user
    }catch(error){
        if (error instanceof FirebaseError) {
            console.error(error.code, error.message);
        }
        throw error;
    }
}

export async function SignInWithGoogle() {
    try{
        const credentials = await signInWithPopup(
            auth,
            googleProvider
        )
        return credentials.user

    }catch(error){
        if (error instanceof FirebaseError) {
            console.error(error.code, error.message);
        }
        throw error;
    }
}
