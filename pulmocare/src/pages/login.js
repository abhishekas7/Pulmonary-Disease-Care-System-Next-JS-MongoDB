import Script from "next/script";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";

export default function Home() {
  const router = useRouter();
  const data = useSession();
  console.log(data.role);
  useEffect(() => {
    if (data.status == "authenticated") {
      router.push("/");
    }
  }, []);

  function onCapcha(value) {
    console.log("Captcha value:", value);
  }

  return (
    <>
      <link rel="shortcut icon" href="img/favicon.png" type="image/x-icon" />
      <link rel="stylesheet" href="css/font-icons.css" />
      <link rel="stylesheet" href="css/plugins.css" />
      <link rel="stylesheet" href="css/style.css" />
      <link rel="stylesheet" href="css/responsive.css" />
      <div className="ltn__login-area pb-65">
        Status : {data.status}
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title-area text-center">
                <h6 className="section-title">
                  Sign In <br />
                </h6>
                <p>
                  Sign in to your Account
                  <br />
                  Order Medical products from PulmoCare as Per the Physician
                  Suggestion
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="account-login-inner">
                <Formik
                  initialValues={{ email: "", password: "" }}
                  validationSchema={Yup.object({
                    email: Yup.string()
                      .email("Invalid email address")
                      .required("Required")
                      .min(6, "Email must be at least 6 characters")
                      .max(50, "Email cannot exceed 50 characters")
                      .matches(
                        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z]{2,}$/i,
                        "Invalid email format"
                      ),
                    password: Yup.string()
                      .required("Required")
                      .min(8, "Password must be at least 8 characters")
                      .max(50, "Password cannot exceed 50 characters")
                      .matches(
                        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
                      ),
                  })}
                  onSubmit={async (values, { setSubmitting, resetForm }) => {
                    const result = await signIn("credentials", {
                      redirect: false,
                      email: values.email,
                      password: values.password,
                    });

                    if (result.error) {
                      toast.error("Invalid Email or Password");
                    } else {
                      toast.success("Login Sucessfully..");
                      router.push("/");
                    }
                    resetForm();
                  }}
                >
                  {(formik) => (
                    <Form className="ltn__form-box contact-form-box">
                      <Field type="text" name="email" placeholder="Email*" />
                      <ErrorMessage name="email" className="text-danger" />

                      <Field
                        type="password"
                        name="password"
                        placeholder="Password*"
                      />
                      <ErrorMessage name="password" className="text-danger" />
                      <ReCAPTCHA
    sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
    onChange={onCapcha}
  />,
                      <div className="btn-wrapper mt-0">
                        <button
                          className="theme-btn-1 btn btn-block"
                          type="submit"
                          disabled={formik.isSubmitting}
                        >
                          {formik.isSubmitting ? "Signing in..." : "SIGN IN"}
                        </button>
                      </div>
                      <div></div>
                      <div className="go-to-btn mt-20">
                        <a href="#">
                          <small>FORGOTTEN YOUR PASSWORD?</small>
                        </a>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="account-create text-center pt-50">
                <h4>DONT HAVE AN ACCOUNT?</h4>
                <p>
                  Go to Register Page and Creat the Account First <br />
                  Happy Diagnosis !!
                </p>
                <div className="btn-wrapper">
                  <a href="register" className="theme-btn-1 btn black-btn">
                    CREATE ACCOUNT
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <Script src="https://example.com/script.js" />
      <Script src="js/plugins.js"></Script>
    </>
  );
}
