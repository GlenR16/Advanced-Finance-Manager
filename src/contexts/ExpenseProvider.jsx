import { createContext,useContext,useCallback,useMemo,useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { DataStore } from "../utils/StorageProvider";

var expenseList = await DataStore.getItem("expenseList") || []

const ExpenseContext = createContext(expenseList);

export function useExpense() {
    const income = useContext(ExpenseContext);
    return income;
}

export function ExpenseProvider({ children }) {
    const [expense, setExpense] = useState(expenseList);

    const addExpense = useCallback((newExpense) => {
        if (!newExpense || !newExpense.name || !newExpense.amount || !newExpense.start || !newExpense.recurrence ){
            throw Error("Few details are missing.")
        }
        if (newExpense.end && new Date(newExpense.start) > new Date(newExpense.end)){
            throw Error("End date cannot be before start date.")
        }
        newExpense.id = uuidv4()
        expenseList = expenseList.concat(newExpense)
        DataStore.setItem("expenseList",expenseList)
        setExpense(expenseList);
    }, []);

    const removeExpense = useCallback((id) => {
        if (!id){
            throw Error("Expense ID is missing!")
        }
        expenseList = expenseList.filter((obj) => obj.id !== id);
        DataStore.setItem("expenseList",expenseList)
        setExpense(expenseList);
    }, []);

    const deleteAllExpense = useCallback(() => {
        expenseList = []
        DataStore.removeItem("expenseList")
        setExpense(expenseList);
    }, [])

    const value = useMemo(
        () => ({ expense, addExpense,removeExpense,deleteAllExpense }),
        [expense, addExpense,removeExpense,deleteAllExpense]
    );

    return (
        <ExpenseContext.Provider value={value}>
            {children}
        </ExpenseContext.Provider>
    );
}