import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePage } from "@inertiajs/react";
import axios from "axios";
import React, { useState } from "react";

export default function UpdateAvatar() {
    const user = usePage().props.auth.user;

    const handleChangeAavatar = async (e) => {
        const formData = new FormData();
        formData.append("avatar", e.target.files[0]);

        const res = await axios
            .post("http://localhost:8000/profile/editAvatar", formData)
            .then(() => Inertia.relaod() )
            .catch((err) => console.error("Error:", err));
          
            window.location.reload()
    };

    return (
        <section>
            <div className="rounded-full relative  bg-blue-500 w-[150px] h-[150px]  ">
                <img
                    className="w-full h-full  relative rounded-full"
                    src={user.avatar}
                    alt={user.name}
                />
                <label htmlFor="editAvatar">
                    <FontAwesomeIcon
                        icon={faEdit}
                        className="text-blue-500 absolute text-xl hover:cursor-pointer right-0 mr-6 bottom-0 "
                    />
                    <input
                        type="file"
                        className="hidden"
                        id="editAvatar"
                        onChange={handleChangeAavatar}
                    />
                </label>
            </div>
            <h1 className="text-xl font-bold">{user.name}</h1>
            <h3>{user.email}</h3>
        </section>
    );
}
