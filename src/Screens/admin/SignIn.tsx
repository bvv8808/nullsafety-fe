import React from "react";
import { RouteChildrenProps } from "react-router";
import { admSignIn } from "../../lib/fetcher";

const SignInScreen = ({ history }: RouteChildrenProps) => {
  return (
    <div>
      <input type="text" id="inputK" />
      <button
        onClick={() => {
          const i: HTMLInputElement | null = document.querySelector("#inputK");
          if (!i || !i.value.length) return;
          admSignIn(i.value)
            .then((authSuccess) => {
              if (authSuccess) history.replace("/adm/dash");
              else alert("Fail to sign in");
            })
            .catch((e) => {
              console.log("Fail to sign in", e);
              alert("Fail to sign in");
            });
        }}
      >
        GO
      </button>
    </div>
  );
};

export default SignInScreen;
