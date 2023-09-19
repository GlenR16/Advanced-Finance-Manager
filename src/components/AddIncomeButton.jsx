import { useState } from "react";
import { Button, Modal } from 'flowbite-react';
import { useIncome } from "../contexts/IncomeProvider";

export default function AddIncomeButton(){
    const [openModal, setOpenModal] = useState(false);
    const { addIncome } = useIncome();
    const [ongoing, setOngoing] = useState(false);
    
    function submitIncome(){
        const incomeObj = {
            name: document.getElementById("name").value,
            amount: document.getElementById("amount").value,
            start: document.getElementById("start").value,
            end: document.getElementById("end")?.value,
            increment: document.getElementById("increment").value
        }
        try{
            addIncome(incomeObj);
            setOpenModal(false);
        }
        catch(error){
            document.getElementById("incomeError").innerText = error.message
        }
    }

    
    
    return (
        <>
            <Button onClick={() => setOpenModal(true)} className="fixed bottom-10 right-5 md:bottom-5 flex items-center justify-center text-white bg-blue-700 rounded-full w-14 h-14 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800">
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                </svg>
            </Button>
            <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header className="text-xl font-medium text-gray-900 dark:text-white">Create Income Record</Modal.Header>
                <Modal.Body>
                    <div className="space-y-2">
                        <div className="grid md:grid-cols-2 md:gap-6">
                            <div>
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="XYZ Company" required />
                            </div>
                            <div>
                                <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Income Amount</label>
                                <input type="number" name="amount" id="amount" placeholder="Yearly Income" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 md:gap-6 ">
                            <div>
                                <label htmlFor="start" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Start Date</label>
                                <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="date" id="start" name="start" />
                            </div>
                            <div>
                                <label htmlFor="increment" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Increment per Year</label>
                                <input type="number" name="increment" id="increment" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="10%" required />
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 md:gap-6">
                            
                            <div className="my-3 inline-flex justify-center items-end">
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" id="ongoing" checked={ongoing} className="sr-only peer" onClick={() => setOngoing(!ongoing)} onChange={() => setOngoing(!ongoing)} />
                                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                    <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Unknown End</span>
                                </label>
                            </div>
                            {
                                !ongoing &&
                                (
                                    <div>
                                        <label htmlFor="end" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">End Date</label>
                                        <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="date" id="end" name="end" />
                                    </div>  
                                )
                            }
                        </div>
                        <div id="incomeError" className="text-red-500 w-full text-center"></div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" onClick={submitIncome} className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create Record</button>
                </Modal.Footer>
            </Modal>
        </>
    );
}