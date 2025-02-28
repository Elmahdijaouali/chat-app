import encryption from "@/encryption/encryption";
import {  faClose, faFileUpload, faPlus   } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

import React, { useState } from "react";

export default function FormSendMessage({ chat_id }) {
    const [inputMessage, setInputMessage] = useState("");
    const [fileMessage  , setFileMessage ] = useState(null)
    const [urlFile , setUrlFile ]= useState(null)

    const handleSendMessage = async (e) => {
        e.preventDefault();

        const messageEncryption = await encryption(inputMessage);
        const formData = new FormData()
        formData.append('chat_id' , chat_id )
        formData.append('message' , messageEncryption )
        formData.append('fileMessage' , fileMessage )
        
        
        if (inputMessage.length > 0 || fileMessage != null) {
             axios.post("http://localhost:8000/messages" , formData)
        }

        setInputMessage("");
        setFileMessage(null);
        setUrlFile(null)
    };

    const handleWriteMessage = (e) => {
        setInputMessage(e.target.value);
    };

    const handleRealTimeShowWriteMessage = (e) => {
        const res = axios.post("http://localhost:8000/message/write", {
            chat_id: chat_id,
            is_write: true,
        });
    };

    const handleBlurInputMessage = (e) => {
        const res = axios.post("http://localhost:8000/message/write", {
            chat_id: chat_id,
            is_write: false,
        });
    };
    const handleChangeMessageFile =(e) =>{
        const image = e.target.files[0]
        setFileMessage(image)
        const url = URL.createObjectURL(image)
        setUrlFile(url)

    }
    const handleCancelFileBeforeSendMessage = () => {
        setUrlFile(null)
        setFileMessage(null)
    }
    return (
        <form
            onSubmit={handleSendMessage}
            className="flex  mt-2 w-full  items-center space-x-4"
        >
           
          
          <div className="relative">
          {
                urlFile != null &&
                (
                  <div className="w-[100px] absolute bottom-14 left-0  h-[100px] rounded-lg p-1 bg-gray-500">
                    <img className="w-full h-full rounded-lg" src={urlFile} alt="image selected " />
                    <FontAwesomeIcon className=" absolute top-2 hover:cursor-pointer text-red-500 text-lg right-2" onClick={handleCancelFileBeforeSendMessage} icon={faClose} />
                  </div>
                )
            }
          
            <label htmlFor="fileMessage" className=" ">
           
               <input type="file" id="fileMessage" className="hidden" name="fileMessage" onChange={handleChangeMessageFile} />
              <FontAwesomeIcon className="text-4xl rounded-full border-2 w-[30px] p-1 h-[30px] hover:cursor-pointer text-blue-500" icon={faPlus} />
            </label>
            </div>

            <input
                type="text"
                name="message"
                value={inputMessage}
                onChange={handleWriteMessage}
                className="w-[90%] p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-100 focus:border-transparent"
                placeholder="Type your message..."
                onFocus={handleRealTimeShowWriteMessage}
                onBlur={handleBlurInputMessage}
            />

            <button
                type="submit"
                className="bg-blue-600 text-white py-3 px-6 rounded-lg transition-all hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
                Send
            </button>
        </form>
    );
}
