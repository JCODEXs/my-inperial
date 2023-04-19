import classNames from "classnames";
import styles from "components/Login/login.module.css";
import { useState, useEffect } from "react";
import {
  useLogin,
  onUserInput,
  onPassInput,
  logIn,
  resetLogin,
  register,
  checkUser,
  checkCredentials,
} from "vStore/login";
// import checkCredentials from "pages/api/auth/checkCredentials";
const Signature = ({ model, onSuccess }) => {
  const { userValid, logEnabled, feedback, loading } = useLogin();
  // const router = useRouter();
  useEffect(() => {
    checkUser(model);
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
          <input
            disabled={true}
            value={model}
            onChange={onUserInput}
            placeholder="user"
          />
        </div>
        <div
          class={classNames(styles.field, { disabled: false && !userValid })}
        >
          {/* <span>🔑</span> */}
          <img src="/assets/lockIcon.png" />
          <input
            type="password"
            disabled={false && !userValid}
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
          onClick={() => checkCredentials(onSuccess)}
        >
          Log In
        </button>
        {/* <button onClick={register}>REG</button> */}
        <div>{feedback}</div>

      </div>
      {loading && (
        <div
          style="
	      position:absolute;
          top:0px;
          left:0px;
          height:100%;
          width:100%;
          max-width:100%;
          max-height:100%;
          display:flex;
          align-items:center;
          justify-content:center;
          backdrop-filter:blur(4px);

	      "
        >
          <img style="height:100px;" src="/loading.gif" />
          
        </div>
      )}
    </div>
  );
};
export default Signature;
