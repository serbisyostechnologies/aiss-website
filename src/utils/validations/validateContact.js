export default function validateContact(values, t) {
  const errors = {};

  if (!values.name.trim()) {
    errors.name = t("contact.contact.errors.name");
  }

  if (!values.email) {
    errors.email = t("contact.contact.errors.email");
  } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
    errors.email = t("contact.contact.errors.email1");
  }

  if (!values.mobile) {
    errors.mobile = t("contact.contact.errors.mobile");
  } else if (!/^\d{10}$/.test(values.mobile)) {
    errors.mobile = t("contact.contact.errors.mobile1");
  } else if (!/^[6-9]\d{9}$/.test(values.mobile)) {
    errors.mobile = t("contact.contact.errors.mobile2");
  }

  if (!values.subject.trim()) {
    errors.subject = t("contact.contact.errors.subject");
  }

  if (!values.message.trim()) {
    errors.message = t("contact.contact.errors.message");
  }

  return errors;
}