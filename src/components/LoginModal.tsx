import { Button, Modal } from "@mantine/core";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { useStore } from "@tanstack/react-store";
import { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { store, updateStore } from "../util/Store";
import { Auth } from "@supabase/auth-ui-react";
import { redirect, useNavigate } from "@tanstack/react-router";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { createNewSupabaseClient } from "../util/Supabase";

function LoginModal(props: { opened: boolean; close: () => void }) {
  const supabaseClient = useStore(
    store,
    (state): undefined | SupabaseClient => state["supabaseClient"]
  );
  const navigate = useNavigate();
  useEffect(() => {
    updateStore("supabaseClient", () => createNewSupabaseClient());
  }, []);
  useEffect(() => {
    if (supabaseClient) {
      supabaseClient.auth.onAuthStateChange(async (event) => {
        console.log(event);
        if (event === "SIGNED_OUT") {
          navigate({ to: "/" });
        } else if (event === "SIGNED_IN") {
          navigate({ to: "/home" });
        }
      });
    }
  }, [supabaseClient]);

  return (
    <>
      <Modal opened={props.opened} onClose={props.close} title="Login" centered>
        {supabaseClient ? (
          <Auth
            supabaseClient={supabaseClient}
            providers={["github"]}
            appearance={{ theme: ThemeSupa }}
          ></Auth>
        ) : (
          <div>An Error has Occured</div>
        )}
      </Modal>
    </>
  );
}

export default LoginModal;
