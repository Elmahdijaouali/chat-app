import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import ChatActive from "./ChatActive";
import NotSelectAnyChat from "./NotSelectAnyChat";
import InfoChatUser from "./InfoChatUser";
import Users from "../Users/Users";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function Chats({
    chats = [],
    users = [],
    messages = [],
    receiver = {},
    chat_id = null,
}) {

    const [displayUsers, setDisplayUsers] = useState(false);
    const [dataChats, setDataChats] = useState(chats);
    const user = usePage().props.auth.user;
  console.log('chats', chats)
    useEffect(() => {
        Echo.private(`Chats.${user.id}`).listen("Chats", (event) => {
            setDataChats([...dataChats, event.chat]);
        });
  
    });

    return (
        <AuthenticatedLayout>
            <Head title="Chats" />

            <div className="lg:py-8 relative h-[92vh]   rounded-lg lg:px-8  lg:flex bg-gray-200  dark:bg-gray-950 dark:text-white    w-full shadow-lg">
                {/* this is for mobile */}
                <div className="lg:hidden h  mobile">
                    {receiver.name === undefined  && (
                        <div className="p-5">
                            {displayUsers && <Users users={users} setDisplayUsers={setDisplayUsers} />}

                            <div className="lg:w-[25%] w-full flex h-full     flex-col justify-between">
                                <div className="flex h-full  justify-between">
                                    <h1 className="text-3xl font-semibold  text-gray-800 dark:text-white mb-4">
                                        Chats
                                    </h1>
                                    <button
                                        className="w-fit font-bold text-white bg-blue-500 px-3 py-2  rounded-lg"
                                        onClick={() =>
                                            setDisplayUsers(!displayUsers)
                                        }
                                    >
                                        Add New Friend{" "}
                                        <FontAwesomeIcon icon={faPlus} />
                                    </button>
                                </div>
                                <div className="lg:h-[90%] h-[81vh] overflow-y-scroll">
                                    {dataChats[0] &&
                                        dataChats.map((chat) => (
                                            <InfoChatUser
                                                key={chat.id}
                                                chat={chat}
                                            />
                                        ))}
                                </div>
                            </div>
                        </div>
                    ) }
                </div>

                {/* this is for pc */}

                <div className="hidden lg:w-[25%]     lg:flex items-start justify-between ">
                    {displayUsers && <Users users={users} setDisplayUsers={setDisplayUsers} />}

                    <div className=" w-full flex    flex-col justify-between">
                        <div className="flex h-full  justify-between">
                            <h1 className="text-3xl font-semibold text-gray-800 dark:text-white mb-4">
                                Chats
                            </h1>
                            <button
                                className="w-fit font-bold text-white bg-blue-500 px-3 py-2  rounded-lg"
                                onClick={() => setDisplayUsers(!displayUsers)}
                            >
                                Add New Friend <FontAwesomeIcon icon={faPlus} />
                            </button>
                        </div>
                        <div className="lg:h-[80vh] h-[81vh] overflow-y-scroll">
                            {dataChats[0] &&
                                dataChats.map((chat) => (
                                    <InfoChatUser key={chat.id} chat={chat} />
                                ))}
                        </div>
                    </div>

                   
                       
                </div>
               
                {receiver.name ? (
                            <ChatActive
                                messages={messages}
                                receiver={receiver}
                                chat_id={chat_id}
                            />
                        ) : (
                            <NotSelectAnyChat />
                 )}
              
            </div>
        </AuthenticatedLayout>
    );
}
