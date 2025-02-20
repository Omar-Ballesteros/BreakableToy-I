import React, { createContext, Dispatch, SetStateAction, useContext, useState} from "react";


type SearchContextType = {
    search: string;
    setSearch: Dispatch<SetStateAction<string>>;
    priorityFilter: string;
    setPriorityFilter: Dispatch<SetStateAction<string>>;
    stateFilter: string;
    setStateFilter: Dispatch<SetStateAction<string>>;
  }

export const SearchContext = createContext<SearchContextType|null>(null) 

export function SearchContextProvider({children}:{children:React.ReactNode}){
    const [search, setSearch] = useState("");
    const [priorityFilter, setPriorityFilter] = useState("")
    const [stateFilter, setStateFilter] = useState("")

    return (
        <SearchContext.Provider value={{search, setSearch, priorityFilter, setPriorityFilter, stateFilter, setStateFilter}}>
            {children}
        </SearchContext.Provider>
    )
} 

export const useSearchContext = () => {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error("The Search context needs to be consumed inside a provider");
    }
    return context;
}
