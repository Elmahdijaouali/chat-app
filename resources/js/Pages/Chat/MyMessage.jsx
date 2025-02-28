import decryption from '@/encryption/decryption'
import { faEarListen, faVoicemail } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'

export default function MyMessage({ message }) {
const [messageDecryption, setMessageDecryption] = useState("")

  useEffect(() => {
    if(message.message != null){
      setMessageDecryption(decryption(message.message))
    }
  },[])
  
  const handleChangeMessageToVoice = (msg)=> {
     const uttrance = new SpeechSynthesisUtterance(msg)
     window.speechSynthesis.speak(uttrance)
  }
  return (
    <div className="p-4 relative lg:max-w-[65%] max-w-[80%] bg-green-100 rounded-lg shadow-md  ml-auto w-fit my-2 text-right">
      {
        message.file != null  && 
        <div className=''>
          <img  className='w-full max-h-[45vh] ' src={message.file} alt="image message" />
        </div>
      }
      {
        messageDecryption.length > 0 && 
        <div className=''>
          <p className="text-lg text-green-800 text-start font-semibold">{messageDecryption}</p>
          <button onClick={() => handleChangeMessageToVoice(messageDecryption)} className='absolute top-1 right-1'>
            <FontAwesomeIcon className='text-blue-800 text-lg ' icon={faEarListen} />
          </button>
        </div>
      }
     
    
      <span className='text-gray-600  bottom-0 absolute right-1' style={{fontSize:'.7em'}}>{new Date(message.created_at).getHours()}:{new Date(message.created_at).getMinutes()}</span>
    </div>
  )
}
