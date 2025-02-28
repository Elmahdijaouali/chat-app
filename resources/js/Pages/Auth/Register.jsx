import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Head, Link, useForm } from '@inertiajs/react';


export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
                name: '',
                email: '',
                password: '',
                password_confirmation: '',
            });
        
            const submit = (e) => {
                e.preventDefault();
        
                post(route('register'), {
                    onFinish: () => reset('password', 'password_confirmation'),
                });
            };
        

    return (
        <div className="w-full dark:bg-gray-700  flex h-[100vh] ">
            <div className="lg:w-[50%] hidden bg-gray-900 rounded-e-[120px] lg:flex justify-center items-center h-[100vh] ">
                <h1 className="text-[5em] px-14 text-white font-bold">
                    Welcome 
                    <span className='text-blue-500'>DimaChat</span>
                </h1>
            </div>

            <div className="flex justify-center lg:w-[50%] w-full  items-center">
                <div>
                    <Link
                        className=" absolute top-10 left-10 lg:dark:bg-gray-600 dark:bg-gray-800 shadow-lg bg-gray-400 dark:text-white py-1.5 px-3  rounded-md text-lg"
                        href={"/"}
                    >
                        <FontAwesomeIcon className="mr-3" icon={faArrowLeft} />
                        Back
                    </Link>
                  
                </div>

                <div className="lg:w-[60%] dark:bg-gray-950 rounded-lg w-[80%]  p-5">
                    <div className="flex items-center  mb-10 justify-center">
                      
                        <h1 className="dark:text-white font-bold text-4xl ">
                          Register
                        </h1>
                    </div>

                    <Head title="Register" />

             <form onSubmit={submit}>
                 <div>
                     <InputLabel htmlFor="name" value="Name" />

                     <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirm Password"
                    />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                        required
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="mt-4 flex items-center justify-end">
                    <Link
                        href={route('login')}
                        className="rounded-md text-sm text-gray-400 underline hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Already registered?
                    </Link>

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form>
                </div>
            </div>
        </div>
    );
}



