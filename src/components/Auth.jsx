import { provider } from "../config/firebase-config"
import { auth } from "../config/firebase-config"
import { signInWithPopup } from "firebase/auth"
import Cookies from "universal-cookie"
export const cookies = new Cookies()

const Auth = ({setIsAuth}) => {

    const signInWithGoogle = async () => {
        try{
            const result = await signInWithPopup(auth,provider)
            cookies.set("auth-token",result.user.refreshToken)
            setIsAuth(true)
        }catch(err){
            console.log(err);
        }
        
    }

  return (
    <>
      <h2 className="font-bold text-3xl mb-4">Login</h2>
      <button className="border-solid border-2 p-4 border-black hover:bg-blue" onClick={signInWithGoogle}>Sign Up with Google</button>
    </>
  )
}

export default Auth
