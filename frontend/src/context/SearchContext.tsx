import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

type SortBy = "dueDate" | "priority" | "";
type SortOrder = "asc" | "desc";

type SearchContextType = {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  priorityFilter: string;
  setPriorityFilter: Dispatch<SetStateAction<string>>;
  stateFilter: string;
  setStateFilter: Dispatch<SetStateAction<string>>;
  sortBy: SortBy;
  setSortBy: Dispatch<SetStateAction<SortBy>>;
  sortOrder: SortOrder;
  setSortOrder: Dispatch<SetStateAction<SortOrder>>;
};

export const SearchContext = createContext<SearchContextType | null>(null);

export function SearchContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [stateFilter, setStateFilter] = useState("all");
  const [sortBy, setSortBy] = useState<SortBy>("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  return (
    <SearchContext.Provider
      value={{
        search,
        setSearch,
        priorityFilter,
        setPriorityFilter,
        stateFilter,
        setStateFilter,
        sortBy,
        setSortBy,
        sortOrder,
        setSortOrder,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error(
      "The Search context needs to be consumed inside a provider"
    );
  }
  return context;
};
