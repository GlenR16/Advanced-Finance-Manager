import { useState } from 'react';
import { useName } from '../contexts/NameProvider';
import { Link } from 'react-router-dom';
import { Modal } from 'flowbite-react';

export default function NameModal(){

    const { name,changeName } = useName();
    const [openModal, setOpenModal] = useState(undefined);
    const props = { openModal, setOpenModal };
    
    function submitName(){
        let name = document.getElementById("name").value
        try{
            changeName(name)
            setOpenModal(undefined)
        }
        catch(error){
            document.getElementById("nameError").innerText = error.message
        }
    }

    return (
        <>
            {
                (
                    name && 
                    <Link to="/dashboard" className="inline-flex justify-center items-center py-3 px-5 text-lg font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900" aria-current="page">Dashboard</Link>
                )
                ||
                (
                    !name && 
                    <> 
                        <button onClick={() => props.setOpenModal('default')} className="inline-flex justify-center items-center py-3 px-5 text-lg font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                            Get started
                            <svg className="w-5 h-5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                            </svg>
                        </button>
                        <Modal show={props.openModal === 'default'} onClose={() => props.setOpenModal(undefined)}>
                            <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    Terms of Service
                                </h3>
                                <button onClick={() => props.setOpenModal(undefined)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            <div className="p-6 space-y-6">
                                <p className="text-lg leading-relaxed text-gray-500 dark:text-white">
                                    All your data is stored locally on your device. If you delete the sites data or clear browser data then you will lose all statistics available here.
                                    <br /><b>We are not responsible for any loss of data or bad financial decision made by you.</b>
                                </p>
                            </div>
                            <div className="p-6 space-y-2 text-left border-t border-gray-200 rounded-b dark:border-gray-600">
                                <label htmlFor="name" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Full Name</label>
                                <input type="text" id="name" className="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John Doe" required />
                                <div id='nameError' className='text-red-500'></div>
                            </div>
                            <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                                <button onClick={submitName} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">I accept</button>
                                <button onClick={() => props.setOpenModal(undefined)} type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Decline</button>
                            </div>
                        </Modal>
                    </>
                )

            }
            
            
        </>
    );
}