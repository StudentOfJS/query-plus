/**
 * @todo add maxAge + timestamp to value object on set
 * @todo check maxAge + timestamp on get
 * @todo do we need all of this?
 * @todo persistData -> copy data to localStorage -> check if data is in localStorage -> if so, load from localStorage
 * @todo add options to useStore
*/
import { useEffect } from "react";
import { clear, del, get, getMany, set, setMany, update } from 'idb-keyval';

export interface UseStoreProps {
    persistData: boolean
}

export const useStore = ({persistData}: UseStoreProps) => {
    useEffect(() => {
        
    
        return () => {
            
        }
    }, []);
    return { clear, del, get, getMany, set, setMany }
}