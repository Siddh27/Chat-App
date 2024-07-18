import EmojiPicker from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";
import {GrAttachment} from 'react-icons/gr'
import { IoSend } from "react-icons/io5";
import { RiEmojiStickerLine } from "react-icons/ri";


function MessageBar() {
    const [message, setMessage] = useState("");
    const emojiRef = useRef();
    const [emojiPickerOpen,setEmojiPickerOpen] = useState(false)

    useEffect(() => {
        function handleClickOutside(event){
            if(emojiRef.current && !emojiRef.current.contains(event.target)){
                setEmojiPickerOpen(false)
            }
        }
        document.addEventListener("mousedown",handleClickOutside)
        return ()=>{
            document.removeEventListener("mousedown",handleClickOutside)
        }
    }, []);

    const handleAddEmoji = (emoji) => {
        setMessage((msg) => msg + emoji.emoji);
    };

    const sendMessage = async ()=>{

    }
    return (
        <div className="h-[10vh]  bg-[#1c1d25] flex justify-center items-center px-8 mb-6 gp-6">
            <div className="flex-1 flex bg-[#2a2b33] rounded-md items-center gap-5 pr-5 ">
                <textarea type="text" className="flex-1 bg-transparent rounded-md focus:border-none focus:outline-none text-xl p-1 overflow-hidden" placeholder="Enter Message"  onChange={e=>setMessage(e.target.value)}
                value={message}
                    />
                <button className='text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all'>
                    <GrAttachment className="text-2xl"/>
                </button>
                <div className="relative">
                <button className='text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all'
                onClick={()=>setEmojiPickerOpen(true)}
                >
                    <RiEmojiStickerLine className="text-2xl"/>
                </button>
                <div className="absolute bottom-16 right-0" 
                ref={emojiRef}>
                <EmojiPicker 
                theme="dark" 
                open={emojiPickerOpen}
                onEmojiClick={handleAddEmoji} 
                autoFocusSearch={false} 
                    />
                </div>
                </div>
            </div>
            <button className='bg-yellow-300 rounded-md flex items-center justify-center p-5 focus:border-none hover:bg-yellow-600 focus:outline-none focus:text-white duration-300 transition-all'
            onClick={sendMessage}
            >
                    <IoSend className="text-2xl text-black"/>
                </button>
        </div>
    )
}

export default MessageBar
