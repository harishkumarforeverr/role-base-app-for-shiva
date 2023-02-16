export const regexPassword =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
export var regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
export const handleChangePasswordUtils = (
  e,
  setFormData,
  passwordErrorHandler
) => {
  const { name, value } = e.target;
  // updating the formData which user entered values here
  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
  if (value === "") {
    passwordErrorHandler(name, true, "This Field Is Mandatory");
  } else if (value.length < 5) {
    passwordErrorHandler(name, true, "This field Is Must Be Min 5 Characters");
  } else {
    passwordErrorHandler(name, false, "");
  }
};
export const handleChangeEmailUtils = (e, setFormData, emailErrorHandler) => {
  const { name, value } = e.target;
  // updating the formData which user entered values here
  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
  if (value === "") {
    emailErrorHandler(name, true, "This Field Is Mandatory");
  } else if (regexEmail.test(value)) {
    emailErrorHandler(name, false, "");
  } else {
    emailErrorHandler(name, true, "Please Enter Valid Email");
  }
};
