import NameModal from "../components/NameModal";

export default function Home(){
    return (
        <section className="bg-white dark:bg-gray-900 flex items-center grow" id="Home">
            <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
                <img src="/Advanced-Finance-Manager/favicon.svg" alt="Logo" width={100} className="mx-auto" />
                <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Advanced Finance Manager</h1>
                <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">
                    Now managing finances is as easy as clicking a few buttons. Our app respects your privacy. <br />
                    All your data is locally stored on your device and will be deleted if you clear your browsing data.
                </p>
                <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                    <NameModal />
                        
                </div>
            </div>
        </section>
    );
}