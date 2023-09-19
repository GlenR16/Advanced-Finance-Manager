import { lazy,Suspense } from "react";
import LoadingGraph from "../components/LoadingGraph";
export default function Dashboard(){

    const BalanceSheet = lazy(() => import("../components/BalanceSheet"))
    const BalanceGraph = lazy(() => import("../components/BalanceGraph"))
    const IncomePieGraph = lazy(() => import("../components/IncomePieGraph"))
    
    
    

    return (
        <section className="bg-white dark:bg-gray-900 grow">
            <div className="md:py-4 md:px-4 mx-auto w-full h-full flex flex-row">
                <div className="grow flex flex-col gap-2 items-center mt-5 md:mt-2 text-center">
                    <h1 className="font-semibold text-2xl font-normal text-gray-500 lg:text-3xl sm:px-5 lg:px-10 dark:text-white">
                        Dashboard
                    </h1>
                    <Suspense fallback={<LoadingGraph />}>
                        <div className="w-full flex flex-col md:flex-row item-center gap-5">
                            <div className="w-full flex flex-col items-center">
                                <BalanceSheet />
                            </div>
                        </div>
                        <div className="w-full h-[90vh] flex flex-col md:flex-row item-center gap-5">
                            <BalanceGraph />
                            <IncomePieGraph />
                        </div>
                    </Suspense>
                    
                </div>   
            </div>
        </section>
    );
}