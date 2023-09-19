import { useIncome } from "../contexts/IncomeProvider";
import EmptyCard from "../components/EmptyCard";
import AddIncomeButton from "../components/AddIncomeButton";
import IncomeListCard from "../components/IncomeListCard";

export default function Income(){
    const {income , addIncome , removeIncome} = useIncome();
    
    return (
        <section className="bg-white dark:bg-gray-900 grow">
            <div className="py-2 px-4 mx-auto max-w-screen-xl">
                <div className="flex flex-col items-center text-center">
                    <h1 className="my-4 font-semibold text-2xl font-normal text-gray-500 lg:text-3xl sm:px-5 lg:px-10 dark:text-white">
                        Your Income 
                    </h1>
                    {
                        income.length > 0 && 
                        income.map((i) => {
                            return <IncomeListCard key={i.id} income={i} />
                        })
                    }
                    {
                        income.length == 0 &&
                        <EmptyCard message={"Add your income details by clicking the '+' button below. \n All your income records will show up here. "} />
                    }
                    
                </div>   
            </div>
            <AddIncomeButton />
        </section>
    );
}