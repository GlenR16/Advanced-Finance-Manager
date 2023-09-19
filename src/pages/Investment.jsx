import { useInvestment } from "../contexts/InvestmentProvider";
import EmptyCard from "../components/EmptyCard";
import AddInvestmentButton from "../components/AddInvestmentButton";
import InvestmentCard from "../components/InvestmentCard";
export default function Investment(){
    const { investment } = useInvestment();
    return (
        <section className="bg-white dark:bg-gray-900 grow">
            <div className="py-2 px-4 mx-auto max-w-screen-xl">
                <div className="flex flex-col items-center text-center">
                    <h1 className="my-4 font-semibold text-2xl font-normal text-gray-500 lg:text-3xl sm:px-5 lg:px-10 dark:text-white">
                        Your Investments
                    </h1>
                    {
                        investment.length > 0 && 
                        (<div className="w-full grid md:grid-cols-3 gap-3">
                            {investment.map((i) => {
                                return <InvestmentCard key={i.id} investment={i} />
                            })}
                        </div>)
                    }
                    {
                        investment.length == 0 &&
                        <EmptyCard message={"Add your investment details by clicking the '+' button below. \n All your investment records will show up here. "} />
                    }
                </div>
            </div>
            <AddInvestmentButton />
        </section>
    );
}