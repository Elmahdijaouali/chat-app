import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-gray-100 dark:bg-gray-900 dark:text-white h-[8vh]  pt-6 sm:justify-center sm:pt-0">
            <div>
                <Link href="/">
                   <h1 className='text-2xl font-bold'>DimaChat</h1>
                </Link>
            </div>

            <div className="mt-6 w-full overflow-hidden bg-white dark:bg-gray-950 px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
