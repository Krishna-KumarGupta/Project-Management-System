import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { fetchChatByProject, fetchChatMessages, sendMessage } from '@/Redux/Chat/Action'
import { PaperPlaneIcon } from '@radix-ui/react-icons'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const ChatBox = () => {

  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const {auth,chat} = useSelector(store=>store)
  const {id} = useParams()

  useEffect(() => {
    dispatch(fetchChatByProject(id));
  }, [dispatch, id]);

  // Fetch messages if chat ID is available
  useEffect(() => {
    if (chat.chat?.id) {
      dispatch(fetchChatMessages(chat.chat.id));
    }
  }, [chat.chat?.id, dispatch]);

  const handleSendMessage = () => {
    dispatch(sendMessage({
      senderId:auth.user?.id,
      projectId:id,
      content:message
    }));
    setMessage("")
    console.log("message", message);
  }

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  }


  return (
    <div className='sticky top-0'>
      <div className='border border-gray-700 rounded-lg'>
        <h1 className='border-b border-gray-700 p-5'>Chat Box</h1>
        <ScrollArea className="h-[32rem] w-full p-5 flex gap-3 flex-col">

          {chat.messages?.map((item, index) =>            
            item.sender.id !== auth.user.id ? <div className='flex gap-2 mb-2 justify-start' key={index}>
              <Avatar className='transition-all duration-200 border border-gray-800 
                     bg-gray-800 text-white 
                     hover:bg-white hover:text-black'>
                <AvatarFallback>I</AvatarFallback>
              </Avatar>
              <div className='space-y-2 py-2 px-5 border border-gray-700 rounded-ss-2xl rounded-e-xl'>
                <p>{item.sender.fullName}</p>
                <p className='text-gray-300'>{item.content}</p>
              </div>

            </div> :
              <div className='flex gap-2 mb-2 justify-end' key={index}>

                <div className='space-y-2 py-2 px-5 border border-gray-700 rounded-se-2xl rounded-s-xl'>
                <p>{item.sender.fullName}</p>
                <p className='text-gray-300'>{item.content}</p>
                </div>
                <Avatar className='transition-all duration-200 border border-gray-800 
                     bg-gray-800 text-white 
                     hover:bg-white hover:text-black'>
                  <AvatarFallback>{item.sender.fullName[0]}</AvatarFallback>
                </Avatar>
              </div>
          )}

        </ScrollArea>
        <div className='relative p-0'>
          <textarea
            placeholder='Type a message...'
            className='py-5 pl-4 pr-12 border-t outline-none focus:outline-none focus:ring-0 
               border-b-0 border-x-0 border-gray-700 w-full resize-none overflow-hidden'
            value={message}
            onChange={handleMessageChange}
            rows={1} // Ensures initial small height
          />

          <Button
            onClick={handleSendMessage}
            className='absolute right-2 top-4 rounded-full transition-all duration-200 border border-gray-800 
               bg-gray-800 text-white hover:bg-white hover:text-black'
            size='icon'
            variant="ghost">
            <PaperPlaneIcon className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ChatBox