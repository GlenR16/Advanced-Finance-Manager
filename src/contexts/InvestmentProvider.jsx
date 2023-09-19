import { createContext,useContext,useCallback,useMemo,useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { DataStore } from "../utils/StorageProvider";

var investmentList = await DataStore.getItem("investmentList") || []

const InvestmentContext = createContext(investmentList);

export function useInvestment() {
    const investment = useContext(InvestmentContext);
    return investment;
}

export function InvestmentProvider({ children }) {
    const [investment, setInvestment] = useState(investmentList);

    const addInvestment = useCallback((newInvestment) => {
        if (!newInvestment || !newInvestment.name || !newInvestment.amount || !newInvestment.start || !newInvestment.end || !newInvestment.interest ){
            throw Error("Few details are missing!")
        }
        if (newInvestment.end && new Date(newInvestment.start) > new Date(newInvestment.end)){
            throw Error("End date cannot be before start date.")
        }
        newInvestment.id = uuidv4()
        investmentList = investmentList.concat(newInvestment)
        DataStore.setItem("investmentList",investmentList)
        setInvestment(investmentList);
    }, []);

    const removeInvestment = useCallback((id) => {
        if (!id){
            throw Error("Income ID is missing!")
        }
        investmentList = investmentList.filter((obj) => obj.id !== id);
        DataStore.setItem("investmentList",investmentList)
        setInvestment(investmentList);
    }, []);

    const editInvestment = useCallback((id,newInvestment) => {
        if (!id || !newInvestment || !newInvestment.name || !newInvestment.amount || !newInvestment.start || !newInvestment.end || !newInvestment.interest ){
            throw Error("Few details are missing!")
        }
        if (newInvestment.end && new Date(newInvestment.start) > new Date(newInvestment.end)){
            throw Error("End date cannot be before start date.")
        }
        newInvestment.id = id
        investmentList[investmentList.findIndex(x => x.id == id)] = newInvestment
        investmentList = investmentList.concat([])
        DataStore.setItem("investmentList",investmentList)
        setInvestment(investmentList);
    }, []);
    
    const deleteAllInvestment = useCallback(() => {
        investmentList = []
        DataStore.removeItem("investmentList")
        setExpense(investmentList);
    },[])

    const value = useMemo(
        () => ({ investment,addInvestment,removeInvestment,editInvestment,deleteAllInvestment }),
        [investment, addInvestment,removeInvestment,editInvestment,deleteAllInvestment ]
    );

    return (
        <InvestmentContext.Provider value={value}>
            {children}
        </InvestmentContext.Provider>
    );
}