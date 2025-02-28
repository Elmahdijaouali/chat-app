import echo from "@/echo";
import decryption from "@/encryption/decryption";
import { Link, usePage } from "@inertiajs/react";
import React, { useEffect, useState } from "react";

export default function InfoChatUser({ chat }) {
    const [nbrMessages, setNbrMessages] = useState(0);
    const user = usePage().props.auth.user;
    const chat_id = usePage().props.chat_id ;
    const messages = usePage().props.messages
    const [lastMessage , setLastMessage ] = useState(chat.last_message != undefined ? decryption(chat.last_message.message) :  'not have any message ') 
    

    useEffect(() => {
        echo.private("Messages." + chat.id).listen("Messanger", (event) => {
            if (event.message.sender_id !== user.id && chat.id != chat_id ) {
                setNbrMessages(nbrMessages + 1);
                if(event.message.message  != undefined){
                    setLastMessage(decryption(event.message.message))
                }
            }
                     
        });
    } , [chat.id]);
    
   

    return (
        <div
            key={chat.id}
            className=" w-[90%] my-3 bg-gray-600 text-white dark:text-white px-3 py-2  mr-5 rounded-lg"
        >
            <Link
                className="w-full relative flex items-center h-full"
                href={route("chats.show", chat.id)}
            >
                <div className="w-14 h-14 mr-3 rounded-full  ">
                    <img
                        className="w-full h-full rounded-full"
                        src={chat.receiver.avatar}
                        alt="avatar"
                    />
                </div>

                <div>
                    <h1> {chat.receiver.name}</h1> 
                  {/* truncate */}
                     <span className=" dark:text-white  block w-[200px] truncate   ">{lastMessage}</span>
                </div>
                 {
                    chat.receiver.is_online ?  <div className="bg-green-700 w-3 h-3 rounded-full absolute right-0 bottom-0" /> :  <div className="bg-gray-400 w-3 h-3 rounded-full absolute right-0 bottom-0"/>
                 }
               
                {nbrMessages > 0 && (
                    <span
                        className="bg-green-600 absolute right-0 top-0  text-white  rounded-3xl py-0.5 px-2 "
                        style={{ fontSize: ".7em" }}
                    >
                        {nbrMessages}
                    </span>
                )}
            </Link>
        </div>
    );
}
