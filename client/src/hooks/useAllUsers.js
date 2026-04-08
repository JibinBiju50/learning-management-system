import { useQuery } from "@tanstack/react-query";
import { fetchAllUsers } from "@/api/authApi";

export const useAllUsers = () => {
    return useQuery({
        queryKey: ["users"],
        queryFn: fetchAllUsers,
    });
};