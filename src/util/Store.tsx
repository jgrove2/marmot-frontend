import { Store } from "@tanstack/react-store";
import { StoreType } from "../types/store.type";

const store = new Store<StoreType>({
  supabaseClient: undefined,
  isAuthenticated: false,
  session: undefined,
  budgetTableData: [],
});

function updateStore(key: string, updateFunc: any) {
  store.setState((state) => {
    return {
      ...state,
      [key]: updateFunc(key),
    };
  });
}

export { store, updateStore };
