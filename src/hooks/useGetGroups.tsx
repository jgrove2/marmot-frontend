import { useQuery } from "@tanstack/react-query";
import { store } from "../util/Store";
import { useStore } from "@tanstack/react-store";
import { Session } from "@supabase/supabase-js";

function useGetGroups(isAuthenticated: boolean) {
  const session = useStore(
    store,
    (state): Session | undefined => state["session"]
  );
  const fetchGroups = async () => {
    try {
      const result = await fetch(
        `${import.meta.env.VITE_WORKER_URL}/group/get`,
        {
          headers: { Authorization: `Bearer ${session?.access_token}` },
        }
      );
      if (result.status === 200) {
        return result.json();
      } else {
        return [];
      }
    } catch (err) {
      throw Error("Error getting groups");
    }
  };
  return useQuery({
    queryKey: ["getGroups", isAuthenticated],
    queryFn: (queryPayload) => {
      if (queryPayload.queryKey[0]) return fetchGroups();
    },
  });
}

export default useGetGroups;
