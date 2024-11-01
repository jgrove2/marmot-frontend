import { useStore } from "@tanstack/react-store";
import { store, updateStore } from "../util/Store";
import { Session, SupabaseClient, User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { redirect, useNavigate } from "@tanstack/react-router";
import { createNewSupabaseClient } from "../util/Supabase";
import BudgetTable from "../components/BudgetTable";
import useGetGroups from "../hooks/useGetGroups";

function Home() {
  const navigate = useNavigate();
  const supabaseClient = useStore(
    store,
    (state): undefined | SupabaseClient => state["supabaseClient"]
  );
  const isAuthenticated = useStore(
    store,
    (state): boolean => state["isAuthenticated"]
  );
  const {
    status: getGroupStatus,
    data: getGroupData,
    error,
  } = useGetGroups(isAuthenticated);

  useEffect(() => {
    if (getGroupStatus === "success") {
      updateStore("budgetTableData", () => getGroupData);
    } else if (getGroupStatus === "error") {
      updateStore("budgetTableData", () => getGroupData);
    }
  }, [getGroupStatus]);
  useEffect(() => {
    const checkForSession = async () => {
      const session = await supabaseClient?.auth.getSession();
      console.log(session?.data.session !== null);
      if (session?.data.session !== null) {
        updateStore("isAuthenticated", () => true);
        updateStore("session", () => session?.data.session);
      } else {
        updateStore("isAuthenticated", () => false);
        navigate({
          to: "/",
        });
      }
    };
    if (supabaseClient === undefined) {
      updateStore("supabaseClient", () => createNewSupabaseClient());
    } else {
      checkForSession();
    }
  }, [supabaseClient]);
  return (
    <>
      <div className="p-8 w-full">
        <BudgetTable />
      </div>
    </>
  );
}

export default Home;
