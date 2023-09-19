import { useExpense } from "../contexts/ExpenseProvider";
import EmptyCard from "./EmptyCard";

export default function ExpenseListTable(){
    const {expense , addExpense, removeExpense} = useExpense()
    function deleteExpenseRecord(id){
        try{
            removeExpense(id)
        }
        catch(error){
            console.log(error);
        }
    }

    function GetDateText(props){
        if (props.expenseObj.recurrence === "SINGLE"){
            return (<td className="px-3 md:px-6 py-4">{props.expenseObj.start}</td>)
        }
        else{
            if (props.expenseObj.end == null){
                return (<td className="px-3 md:px-6 py-4">{props.expenseObj.start + " to Present"}</td>) 
            }
            else{
                return (<td className="px-3 md:px-6 py-4">{props.expenseObj.start + " to " + props.expenseObj.end}</td>)
            }
        }
    }
    
    return (
        <div className="w-full flex flex-col items-center">
            {
                expense.length == 0 &&
                <EmptyCard message={"Add your expense details by clicking the '+' button below. \n All your expense records will show up here. "} />
            }
            {
                expense.length > 0 &&
                (
                    <div className="w-full relative overflow-x-auto shadow-md rounded-lg">
                        <table className="w-full text-xs md:text-base text-left text-gray-500 dark:text-gray-400">
                            <thead className="w-3/4 text-xs md:text-base text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-3 md:px-6 py-3">
                                        Expense name
                                    </th>
                                    <th scope="col" className="px-3 md:px-6 py-3">
                                        Amount
                                    </th>
                                    <th scope="col" className="px-3 md:px-6 py-3">
                                        Type
                                    </th>
                                    <th scope="col" className="px-3 md:px-6 py-3">
                                        Date
                                    </th>
                                    <th scope="col" className="px-3 md:px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    expense.map((i) => {
                                        return (
                                            <tr key={i.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                <th scope="row" className="px-3 md:px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {i.name}
                                                </th>
                                                <td className="px-3 md:px-6 py-4">
                                                    {i.amount}
                                                </td>
                                                <td className="px-3 md:px-6 py-4">
                                                    {i.recurrence}
                                                </td>
                                                    <GetDateText expenseObj={i} />
                                                <td className="px-3 md:px-6 py-4">
                                                    <button onClick={() => deleteExpenseRecord(i.id)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</button>
                                                </td>
                                            </tr>
                                        );
                                    })
                                }
                                

                            </tbody>
                        </table>
                    </div>
                )
            }
        </div>
    );
}