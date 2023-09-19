import localforage from "localforage";
import localForage from "localforage";

localForage.config({
    driver: [
        localForage.INDEXEDDB,
        localForage.LOCALSTORAGE,
        localForage.WEBSQL,
    ],
    name: 'AFM',
    version: 1.0,
});

export const DataStore = localforage.createInstance({
    name: "AFM",
    storeName: "Income"
});

export const GeneralStore = localforage.createInstance({
    name: "AFM",
    storeName: "General"
});