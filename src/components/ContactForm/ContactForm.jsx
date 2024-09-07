import { Formik, Form, Field, ErrorMessage } from "formik";
import css from "./ContactForm.module.css";
import * as Yup from "yup";
import { nanoid } from "nanoid";

export default function ContactForm({ addContact }) {
  const UserSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, "Too short!")
      .max(50, "Too long!")
      .required("Required"),
    usernumber: Yup.string()
      .min(10, "Too short!")
      .max(13, "Too long!")
      .required("Required"),
  });
  const handleSubmit = (values, actions) => {
    const newContact = {
      name: values.username,
      number: values.usernumber,
    };

    addContact(newContact);
    actions.resetForm();
  };
  return (
    <Formik
      initialValues={{
        id: nanoid(),
        username: "",
        usernumber: "",
      }}
      validationSchema={UserSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label>Name</label>

          <Field type="text" className={css.input} name="username" />
          <ErrorMessage name="username" component="div" />
        </div>
        <div className={css.formGroup}>
          <label>Number</label>

          <Field type="text" className={css.input} name="usernumber" />
          <ErrorMessage name="usernumber" component="div" />
        </div>
        <button type="submit">Add contact</button>
      </Form>
    </Formik>
  );
}
