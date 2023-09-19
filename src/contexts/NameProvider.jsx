import { createContext,useContext,useCallback,useMemo,useState } from "react";
import { GeneralStore } from "../utils/StorageProvider";

var dbName = await GeneralStore.getItem("name")
    
const NameContext = createContext(dbName);

export function useName() {
    const name = useContext(NameContext);
    return name;
}

export function NameProvider({ children }) {
    const [name, setName] = useState(dbName);

    const changeName = useCallback((name) => {
        if (!name){
            throw Error("Name cannot be empty!")
        }
        GeneralStore.setItem("name",name)
        setName(name);
    }, []);

    const deleteName = useCallback(() => {
        GeneralStore.removeItem("name")
        setName(null)
    }, []);

    const value = useMemo(
        () => ({ name, changeName,deleteName }),
        [name, changeName,deleteName]
    );

    return (
        <NameContext.Provider value={value}>
            {children}
        </NameContext.Provider>
    );
}