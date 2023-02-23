import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../api";
import useDebounce from "@/hooks/useDebounce";

const useUsers = () => {
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search);

  const { data, isLoading } = useQuery(["users", debouncedSearch], () =>
    getAllUsers(debouncedSearch)
  );

  const userOptions = useMemo(
    () =>
      data?.users?.map((u) => ({
        value: u._id,
        label: `${u.firstName} ${u.lastName}`,
      })),
    [data]
  );
  return {
    data,
    isLoading,
    userOptions,
    search,
    setSearch,
  };
};

export default useUsers;
