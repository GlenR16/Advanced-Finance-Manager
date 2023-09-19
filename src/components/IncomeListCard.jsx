import { useIncome } from "../contexts/IncomeProvider";
import { RangeSlider, Modal } from "flowbite-react";
import { useState } from "react";
import { Tax, CompoundIncrement } from "../utils/Calculators";
import { useSetting } from "../contexts/SettingsProvider";

export default function IncomeListCard(props){
    const { settings } = useSetting();
    const { removeIncome, editIncome } = useIncome();
    const [year,setYear] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const theme = {
        "root": {
          "base": "flex"
        },
        "field": {
          "base": "relative w-full",
          "input": {
            "base": "w-full bg-gray-200 rounded-lg cursor-pointer dark:bg-gray-700",
            "sizes": {
              "sm": "h-1 range-sm",
              "md": "h-2",
              "lg": "h-3 range-lg"
            }
          }
        }
    };

    function editIncomeRecord(id){
        const incomeObj = {
            name: document.getElementById("name").value,
            amount: document.getElementById("amount").value,
            start: document.getElementById("start").value,
            end: document.getElementById("end")?.value,
            increment: document.getElementById("increment").value,
        }
        try{
            editIncome(id,incomeObj);
            setOpenModal(false);
        }
        catch(error){
            document.getElementById("editError").innerText = error.message;
        }
    }

    function deleteIncomeRecord(id){
        try{
            removeIncome(id)
        }
        catch(error){
            console.log(error);
        }
    }


    return (
        <>
            <div className="w-full md:w-3/4 my-3 p-0 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="px-6 pt-4">
                    <div className="flex flex-row justify-between items-baseline mb-2">
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{props.income.name}</h5>
                        <p className="text-gray-700 dark:text-gray-300 text-sm">
                            {props.income.start} to {props.income.end ? props.income.end : 'Present'}
                        </p>
                    </div>
                </div>
                <hr />
                <div className="p-6">
                    <div className="flex flex-col md:flex-row justify-between items-left md:items-center">
                        <div className="text-left text-lg font-medium text-black dark:text-white mb-2">
                            Income: {settings.currency} <b>{CompoundIncrement(props.income.amount, props.income.increment , year).toFixed(2)}</b> <br />
                            Tax: {settings.currency} <b>{Tax(CompoundIncrement(props.income.amount, props.income.increment , year),settings.slabs).toFixed(2)}</b>
                        </div>
                        <div className="grid grid-flow-col gap-3 mb-2">
                            <button onClick={() => setOpenModal(true)} type="button" className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900 inline-flex justify-center">
                                <svg viewBox="0 0 512 512" className="h-4 w-4 my-1 mx-2">
                                    <path fill="#ffffff" d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/>
                                </svg>
                            </button>
                            <button onClick={() => setOpenDeleteModal(true)} type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 inline-flex justify-center">
                            <svg viewBox="0 0 448 512" className="h-4 w-4 my-1 mx-2">
                                <path fill="#ffffff" d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"/>
                            </svg>
                            </button>
                        </div>
                    </div>
                    {
                        ( !(props.income.end) || (parseInt(props.income.end?.slice(0,4)) - parseInt(props.income.start.slice(0,4)) > 1) ) &&
                        <div className="text-left">
                            <label htmlFor="steps-range" className="block mb-1 text-lg font-medium text-gray-900 dark:text-white">Year {parseInt(props.income.start.slice(0,4)) + parseInt(year)}</label>
                            <RangeSlider theme={theme} min={0} max={ props.income.end? parseInt(props.income.end.slice(0,4))-parseInt(props.income.start.slice(0,4)):8 } value={year} onChange={(event) => setYear(event.target.value)} sizing="lg" />
                        </div>
                    }
                </div>
                <Modal show={openModal} onClose={() => setOpenModal(false)}>
                    <Modal.Header className="text-xl font-medium text-gray-900 dark:text-white">Edit Record</Modal.Header>
                    <Modal.Body>
                        <div className="space-y-2">
                            <div className="grid md:grid-cols-2 md:gap-6">
                                <div>
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                    <input type="text" name="name" id="name" defaultValue={props.income.name} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="XYZ Company" required />
                                </div>
                                <div>
                                    <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Income Amount</label>
                                    <input type="number" name="amount" id="amount" defaultValue={props.income.amount} placeholder="Yearly Income" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 md:gap-6 ">
                                <div>
                                    <label htmlFor="start" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Start Date</label>
                                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="date" id="start" name="start" defaultValue={props.income.start} />
                                </div>
                                <div>
                                    <label htmlFor="end" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">End Date (Optional)</label>
                                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="date" id="end" name="end" defaultValue={props.income.end} />
                                </div>  
                                    
                            </div>
                            <div className="grid md:grid-cols-2 md:gap-6">
                                <div>
                                    <label htmlFor="increment" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Increment per Year</label>
                                    <input type="number" name="increment" id="increment" defaultValue={props.income.increment} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="10%" required />
                                </div>
                            </div>
                            <div id="editError" className="text-red-500 w-full text-center"></div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="button" onClick={() => editIncomeRecord(props.income.id)} className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save Record</button>
                    </Modal.Footer>
                </Modal>
                <Modal show={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
                    <Modal.Header className="text-xl font-medium text-gray-900 dark:text-white">Delete Record</Modal.Header>
                    <Modal.Body className="text-center">
                        <p className="mb-2 text-gray-500 dark:text-gray-300">Are you sure you want to delete this item?</p>
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{props.income.name} Income Record</h5>
                    </Modal.Body>
                    <Modal.Footer>
                        <button onClick={() => setOpenDeleteModal(false)} type="button" className="w-1/2 py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                            No, cancel
                        </button>
                        <button type="button" onClick={() => deleteIncomeRecord(props.income.id)} className="w-1/2 py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900">
                            Yes, I'm sure
                        </button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    );
}