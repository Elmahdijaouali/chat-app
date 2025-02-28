import InputLabel from "@/Components/InputLabel";
import {
    faContactBook,
    faContactCard,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Head, Link } from "@inertiajs/react";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const handleImageError = () => {
        document
            .getElementById("screenshot-container")
            ?.classList.add("!hidden");
        document.getElementById("docs-card")?.classList.add("!row-span-1");
        document
            .getElementById("docs-card-content")
            ?.classList.add("!flex-row");
        document.getElementById("background")?.classList.add("!hidden");
    };

    return (
        <>
            <Head title="DimaChat" />
            <div className="bg-gray-50 dark:bg-gray-900 dark:text-white text-black/50  ">
                <div className="relative flex min-h-screen flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white">
                    <div className="relative  w-full max-w-2xl px-6 lg:max-w-[90%]">
                        <header className=" bg-gray-950 mt-5 flex items-center py-5 px-10 rounded-full shadow-md shadow-gray-700  ">
                            <h1 className="text-3xl font-bold">DimaChat</h1>

                            <div className="flex lg:col-start-2 lg:justify-center"></div>

                            <nav className="-mx-3 flex flex-1 justify-end">
                                {auth.user ? (
                                    <Link
                                        href={route("chats.index")}
                                        className="rounded-md   px-5 py-2  ring-1 ring-transparent transition focus:outline-none focus-visible:ring-[#FF2D20]  "
                                    >
                                        Chats
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route("login")}
                                            className="rounded-md  mr-5  px-5 py-2  ring-1 ring-transparent transition focus:outline-none focus-visible:ring-[#FF2D20]  "
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href={route("register")}
                                            className="rounded-md   px-5 py-2  ring-1 ring-transparent transition focus:outline-none focus-visible:ring-[#FF2D20]  "
                                        >
                                            Register
                                        </Link>
                                    </>
                                )}
                            </nav>
                        </header>

                        <main className="min-h-[68vh]  w-full ">
                            <section className="w-full lg:py-24 py-10  lg:flex justify-between items-center">
                                <div className="lg:w-[45%] w-full">
                                    <h1 className="lg:text-6xl text-4xl w-full mt-20 lg:mt-0 font-bold mb-3">
                                        <span className="text-blue-500">
                                            DimaChat
                                        </span>{" "}
                                        application chat for Moroccan people
                                    </h1>
                                    <p className="dark:text-gray-400 text-sm">
                                        Lorem ipsum dolor sit amet consectetur
                                        adipisicing elit. Natus ab accusamus
                                        totam alias sit explicabo obcaecati
                                        doloribus numquam, quibusdam provident?
                                        Lorem ipsum dolor sit amet consectetur
                                        adipisicing elit. Natus ab accusamus
                                        totam alias sit explicabo obcaecati
                                        doloribus numquam, quibusdam provident?
                                        Lorem ipsum dolor sit amet consectetur
                                        adipisicing elit. Natus ab accusamus
                                        totam alias sit explicabo obcaecati
                                        doloribus numquam, quibusdam provident?
                                        Lorem ipsum dolor sit amet consectetur
                                        adipisicing elit. Natus ab accusamus
                                        totam alias sit explicabo obcaecati
                                        doloribus numquam, quibusdam provident?
                                    </p>
                                    <Link
                                        href={route("register")}
                                        className="bg-blue-500 block w-fit text-white px-10 py-3 rounded-md my-5 text-xl "
                                    >
                                        Start Now
                                    </Link>
                                </div>
                                <div className="lg:w-[45%] w-full rounded-lg shadow-lg shadow-gray-500 lg:h-[55vh] h-[30vh] mt-14 lg:mt-0 bg-gray-600">
                                    <img
                                        src="./assests/img_hero.png"
                                        className="w-full h-full rounded-lg"
                                        alt="image hero"
                                    />
                                </div>
                            </section>
                            <section className="w-full my-10 h-[20vh] dark:bg-gray-700"></section>
                            <section className="w-full p-10 my-10  ">
                                <h1 className="lg:text-6xl text-center text-4xl w-full mt-20 lg:mt-0 font-bold  mb-5">
                                    This is how messages storage in{" "}
                                    <span className="text-blue-500">
                                        Database
                                    </span>
                                </h1>

                                <div className=" w-full rounded-lg shadow-lg shadow-gray-500 lg:h-[55vh] h-[30vh] mt-14 lg:mt-0 bg-gray-600">
                                    <img
                                        src="./assests/img_messages_encryption.png"
                                        className="w-full h-full rounded-lg"
                                        alt="image hero"
                                    />
                                </div>
                                <div className=" p-5 rounded-lg  w-full ">
                                    <p className="dark:text-gray-400 text-center text-sm">
                                        Lorem ipsum dolor sit amet consectetur
                                        adipisicing elit. Error, eos fugit unde,
                                        eius laudantium ipsa id, provident harum
                                        mollitia maiores repudiandae. Ipsam
                                        harum atque ex! Lorem ipsum dolor sit
                                        amet consectetur adipisicing elit.
                                        Error, eos fugit unde, eius laudantium
                                        ipsa id, provident harum mollitia
                                        maiores repudiandae. Ipsam harum atque
                                        ex! Lorem ipsum dolor sit amet
                                        consectetur adipisicing elit. Error, eos
                                        fugit unde, eius laudantium ipsa id,
                                        provident harum mollitia maiores
                                        repudiandae. Ipsam harum atque ex! Lorem
                                        ipsum dolor sit amet consectetur
                                        adipisicing elit. Error, eos fugit unde,
                                        eius laudantium ipsa id, provident harum
                                        mollitia maiores repudiandae. Ipsam
                                        harum atque ex!
                                    </p>
                                </div>
                            </section>
                            <section className="w-full lg:flex justify-between items-center  my-2 h-[60vh] ">
                                <div className="h-full p-5 rounded-lg dark:bg-gray-950 w-full lg:w-[45%]">
                                    <h1 className="text-5xl font-bold ">
                                        Contact us{" "}
                                    </h1>
                                    <div className="my-5">
                                        <label htmlFor="">Email</label>
                                        <br />
                                        <input
                                            type="email"
                                            className="w-full dark:bg-gray-700 dark:text-white text-lg rounded-md"
                                            name="email"
                                            id="email"
                                            placeholder="Enter your email"
                                        />
                                    </div>
                                    <div className="my-5">
                                        <label htmlFor="">Subject</label>
                                        <br />
                                        <input
                                            type="email"
                                            className="w-full dark:bg-gray-700 dark:text-white text-lg rounded-md"
                                            name="email"
                                            id="email"
                                            placeholder="Enter your email"
                                        />
                                    </div>
                                    <div className="my-5">
                                        <label htmlFor="message">Message</label>
                                        <br />
                                        <textarea
                                            name="message"
                                            placeholder="Enter your message..."
                                            className="w-full max:h-[20vh] dark:bg-gray-700 dark:text-white text-lg rounded-md"
                                            rows={6}
                                            id="message"
                                        ></textarea>
                                    </div>
                                    <div>
                                        <button className="bg-blue-600 text-white px-8 py-3 rounded-md">
                                            Submit
                                        </button>
                                    </div>
                                </div>
                                <div></div>
                            </section>
                        </main>
                    </div>
                </div>
                <footer className="py-5 mt-20 dark:bg-gray-950 dark:text-white text-center text-sm text-black /70">
                    DimaChat &copy; {new Date().getFullYear()}
                </footer>
            </div>
        </>
    );
}
