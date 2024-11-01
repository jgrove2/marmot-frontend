import LoginModal from "../components/LoginModal";
import { useDisclosure } from "@mantine/hooks";
import { SupabaseClient } from "@supabase/supabase-js";
import { store, updateStore } from "../util/Store";
import { useStore } from "@tanstack/react-store";
import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { createNewSupabaseClient } from "../util/Supabase";

function Login() {
  const [opened, { open, close }] = useDisclosure(false);
  const supabaseClient = useStore(
    store,
    (state): undefined | SupabaseClient => state["supabaseClient"]
  );
  const navigate = useNavigate();
  useEffect(() => {
    const checkForSession = async () => {
      const session = await supabaseClient?.auth.getUser();
      if (session?.data?.user) {
        updateStore("session", () => session.data);
        navigate({ to: "/home" });
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
    <div
      style={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {opened && <LoginModal opened={opened} close={close} />}
      <button onClick={() => open()}>Login</button>
    </div>
  );
}

export default Login;
