import { useEffect, useState } from 'preact/hooks';
import { parsePhoneNumberFromString } from 'libphonenumber-js/max';
import axios from 'axios/dist/axios.min.js';

import { useUser, logIn, register } from 'vStore/user';
export const useRegisterForm = ({ isManaged, onAuth }) => {
  const [exists, setExists] = useState(false);
  const [regState, setRegState] = useState(0);
  const [logResult, setLogResult] = useState('co');

  const user = useUser();
  console.log('userIn register', user);
  useEffect(() => {
    if (user.isLoggedIn) {
      setLogResult('WELCOME');
      setTimeout(() => onAuth(), 1000);
    } else {
      setLogResult('THIS IS NOT THE PASSWORD');
    }
  }, [user]);
  const refactorNameSurname = (inputText) => {
    inputText = inputText.replace(/  +/g, ' ');
    inputText = inputText.replace(/[^a-zA-Z ]+/, '');
    var splitStr = inputText.toLowerCase().split(' ');
    splitStr = splitStr.slice(0, 2);
    for (var i = 0; i < splitStr.length; i++) {
      if (splitStr[i].length > 10) {
        splitStr[i] = splitStr[i].slice(0, 10);
      }
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(' ');
  };
  const validateName = (e) => {
    const inputText = e.target.value;
    self.name = refactorNameSurname(inputText);
    e.target.value = self.name;
    onFinishTyping(() => {
      const valid = e.target.value.length > 2;
      if (valid) {
        setValidationStatus('name', true, 'Valid name');
      } else {
        self.name = null;
        setValidationStatus('name', false, 'Name is too short');
      }
    });
  };
  const validateSurname = (e) => {
    var inputText = e.target.value;
    e.target.value = refactorNameSurname(inputText);
    onFinishTyping(() => {
      const valid = e.target.value.length > 2;
      if (valid) {
        setValidationStatus('surname', true, 'Valid surname');
        self.surname = e.target.value;
      } else {
        setValidationStatus('surname', false, 'Surname is too short');
        self.surname = null;
      }
    });
  };
  const validateBirthDay = (e) => {
    if (e.target.value) {
      self.birthday = e.target.value;
      setValidationStatus('birthday', true, 'Valid Date');
    } else {
      self.birthday = null;
      setValidationStatus('birthday', false, 'Invalid Date');
    }
  };
  const validateCell2 = (value, data) => {
    onFinishTyping(() => {
      var rawNumber = value.replace(/[^0-9]+/g, '');
      var reqLen = 20;
      rawNumber = rawNumber.slice(
        data.dialCode.length,
        data.dialCode.length + reqLen
      );
      var number = data.dialCode + ' - ' + rawNumber;
      number = '+' + number;
      const phoneNumber = parsePhoneNumberFromString(number);
      const valid =
        rawNumber.length > 5 &&
        phoneNumber != undefined &&
        phoneNumber.isValid();
      if (valid) {
        setValidationStatus('cell', true, 'Valid number');
        self.cell = number;
      } else {
        setValidationStatus('cell', false, 'Invalid number');
        self.cell = null;
      }
    });
  };
  const onFinishTyping = (callBack) => {
    self.validationTimeout = setTimeout(callBack, 500);
  };
  const validateEmail = async (e) => {
    clearTimeout(self.validationTimeout);
    console.log('hey');
    e.target.value = e.target.value.replace(/\s/g, '');
    const inputText = e.target.value;
    onFinishTyping(async () => {
      if (inputText !== '') {
        const valid = !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
          inputText
        );
        if (valid) {
          setValidationStatus('email', false, 'This email is not valid');
          self.email = null;
          if (exists) {
            setExists(false);
          }
        } else {
          self.email = inputText;
          // dispatch(checkEmail);
          console.log('axio');
          // var response = await axios.post('/api/auth/checkEmail', {
          //   email: self.email,
          // });
          // response = response.data;
          setValidationStatus('email', true, 'Valid email');
          if (true || response.user) {
            setExists(true);
            //Temp Bypass
            setValidationStatus('pass', true, 'Valid Password');
          } else {
            setExists(false);
          }
        }
      } else {
        setValidationStatus('email', null, 'Ingresa un correo');
      }
    });
  };
  const validateDocument = (e) => {
    const inputText = e.target.value;
    const valid = inputText.length >= 5;
    // && /(?=.*[A-Z])(?=.*[a-z])(?=.*[@#\$&])/.test(inputText);
    if (valid) {
      self.document = e.target.value;
      setValidationStatus('document', true, 'Valid Document');
    } else {
      self.pass = null;
      setValidationStatus('document', false, 'Invalid document');
    }
  };
  const validatePass = (e) => {
    const inputText = e.target.value;
    const valid = inputText.length >= 5;
    // && /(?=.*[A-Z])(?=.*[a-z])(?=.*[@#\$&])/.test(inputText);
    if (valid) {
      self.pass = e.target.value;
      setValidationStatus('pass', true, 'Valid Password');
    } else {
      self.pass = null;
      setValidationStatus(
        'pass',
        false,
        'Invalid format you need at least one @#$& lowercase and uppercase'
      );
    }
  };
  const verifyPass = (e) => {
    const valid = self.pass === e.target.value;
    if (valid) {
      self.passVerify = e.target.value;
      setValidationStatus('passConfirm', true, 'Match');
    } else {
      self.passVerify = null;
      setValidationStatus('passConfirm', false, 'Not matching');
    }
  };
  var validationStates = {};
  [
    'name',
    'surname',
    'username',
    'email',
    'cell',
    'birthday',
    'pass',
    'passConfirm',
    'document',
  ].forEach((value) => {
    var stateHandler = useState({
      valid: false,
      stateText: '',
    });
    validationStates[value] = { state: stateHandler[0], set: stateHandler[1] };
  });
  const goNext = () => {
    // if (regState == 0) {
    if (exists) {
      !isManaged ? logIn(self.email) : onAuth();
    } else {
      const user = {
        userInfo: {
          name: self.name,
          surname: self.surname,
          email: self.email,
          cell: self.cell,
          birthday: self.birthday,
        },
        regDate: new Date(),
        log: { pass: self.pass },
      };
      register(user);
    }
  };
  const setValidationStatus = (id, validStatus, validationText) => {
    validationStates[id].set({
      valid: validStatus,
      stateText: validationText,
    });
  };
  const regDisabled = exists
    ? !(
        validationStates['email'].state.valid &&
        validationStates['pass'].state.valid
      )
    : !(
        validationStates['name'].state.valid &&
        validationStates['surname'].state.valid &&
        validationStates['email'].state.valid &&
        validationStates['pass'].state.valid &&
        validationStates['passConfirm'].state.valid
      );
  return {
    logResult,
    exists,
    regState,
    goNext,
    setRegState,
    validationStates,
    setValidationStatus,
    regDisabled,
    validateName,
    validateSurname,
    validateEmail,
    validateCell2,
    validateBirthDay,
    validateDocument,
    validatePass,
    verifyPass,
    // fullForm: !exists && validationStates['email'].state.valid,
    fullForm: true,
  };
};
