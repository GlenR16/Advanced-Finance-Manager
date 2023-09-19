export default function LoadingPage(){
    return (
        <section className="bg-white dark:bg-gray-900 flex items-center grow" id="Loading">
            <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
                <h1 className="mb-2 text-2xl font-extrabold tracking-tight leading-none text-gray-900 md:text-3xl lg:text-4xl dark:text-white">Advanced Finance Manager</h1>
                <div className="mb-4 text-base font-semibold leading-none text-gray-900 dark:text-white">
                    Loading
                </div>
                <div className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">
                    <div role="status">
                        <svg aria-hidden="true" className="inline w-10 h-10 md:w-20 md:h-20 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill="currentColor" d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z"/>

                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            </div>
        </section>
    );
}