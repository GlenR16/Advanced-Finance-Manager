import { useState } from "react";
import { Button, Modal } from 'flowbite-react';
import { useInvestment } from "../contexts/InvestmentProvider";

export default function AddInvestmentButton(){
    const [openModal, setOpenModal] = useState(false);
    const { addInvestment } = useInvestment();
    
    function submitInvestment(){
        const investmentObj = {
            name: document.getElementById("name").value,
            amount: document.getElementById("amount").value,
            start: document.getElementById("start").value,
            end: document.getElementById("end").value,
            interest: document.getElementById("interest").value
        }
        try{
            addInvestment(investmentObj);
            setOpenModal(false);
        }
        catch(error){
            document.getElementById("investmentError").innerText = error.message
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
                <Modal.Header className="text-xl font-medium text-gray-900 dark:text-white">Create Investment Record</Modal.Header>
                <Modal.Body>
                    <div className="space-y-2">
                        <div className="grid md:grid-cols-2 md:gap-6">
                            <div>
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Bank / Stock Name" required />
                            </div>
                            <div>
                                <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Investment Amount</label>
                                <input type="number" name="amount" id="amount" placeholder="Yearly Investment" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 md:gap-6 ">
                            <div>
                                <label htmlFor="start" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Start Date</label>
                                <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="date" id="start" name="start" />
                            </div>
                            <div>
                                <label htmlFor="interest" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Annual Rate of Interest</label>
                                <input type="number" name="interest" id="interest" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="7.1%" required />
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 md:gap-6">
                            <div>
                                <label htmlFor="end" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">End Date</label>
                                <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="date" id="end" name="end" />
                            </div>
                        </div>
                        <div id="investmentError" className="text-red-500 w-full text-center"></div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" onClick={submitInvestment} className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create Record</button>
                </Modal.Footer>
            </Modal>
        </>
    );
}