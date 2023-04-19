import styles from "./register.module.css";
import ValidationInput from "../validationInput";
import { countries } from "countries-list";
import {
  // loadUser,
  useRegister,
  validateName,
  validateSurname,
  validateEmail,
  validateCell2,
  // validateBirthDay,
  validatePass,
  validateDocument,
  setCountry,
  setDocType,
  // setCity,
  // setField,
  register,
  edit,
  // initCities,
  // setMotive,
} from "vStore/register";
import { useOverlays } from "vStore/overlays";
import { useEffect } from "preact/hooks";
import { useJasmin } from "vStore/jasmin";
export default function RegisterForm({ onAuth, isManaged = false }) {
  const {
    user,
    exists,
    regState,
    validationStates,
    fullForm,
    regDisabled,
    userId,
  } = useRegister();
  const { neo } = useOverlays();
  const { activePerformers } = useJasmin();
  useEffect(() => {
    Object.keys(user?.info).length === 0 &&
      document.getElementById("newForm").reset();
  }, [user]);
  const regForm = () => {
    return (
      <form id="newForm">
        {false && <pre>{JSON.stringify(user, null, 2)}</pre>}
        <b style="margin-bottom:40px;">
          <h2> {userId ? "Editar usuario" : "Crear nuevo usuario"}</h2>
        </b>
        {false && (
          <>
            <ValidationInput
              type="email"
              label={"📧 EMAIL"}
              value={user.info.email}
              state={validationStates["email"].state}
              onChange={validateEmail}
              placeholder="correo@email.com"
            />
            {exists && !isManaged && (
              <ValidationInput
                type="password"
                label={"🔑 PASSWORD"}
                state={validationStates["pass"].state}
                onChange={validatePass}
                placeholder="secretPassword@#"
              />
            )}
            <br />
            <h6>
              <b>
                {!fullForm && exists
                  ? "🥺 YOU HAVE BEEN HERE BEFORE! GREAT"
                  : !fullForm
                  ? "👀 LETS LOOK FOR THE ACCOUNT"
                  : "JUST SOME INFORMATION"}
              </b>
            </h6>
            <br />
          </>
        )}
        {userId && user.model && (
          <h2>
            💃🏽
            {
              activePerformers.find(
                (model) => model.screenName == user.model.jasmin
              )?.displayName
            }
          </h2>
        )}
        <div>
          <ValidationInput
            type="text"
            label={"NOMBRES"}
            // state={validationStates["name"].state}
            value={user?.info?.name}
            onChange={validateName}
            placeholder="Miguel"
          />
        </div>
        <div>
          <ValidationInput
            type="text"
            label={"APELLIDOS"}
            value={user?.info?.surname}
            // state={validationStates["surname"].state}
            onChange={validateSurname}
            placeholder="Pinto Kononenko"
          />
        </div>
        <br />
        <i>Puedes llenar estos mas adelante</i>
        <br />
        <div style="padding-top:5px;padding-bottom:5px;">
          <div>TIPO DE DOCUMENTO</div>
          <select
            style="width:100%"
            onChange={(e) => {
              setDocType(e.target.value);
            }}
            defaultValue={user?.info?.documentType}
          >
            <option>Seleccionar documento</option>
            <option value="cc">CEDULA CIUDADANIA</option>
            <option value="ce">CEDULA EXTRANJERIA</option>
            <option value="passport">PASAPORTE</option>
          </select>
        </div>
        <div>
          <ValidationInput
            type="text"
            label={"NUMERO DE DOCUMENTO"}
            state={validationStates["document"].state}
            value={user?.info.document}
            onChange={validateDocument}
            placeholder="123456789"
          />
          {/* <input /> */}
        </div>
        <div style="padding-bottom:5px;gap:5px;display:flex;flex-direction:column;align-items:stretch;">
          <div>
            {user?.info?.country
              ? `PAIS ( ${countries[user.info.country]?.emoji} ${
                  countries[user?.info.country]?.name
                })`
              : "PAIS (Selecciona un pais)"}
          </div>
          <input
            // style={{ width: '80%' }}
            placeholder="Type Country Name"
            list="country"
            value={user?.info.country}
            onChange={(e) => {
              e.target.value = e.target.value.toUpperCase();
              const found = Object.keys(countries).find(
                (key) => key == e.target.value.toUpperCase()
              );
              if (found) {
                setCountry(e.target.value.toUpperCase());
                console.log(JSON.stringify(e.target.value));
              } else {
                setCountry(null);
              }
            }}
          />
          <datalist id="country" style={{ width: "100%" }}>
            {Object.keys(countries).map((key, value) => {
              return (
                <option
                  value={key}
                >{` ${countries[key].name} ${countries[key].emoji} (${key})`}</option>
              );
            })}
          </datalist>
        </div>
        {/* <div style="padding-top:5px;padding-bottom:5px;"> */}
        {/*   <div>MOTIVO VIAJE</div> */}
        {/*   {/1* <select *1/} */}
        {/*   {/1*   style="width:100%" *1/} */}
        {/*     onChange={(e) => { */}
        {/*       setMotive(e.target.value); */}
        {/*     }} */}
        {/*     defaultValue={user.info.motive} */}
        {/*   > */}
        {/*     <option>Seleccionar motivo</option> */}
        {/*     <option value="other">OTRO</option> */}
        {/*     <option value="turism">TURISMO</option> */}
        {/*     <option value="study">ESTUDIO</option> */}
        {/*     <option value="work">TRABAJO</option> */}
        {/*   </select> */}
        {/* </div> */}
        {/* <div> */}
        {/*   CITY */}
        {/*   <select */}
        {/*     style={{ width: '100%' }} */}
        {/*     onChange={(e) => { */}
        {/*       setCity(e.target.value); */}
        {/*       // console.log(JSON.stringify(e.target.value)); */}
        {/*     }} */}
        {/*   > */}
        {/*     {cities.map((city) => { */}
        {/*       return <option value={city}>{`${city}`}</option>; */}
        {/*     })} */}
        {/*   </select> */}
        {/* </div> */}
        {fullForm ||
          (true && (
            <div>
              <ValidationInput
                type="phone"
                label={"📱 TELEFONO (opcional)"}
                state={validationStates["cell"].state}
                defaultValue={user?.info?.cell}
                onChange={validateCell2}
                placeholder="+57 3153410282"
              />
              {/* <ValidationInput */}
              {/*   type="date" */}
              {/*   label={'🎂 BIRTHDAY (optional)'} */}
              {/*   state={validationStates['birthday'].state} */}
              {/*   onChange={validateBirthDay} */}
              {/*   placeholder="" */}
              {/* /> */}
              {false && (
                <div className={styles.flexGap}>
                  <div className="flex1">
                    <ValidationInput
                      type="password"
                      label={"🔑 NEW PASS"}
                      state={validationStates["pass"].state}
                      onChange={validatePass}
                      placeholder="secretPassword@#"
                    />
                  </div>
                  <div className="flex1">
                    <ValidationInput
                      type="password"
                      label={"🔑 CONFIRM"}
                      state={validationStates["passConfirm"].state}
                      onChange={verifyPass}
                      placeholder="secretPassword@# - confirmation"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
      </form>
    );
  };
  return (
    <div class={styles.form}>
      <div>
        {regState > 0 && (
          <div>
            <h4>{logResult}</h4>
          </div>
        )}
        {regForm()}
      </div>
      <div class={styles.submit}>
        <button
          onClick={async () => {
            // alert(JSON.stringify.user.info, null, 2));
            neo.ref.current.close();
            !userId ? await register() : await edit();
          }}
          class={regDisabled && "disabled"}
          disabled={regDisabled}
        >
          {userId ? "EDITAR" : "REGISTRAR"}
        </button>
        <h6>{regDisabled ? "INFO MISSING" : "INFO IS VALID"}</h6>
      </div>
    </div>
  );
}
