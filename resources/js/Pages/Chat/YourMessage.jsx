import decryption from "@/encryption/decryption";
import { faEarListen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";

export default function YourMessage({ message }) {
    const [messageDecryption, setMessageDecryption] = useState("");
    
    useEffect(() => {
        if (message.message != null) {
            setMessageDecryption(decryption(message.message));
        }
    }, []);
    const handleChangeMessageToVoice = (msg)=> {
        const uttrance = new SpeechSynthesisUtterance(msg)
        window.speechSynthesis.speak(uttrance)
     }
    return (
        <div className="p-4  lg:max-w-[65%] max-w-[80%] relative bg-blue-100 w-fit rounded-lg shadow-md  mr-auto my-2">
            {message.file != null && (
                <div className="full">
                    <img
                        className="w-full max-h-[45vh] "
                        src={message.file}
                        alt="image message"
                    />
                </div>
            )}
            {messageDecryption.length > 0 && (
                <div>
                    <p className="text-lg text-blue-800 font-semibold">
                        {messageDecryption}
                    </p>
                     <button onClick={() => handleChangeMessageToVoice(messageDecryption)} className='absolute top-1 right-1'>
                         <FontAwesomeIcon className='text-blue-800 text-lg ' icon={faEarListen} />
                     </button>
                </div>
            )}

            <span
                className="text-gray-600  bottom-0 absolute right-1"
                style={{ fontSize: ".7em" }}
            >
                {new Date(message.created_at).getHours()}:
                {new Date(message.created_at).getMinutes()}
            </span>
        </div>
    );
}
