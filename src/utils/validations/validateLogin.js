export default function validateContact(values, t) {
  const validateEmailOrMobile = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^[6-9][0-9]{9}$/;
    return emailRegex.test(value) || mobileRegex.test(value);
  };

  const errors = {};

  if (!values.emailMobile.trim()) {
    errors.emailMobile = t("login.form.errors.emailmobile");
  } else if (!validateEmailOrMobile(values.emailMobile)) {
    errors.emailMobile = t("login.form.errors.emailmobile1");
  }

  if (!values.password.trim()) {
    errors.password = t("login.form.errors.password");
  }

  return errors;
}