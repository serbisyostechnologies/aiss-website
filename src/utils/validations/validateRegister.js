export default function validateRegister(values, t) {
  const errors = {};

  const validateMobile = mobile => {
    const mobileRegex = /^[6-9][0-9]{9}$/;
    return mobileRegex.test(mobile);
  };

  const validateEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  if (!values.name.trim()) {
    errors.name = t("register.form.errors.name");
  }

  if (!values.mobile.trim()) {
    errors.mobile = t("register.form.errors.mobile");
  } else if (!validateMobile(values.mobile)) {
    errors.mobile = t("register.form.errors.mobile1");
  }

  if (!values.email.trim()) {
    errors.email = t("register.form.errors.email");
  } else if (!validateEmail(values.email)) {
    errors.email = t("register.form.errors.email1");
  }

  if (!values.password.trim()) {
    errors.password = t("register.form.errors.password");
  }

  return errors;
}