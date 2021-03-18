import * as React from "react";
import { connect } from "react-redux";

import { Redirect } from 'react-router-dom'
import { Formik } from "formik";
import { postUserLogin } from '../actions/AuthAction';
import LoginForm from '../components/Form/LoginForm';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { dispatch, authReducer } = this.props;
    const {authData,isFetching} =authReducer;
    const strings = isFetching ? { buttonText: "Please wait" } : {};

    if (authData) {
      if (authData.success) {
        return <Redirect to="/" />
      }
    }
    const message = (authData && authData.success === false) ? (authData.message || "Something went wrong") : undefined

    return (
      <Formik
        initialValues={{
          email: "",
          password: "",
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
            dispatch(postUserLogin(values))
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
          isSubmitting
        }) => (

          <LoginForm
            onSubmit={handleSubmit}
            onChange={handleChange}
            onBlur={handleBlur}
            values={values}
            errors={errors}
            touched={touched}
            message={message}
          >
          </LoginForm>

        )}

      />
    );
  }
}


function mapStateToProps({ authReducer }) {
  return { authReducer };
}

export const LoginContainer = connect(
  mapStateToProps
)(LoginPage)
