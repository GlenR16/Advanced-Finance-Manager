import { createContext,useContext,useCallback,useMemo,useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { DataStore } from "../utils/StorageProvider";

var incomesList = await DataStore.getItem("incomesList") || []

const IncomeContext = createContext(incomesList);

export function useIncome() {
    const income = useContext(IncomeContext);
    return income;
}

export function IncomeProvider({ children }) {
    const [income, setIncome] = useState(incomesList);

    const addIncome = useCallback((newIncome) => {
        if (!newIncome || !newIncome.name || !newIncome.amount || !newIncome.start || !newIncome.increment ){
            throw Error("Few details are missing!")
        }
        if (newIncome.end && new Date(newIncome.start) > new Date(newIncome.end)){
            throw Error("End date cannot be before start date.")
        }
        newIncome.id = uuidv4()
        incomesList = incomesList.concat(newIncome)
        DataStore.setItem("incomesList",incomesList)
        setIncome(incomesList);
    }, []);

    const removeIncome = useCallback((id) => {
        if (!id){
            throw Error("Income ID is missing!")
        }
        incomesList = incomesList.filter((obj) => obj.id !== id);
        DataStore.setItem("incomesList",incomesList)
        setIncome(incomesList);
    }, []);

    const editIncome = useCallback((id,newIncome) => {
        if (!id || !newIncome || !newIncome.name || !newIncome.amount || !newIncome.start || !newIncome.increment ){
            throw Error("Few details are missing!")
        }
        if (newIncome.end && new Date(newIncome.start) > new Date(newIncome.end)){
            throw Error("End date cannot be before start date.")
        }
        newIncome.id = id
        incomesList[incomesList.findIndex(x => x.id == id)] = newIncome
        incomesList = incomesList.concat([])
        DataStore.setItem("incomesList",incomesList)
        setIncome(incomesList);
    }, []);

    const deleteAllIncome = useCallback(() => {
        incomesList = []
        DataStore.removeItem("incomesList")
        setIncome(incomesList);
    },[])

    const value = useMemo(
        () => ({ income, addIncome,removeIncome,editIncome,deleteAllIncome }),
        [income, addIncome,removeIncome,editIncome,deleteAllIncome]
    );

    return (
        <IncomeContext.Provider value={value}>
            {children}
        </IncomeContext.Provider>
    );
}