import classNames from "classnames";
import styles from "./login.module.css";
import { useState, useEffect } from "react";
import {
  useLogin,
  onUserInput,
  onPassInput,
  logIn,
  resetLogin,
  register,
} from "vStore/login";
import { useRouter } from "next/router";
const Login = () => {
  const { userValid, logEnabled, feedback, loading } = useLogin();
  const router = useRouter();
  useEffect(() => {
    return resetLogin;
  }, []);
  return (
    <div class={styles.login}>
      {/* <img src="/assets/logo_white.png" /> */}
      <div class={styles.form} style="position:relative;">
        <img src="/assets/loginIcon.png" />
        <div class={styles.field}>
          {/* <span>👤</span> */}
          <img src="/assets/userIcon.png" />
          <input onChange={onUserInput} placeholder="user" />
        </div>
        <div class={classNames(styles.field, { disabled: !userValid })}>
          {/* <span>🔑</span> */}
          <img src="/assets/lockIcon.png" />
          <input
            type="password"
            disabled={!userValid}
            onChange={onPassInput}
            placeholder="*********"
          />
        </div>
        <button
          disabled={loading || !logEnabled}
          class={classNames("btn", {
            disabled: !logEnabled,
            [styles.login_btn_valid]: logEnabled,
          })}
          onClick={() => logIn(router)}
        >
          Log In
        </button>
        {/* <button onClick={register}>REG</button> */}
        <div>{feedback}</div>
      </div>
      {loading && (
        <div
          style="
	      position:absolute;top:0px;left:0px;height:100%;width:100%;max-width:100%;max-height:100%;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(4px);

	      "
        >
          <img style="height:100px;" src="/loading.gif" />
        </div>
      )}
    </div>
  );
};
export default Login;
