import { PieChart, Pie, ResponsiveContainer,Tooltip } from 'recharts';
import { LiveIncomeSource } from '../utils/DataOrganizers';

export default function IncomePieGraph(){
    const graph2 = LiveIncomeSource()
    
    return (
        <div className="w-full md:w-[30%] h-1/2 md:h-3/4 p-5">
            <h5 className="mb-4 font-semibold text-lg font-normal text-gray-500 lg:text-2xl dark:text-white">Income Distribution</h5>
            {
                graph2.length < 1 &&
                (
                    <div className='text-lg font-normal text-gray-500 dark:text-gray-400'>
                        No Income this month.
                    </div>
                )
            }
            {
                graph2.length > 0 &&
                (
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                dataKey="Income"
                                isAnimationActive={false}
                                data={graph2}
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                fill="#2284d8"
                                label
                            />
                            <Tooltip contentStyle={{borderRadius:10}} />
                        </PieChart>
                    </ResponsiveContainer>
                )
            }
            
            
        </div>
    );
}