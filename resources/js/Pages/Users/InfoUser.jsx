import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useForm } from "@inertiajs/react";
import React from "react";

export default function InfoUser({ user }) {
    const { data, setData, post } = useForm({ receiver_id: user.id });

    const handleAddChat = () => {
        post("http://localhost:8000/chats", data);
    };

    return (
        <div className=" w-full my-3 bg-gray-600 text-white px-3 py-2   rounded-lg">
            <div
                className="w-full flex items-center justify-between h-full"
               
            >
                <div className="flex items-center">
                <div className="w-14 h-14 mr-3 rounded-full ">
                    <img
                        className="w-full h-full rounded-full"
                        src={user.avatar}
                        alt="avatar"
                    />
                </div>
                 <div>
                       <h1> {user.name}</h1>
                       {user.email}
                </div>
                </div>  
               
                <div>
                        <button className="px-5 py-2  hover:cursor-pointer rounded-md bg-blue-500 text-white "  onClick={handleAddChat}><FontAwesomeIcon className="mr-1" icon={faPlus} />Add Friend</button>
                </div>
                
            </div>
        </div>
    );
}
