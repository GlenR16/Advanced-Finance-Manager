import { useEffect, useState } from "react";
import EmptyCard from "../components/EmptyCard";
import CommitItem from "../components/CommitItem";


import { Timeline } from 'flowbite-react';

export default function About(){
    const [commits,setCommits] = useState([])
    const [isLoading,setLoading] = useState(true)

    useEffect(() => {
        fetch("https://api.github.com/repos/glenr16/Advanced-Finance-Manager/commits")
        .then((res) => res.json())
        .then((data) => {
            setCommits(data);
        })
        .catch((error) => console.log(error))
        setLoading(false);
    }, [])

    return (
        <section className="bg-white dark:bg-gray-900 flex justify-center grow" id="Home">
            <div className="py-2 px-4 text-center flex flex-col md:flex-row w-full">
                <div className="w-full md:w-1/2">
                    <h1 className="my-4 mb-6 font-semibold text-2xl font-normal text-gray-500 lg:text-3xl sm:px-5 lg:px-10 dark:text-white">Our Team</h1>
                    <div className="flex flex-col w-full items-center justify-center">
                        <div className="w-full my-2 border border-gray-200 rounded-lg shadow dark:border-gray-700 ">
                            <div className="items-center justify-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">
                                <div className="p-5">
                                    <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                                        <a href="/">Glen Rodrigues</a>
                                    </h3>
                                    <span className="text-gray-500 dark:text-gray-400">Chief Ideations Expert</span>
                                    <p className="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">Bachelor of Engineering in Computer Engineering with honors in Cyber Security. ('24)</p>
                                    <ul className="flex space-x-4 justify-center sm:mt-0">
                                        <li>
                                            <a href="https://github.com/GlenR16" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="https://glenr16.github.io/" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clipRule="evenodd" /></svg>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="https://www.linkedin.com/in/glen-rodrigues16/" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 448 512" aria-hidden="true"><path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"/></svg>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div> 
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-1/2">
                    <h1 className="my-4 mb-6 font-semibold text-2xl font-normal text-gray-500 lg:text-3xl sm:px-5 lg:px-10 dark:text-white">Changelog</h1>
                    <div className="flex flex-col w-full items-center justify-center">
                        {
                            commits.length == 0 &&
                            <EmptyCard message="No commits found." loading={isLoading} />
                        }
                        {
                            commits.length > 0 &&
                            (   
                                <Timeline className="m-5">
                                    {commits.map((i) => <CommitItem commit={i} key={i.sha} /> )}
                                </Timeline>
                            )
                        }
                    </div>
                </div>
            </div>
        </section>
    );
}