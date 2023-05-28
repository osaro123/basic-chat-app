import Auth from "./components/Auth"
import { useState,useRef } from "react"
import Cookies from "universal-cookie/cjs/Cookies"
import Chat from "./components/Chat"
const cookies = new Cookies()
import { signOut } from "firebase/auth"
import { auth } from "./config/firebase-config"

const App = () => {

  const [isAuth,setIsAuth] = useState(cookies.get("auth-token"))
  const [room,setRoom] = useState(null);
  const roomInputRef = useRef()

  const signUserOut = async () => {
    await signOut(auth)
    cookies.remove("auth-token")
    setRoom(null)
    setIsAuth(false)
  }

  if(!isAuth){
    return (
      <div className="min-h-[100vh] flex items-center justify-center flex-col">
        <Auth setIsAuth={setIsAuth}/>
      </div>
    )
  }

  return (
    <>
    <div className="min-h-[100vh] flex items-center justify-center flex-col">
      {room ? <div className="min-h-[100vh] mt-2 max-w-[800px] w-[90%]">
        <Chat room={room}/>
      </div> : (
        <div className="min-h-[100vh] flex items-center justify-center flex-col">
          <input type="text" ref={roomInputRef} placeholder="Enter Room Name" className="border-solid border-black border-2 mb-2 p-2"/>
          <button className="bg-indigo-500 text-white rounded-md w-full py-3 px-8 " onClick={() => setRoom(roomInputRef.current.value)}>Enter Chat</button>
        </div>
      )}
    </div>

    <div>
        <button onClick={signUserOut} className="bg-indigo-500 p-2 rounded-sm text-white absolute top-0 right-0">Sign Out</button>
    </div>

    </>
  )
}

export default App

