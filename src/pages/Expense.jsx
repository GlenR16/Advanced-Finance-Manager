
import AddExpenseButton from "../components/AddExpenseButton";
import ExpenseListTable from "../components/ExpenseListTable";

export default function Expense(){
    
    
    return (
        <section className="bg-white dark:bg-gray-900 grow">
            <div className="py-2 px-4 mx-auto max-w-screen-xl">
                <div className="flex flex-col items-center text-center">
                    <h1 className="my-4 font-semibold text-2xl font-normal text-gray-500 lg:text-3xl sm:px-5 lg:px-10 dark:text-white">
                        Your Expenses
                    </h1>
                    <ExpenseListTable />
                </div>   
            </div>
            <AddExpenseButton />
        </section>
    );
}