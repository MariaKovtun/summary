import {Dispatch, SetStateAction, createContext} from "react";

type SearchContextType = {
    searchStr?: string,
    setSearchStr:Dispatch<SetStateAction<string|undefined>> 
}

export const SearchContext = createContext<SearchContextType>({setSearchStr: () => {}});