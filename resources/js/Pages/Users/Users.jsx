import React, { useState } from "react";
import InfoUser from "./InfoUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose  } from "@fortawesome/free-solid-svg-icons";

export default function Users({users  , setDisplayUsers}) {
    const [filterUsers , setFilterUsers] = useState(users)

    const [inputSearch , setInputSearch ] = useState('')
    
    const handleFilterUsers = (e) => {
        setInputSearch(e.target.value)
        setFilterUsers(users.filter(user => user.name.includes(e.target.value) ||  user.email.includes(e.target.value) ))
    }
   

    return (
        <div className="z-30 shadow-2xl lg:mr-10 lg:w-[35%] w-full absolute right-0 top-0 lg:h-[55vh] h-[84vh] lg:mt-[14vh] mt-[8vh] bg-white dark:bg-gray-950 lg:border dark:text-white rounded-xl p-1 ">
            <h1 className="text-3xl p-5 dark:text-white   font-semibold text-gray-800 mb-4">Add New Chat </h1>
            <FontAwesomeIcon icon={faClose} onClick={() => setDisplayUsers(false)} className="absolute hover:cursor-pointer  right-4 top-4 text-3xl font-bold "/>
            <div className="px-5 mb-4  ">
                <input  type="text" value={inputSearch} onChange={handleFilterUsers} className="w-full dark:bg-gray-600 dark:text-white dark:placeholder:text-gray-200 rounded-md" placeholder="Search by name or email ..." />
            </div>
            <div className="w-full p-5 lg:h-[70%] h-[80%] overflow-y-scroll">
                {filterUsers &&
                    filterUsers.map((user) => <InfoUser key={user.id} user={user} />)}
            </div>
        </div>
    );
}
