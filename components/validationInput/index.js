import PhoneInput from 'react-phone-input-2';
const countryCode = 'co';
import 'react-phone-input-2/lib/style.css';
import styles from './validation.module.css';
const ValidationInput = ({
  label,
  state,
  type,
  placeholder,
  onChange,
  defaultValue,
  value,
  step,
  min,
}) => {
  return (
    <div className={styles.container}>
      <div>
        <label>{label}</label>
      </div>
      {type === 'phone' ? (
        <PhoneInput
          inputClass={styles.phoneInput}
          dropdownClass={styles.phoneDropdown}
          // isValid={() => {
          //   return state.valid;
          // }}
          // localization={en}
          country={countryCode}
          // onlyCountries={[
          //   countryCode
          // ]}
          defaultValue={defaultValue}
          onChange={onChange}
        />
      ) : (
        <input
          //   valid={state.valid}
          //  invalid={!state.valid}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          type={type}
          placeholder={placeholder}
          step={step}
          min={min}
        />
      )}
      <div
      //   valid={state.valid}
      >
        {
          //  state.stateText
        }
      </div>
    </div>
  );
};
export default ValidationInput;
