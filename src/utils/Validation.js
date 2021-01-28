import { useCallback, useState } from 'react';

export function useFormWithValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [isInputChecked, setIsInputChecked] = useState({});
  const [isInputValid, setIsInputValid] = useState({});
  const [formError, setFormError] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: event.target.validationMessage });
    setIsFormValid(event.target.closest('form').checkValidity());
    setIsInputChecked({ ...isInputChecked, [name]: true });
    setIsInputValid({ ...isInputValid, [name]: event.target.checkValidity() });
  };

  const resetForm = useCallback(
    (
      newValues = {},
      newErrors = {},
      newIsFormValid = false,
      newIsInputChecked = {},
      newIsInputValid = {},
    ) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsFormValid(newIsFormValid);
      setIsInputChecked(newIsInputChecked);
      setIsInputValid(newIsInputValid);
      setFormError('');
    },
    [setValues, setErrors, setIsFormValid, setIsInputChecked, setIsInputValid],
  );

  return {
    values,
    errors,
    isFormValid,
    isInputChecked,
    isInputValid,
    handleInputChange,
    setValues,
    resetForm,
    formError,
    setFormError,
  };
}