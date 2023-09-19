import { useSetting } from "../contexts/SettingsProvider";
import { useInvestment } from "../contexts/InvestmentProvider";
import { CompoundIncrement } from "../utils/Calculators";

export default function InvestmentCard(props){
    const { removeInvestment } = useInvestment();
    const { settings } = useSetting();

    function deleteInvestmentRecord(id){
        try{
            removeInvestment(id)
        }
        catch(error){
            console.log(error);
        }
    }
    return (
        <div className="w-full my-3 p-0 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="px-6 pt-4">
                    <div className="flex flex-row justify-between items-baseline mb-2">
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{props.investment.name}</h5>
                        <p className="text-gray-700 dark:text-gray-300 text-sm">
                            {props.investment.start} to {props.investment.end ? props.investment.end : 'Present'}
                        </p>
                    </div>
                </div>
                <hr />
                <div className="p-6">
                    <div className="flex flex-col md:flex-row justify-between items-left md:items-center">
                        <div className="text-left text-lg font-medium text-black dark:text-white mb-2">
                            Investmest: {settings.currency} <b>{props.investment.amount}</b> <br />
                            Maturity: {settings.currency} <b>{CompoundIncrement(props.investment.amount, props.investment.interest , new Date(props.investment.end).getFullYear() - new Date(props.investment.start).getFullYear() ).toFixed(2)}</b>
                        </div>
                        <div className="grid grid-flow-col gap-3 my-2">
                            <button onClick={() => deleteInvestmentRecord(props.investment.id)} type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 inline-flex justify-center">
                            <svg viewBox="0 0 448 512" className="h-4 w-4 my-1 mx-2">
                                <path fill="#ffffff" d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"/>
                            </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
    );
}