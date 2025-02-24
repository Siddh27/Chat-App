import { useAppStore } from '@/store'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useEffect } from 'react'
import ContactsContainer from './components/contacts-container'
import EmptyChatContainer from './components/empty-chat-container'
import ChatContainer from './components/chat-container'

const Chat=()=> {
  
    const {userInfo,selectedChatType,setSelectedChatData} = useAppStore()
    const navigate = useNavigate()

    useEffect(() => {
        if(!userInfo.profileSetup){
            toast('Please set up Profile to continue');
            console.log(userInfo.profileSetup)
            navigate("/profile")
        }

    }, [userInfo,navigate]);


    return (
        <div className='flex h-[100vh] text-white overflow-hidden'>
           <ContactsContainer/>
           {
             selectedChatType===undefined? <EmptyChatContainer/> : <ChatContainer/>
           }
        </div>
    )
}

export default Chat
