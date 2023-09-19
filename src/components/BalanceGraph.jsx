import { CartesianGrid, XAxis, YAxis, Tooltip, AreaChart, Area,ResponsiveContainer } from 'recharts';
import { CumulativeIncome } from '../utils/DataOrganizers';

export default function BalanceGraph(){
    const graph1 = CumulativeIncome();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June","July", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const incomeFormatter = (num) => {
        return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'K' : Math.sign(num)*Math.abs(num)
    }
    const yearFormatter = (date) => {
        return monthNames[new Date(date).getMonth()] +" " + date.slice(2,4)
    }


    return (
        <div className="w-full md:w-[70%] h-1/2 md:h-3/4 md:p-5 flex flex-col justify-center items-center">
            <h5 className="mb-4 font-semibold text-lg font-normal text-gray-500 lg:text-2xl dark:text-white">Balance Predictions</h5>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart margin={{top: 5, right: 40, left: 20, bottom: 5}} data={graph1}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" name="Date" allowDuplicatedCategory={true} tickMargin={10} padding={{ right: 0 }} tickFormatter={yearFormatter} />
                    <YAxis tickFormatter={incomeFormatter}  />
                    <Tooltip contentStyle={{borderRadius:10}} />
                    <Area type="monotone" dataKey="Balance" stroke="#8884d8" fill="#2284d8" strokeWidth={2.5} dot={null} />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}