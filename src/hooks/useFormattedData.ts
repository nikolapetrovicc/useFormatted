import { useState, useMemo, useEffect } from "react";

type UserType = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  zip: number;
  birthdate: string;
  city: string;
};

type FilterFunc = (user: UserType) => boolean;
type SortFunc = (a: UserType, b: UserType) => number;

interface UseFormattedDataReturn {
  formatted: UserType[];
  filter: (filterFunc: FilterFunc) => void;
  sortBy: (sortFunc: SortFunc | keyof UserType) => void;
  search: (query: string) => void;
}

export const useFormattedData = (data: UserType[]): UseFormattedDataReturn => {
  const [formattedData, setFormattedData] = useState<UserType[]>([]);
  const [filterFunc, setFilterFunc] = useState<FilterFunc>(() => () => true);
  const [sortFunc, setSortFunc] = useState<SortFunc>(() => () => 0);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const filteredData = data.filter(filterFunc);

    const searchedData =
      searchQuery === ""
        ? filteredData
        : filteredData.filter((user) =>
            Object.values(user)
              .join(" ")
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
          );
    const sortedData = searchedData.sort(sortFunc);

    setFormattedData(sortedData);
  }, [data, filterFunc, sortFunc, searchQuery]);

  const filter = (filterFunc: FilterFunc) => {
    setFilterFunc(() => filterFunc);
  };

  const sortBy = (sortFunc: SortFunc | keyof UserType) => {
    if (typeof sortFunc === "string") {
      setSortFunc(
        () => (a: any, b: any) => a[sortFunc].localeCompare(b[sortFunc])
      );
    } else {
      setSortFunc(() => sortFunc);
    }
  };

  const search = (query: string) => {
    setSearchQuery(query);
  };

  return { formatted: formattedData, filter, sortBy, search };
};
