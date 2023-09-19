import { createContext,useContext,useCallback,useMemo,useState } from "react";
import { DataStore } from "../utils/StorageProvider";

const defaultSettings = {
    currency: "₹",
    slabs: [[250000,0],[500000,0.05],[1000000,0.20],[Number.POSITIVE_INFINITY,0.30]],
    interest: 2.70
}
var settingsObject = await DataStore.getItem("settings") || defaultSettings

const SettingContext = createContext(settingsObject);

export function useSetting() {
    const settings = useContext(SettingContext);
    return settings;
}

export function SettingsProvider({ children }) {
    const [settings, setSettings] = useState(settingsObject);

    const editSettings = useCallback((newSetting) => {
        if (!newSetting || !newSetting.currency || !newSetting.slabs || !newSetting.interest ){
            throw Error("Few details are missing!")
        }
        settingsObject = newSetting
        DataStore.setItem("settings",settingsObject)
        setSettings(settingsObject);
    }, []);

    const resetSettings = useCallback(() => {
        settingsObject = defaultSettings;
        DataStore.removeItem("settings")
        setSettings(defaultSettings);
    },[])

    const value = useMemo(
        () => ({ settings, editSettings, resetSettings }),
        [settings, editSettings, resetSettings]
    );

    return (
        <SettingContext.Provider value={value}>
            {children}
        </SettingContext.Provider>
    );
}