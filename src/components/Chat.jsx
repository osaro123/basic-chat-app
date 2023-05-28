import React, { useEffect, useState } from 'react'
import { addDoc, collection,onSnapshot,query,serverTimestamp, where,orderBy } from 'firebase/firestore'
import { auth,db } from '../config/firebase-config'


const Chat = ({room}) => {

    const [newMessage,setNewMessage] = useState("")
    const [messages,setMessages] = useState([])

    const messagesRef = collection(db,"messages")

    useEffect(() => {
        const queryMessages = query(messagesRef, where("room", "==",room),orderBy("createdAt"))
        const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
            let messages = []
            snapshot.forEach((doc) => {
                messages.push({...doc.data(),id: doc.id})
            })
            setMessages(messages)
        })

        return () => unsuscribe();
    },[])
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(newMessage === "") return;

        await addDoc(messagesRef, {
            text: newMessage,
            createdAt: serverTimestamp(),
            user: auth.currentUser.displayName,
            room: room,
        })
        setNewMessage("")
    }

  return (
    <div className='chat-app w-full border-2  border-black'>
        <div className="header bg-indigo-500 p-4 mb-4">
            <h1 className='font-bold text-4xl '> {room.toUpperCase()}</h1>
        </div>
        <div>{messages.map((message) => (
            <div className="message" key={message.id}>
                <span className="user font-bold">{message.user}: </span>
                {message.text}
            </div>
        ))}</div>
        <form className='new-message-form ' onSubmit={handleSubmit}>
            <input 
                type="text"
                className='new-message-input w-[88.64%] py-3 outline-none'
                placeholder='Type your message here'
                onChange={(e) => setNewMessage(e.target.value)}
                value={newMessage}
            />
            <button onClick={handleSubmit} type='submit' 
            className='send-button py-3 px-4 h-full bg-indigo-500 hover:bg-indigo-700 text-white'>Send</button>
        </form>
    </div>
  )
}

export default Chat
