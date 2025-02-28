import React from "react";

export default function Chats() {
    return (
        <div className="lg:hidden ">
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
    );
}
