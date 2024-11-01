import { Session, SupabaseClient, User } from "@supabase/supabase-js";
import { Group } from "./table.type";

export type StoreType = {
  supabaseClient: undefined | SupabaseClient;
  isAuthenticated: boolean;
  session: undefined | Session;
  budgetTableData: Group[];
};
