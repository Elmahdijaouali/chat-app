import React, { useEffect, useRef, useState } from "react";
import MyMessage from "./MyMessage";
import YourMessage from "./YourMessage";
import { Link, usePage } from "@inertiajs/react";
import echo from "@/echo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowLeft,
    faEllipsisVertical,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
import encryption from "@/encryption/encryption";
import Dropdown from "@/Components/Dropdown";
import axios from "axios";
import FormSendMessage from "./FormSendMessage";
import { faOldRepublic } from "@fortawesome/free-brands-svg-icons";

export default function ChatActive({
    messages = [],
    receiver = {},
    chat_id = null,
}) {
  
    const user = usePage().props.auth.user;
    const [realTimeMessages, setRealTimeMessages] = useState(messages);
    const [yourWriteMessage, setYourWriteMessage] = useState(false);

    //  I am use useRef just for scroll in bottom message every new message add
    const messagesEndRef = useRef(null);

    useEffect(() => {
        echo.private("Messages." + chat_id).listen("Messanger", (event) => {
            setRealTimeMessages([...realTimeMessages, event.message]);
            
        });
        
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    });

    // handle write message real time
    useEffect(() => {
        echo.private(`WriteMessage.` + chat_id).listen(
            "WriteMessage",
            (event) => {
                if (
                    event.chat_id == chat_id &&
                    user.id == event.user_show_write_id &&
                    event.is_write
                ) {
                    setYourWriteMessage(true);
                } else {
                    setYourWriteMessage(false);
                }
            }
        );
    }, []);

    return (
        <div className="lg:w-[74%] h-[92vh] lg:h-[85vh]  w-full ml-auto bg-white   dark:bg-gray-900 dark:text-white p-3 lg:p-8 mt-0 rounded-lg shadow-md">
            <div className="my-3 relative text-lg flex items-center font-medium text-gray-800">
                <Link href="/chats">
                    <FontAwesomeIcon
                        className="mr-2 dark:text-white text-2xl"
                        icon={faArrowLeft}
                    />
                </Link>
                <div className="w-14 h-14 mr-3 rounded-full ">
                    <img
                        className="w-full h-full rounded-full"
                        src={receiver.avatar}
                        alt="avatar"
                    />
                </div>

                <div>
                    <h1 className=" dark:text-white"> {receiver.name}</h1>
                    {yourWriteMessage ? (
                        <p className="dark:text-white">write...</p>
                    ) : (
                        <p className=" dark:text-white">
                            {receiver.is_online == true ? "online" : "unonline"}
                        </p>
                    )}
                </div>

                <div className="ml-auto">
                    <Dropdown>
                        <Dropdown.Trigger>
                            <FontAwesomeIcon
                                onClick={() => setDisplayMenu(!displayMenu)}
                                className="ml-auto dark:text-white text-2xl hover:cursor-pointer "
                                icon={faEllipsisVertical}
                            />
                        </Dropdown.Trigger>

                        <Dropdown.Content>
                            <Dropdown.Link href={route("profile.edit")}>
                                Block
                            </Dropdown.Link>
                            <Dropdown.Link
                                href={route("logout")}
                                method="post"
                                as="button"
                            >
                                <span className="text-red-600 ">
                                    <FontAwesomeIcon
                                        className="mr-1"
                                        icon={faTrash}
                                    />{" "}
                                    Delete
                                </span>
                            </Dropdown.Link>
                        </Dropdown.Content>
                    </Dropdown>
                </div>
            </div>
            <hr />
            <div className="w-full lg:p-10 p-3 lg:h-[65vh] h-[80%] overflow-y-scroll">
                {/* {messages.total > 20 && (
                   <button className="text-center rounded-xl p-2 block w-fit mx-auto bg-blue-500 ">
                      show old messages
                   </button>
                )} */}
                {realTimeMessages &&
                    realTimeMessages.map((message) =>
                        message.sender_id === user.id ? (
                            <MyMessage key={message.id} message={message} />
                        ) : (
                            <YourMessage key={message.id} message={message} />
                        )
                    )}
                <div ref={messagesEndRef} />
            </div>

            <FormSendMessage chat_id={chat_id} />
        </div>
    );
}
