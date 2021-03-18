import * as React from "react";
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";

import { Formik } from "formik";
import RegisterForm from "../components/Form/RegisterForm";
import { postUserRegister } from '../actions/AuthAction';
class RegisterPage extends React.Component {
  render() {
    const { dispatch, authData,isFetching } = this.props;

    const strings = isFetching ? { buttonText: "Please wait" } : {};

    if (authData && authData.user && authData.user.email) {
      return <Redirect to="/" />
    }

    return (
      <Formik
        initialValues={{
          email: "",
          password: "",
          name: "",
          terms: false,
          username: ""
        }}
        validate={values => {
          // same as above, but feel free to move this into a class method now.
          let errors = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          return errors;
        }}
        onSubmit={(
          values,
          { setSubmitting, setErrors /* setValues and other goodies */ }
        ) => {
          if (!isFetching)
            dispatch(postUserRegister(values))
          // alert("Done!");
        }}
        render={({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          strings,
          isSubmitting,
        }) => (
          <RegisterForm
            onSubmit={handleSubmit}
            onChange={handleChange}
            onBlur={handleBlur}
            values={values}
            errors={errors}
            touched={touched}
          />
        )}
      />
    );
  }
}


function mapStateToProps({ authReducer }) {
  return authReducer;
}

export const RegisterContainer = connect(
  mapStateToProps
)(RegisterPage)