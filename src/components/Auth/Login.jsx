import React, { useState } from "react";
import Link from "next/link";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import { userLoginService } from "@/services/auth";
import { toastConfig } from "@/utils/config";
import { userLoginValidationSchema } from "@/utils/validations";
import { useAuthCtx } from "@/context/AuthCtx";

const Login = (props) => {
  const router = useRouter();
  const { _authenticate } = useAuthCtx();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { values, handleChange, handleSubmit, handleBlur, errors, touched } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: userLoginValidationSchema,
      onSubmit: async (values) => {
        setIsSubmitting(true);
        try {
          const res = await userLoginService(values);
          toast.success(
            res?.data?.message ?? "Logged in successfully!",
            toastConfig
          );
          _authenticate({
            userDetails: res?.data?.data?.user,
            accessToken: res?.data?.data?.jwtToken,
          });
          router.push("/dashboard");
        } catch (err) {
          toast.error(err?.data?.message, toastConfig);
        } finally {
          setIsSubmitting(false);
        }
      },
    });

  return (
    <div
      className="container w-100 h-100 d-flex justify-content-center align-items-center pt-1"
      style={{ flex: "1 0 auto" }}
    >
      <div className="row justify-content-center">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-5">
          <div className="card border border-light-subtle rounded-3 shadow-sm">
            <div className="card-body p-3 p-md-4 p-xl-4">
              <div className="text-center mb-3">
                <p className="fw-bold m-0 fs-4">Habit Tracker</p>
              </div>
              <h2 className="fs-6 fw-normal text-center text-secondary mb-4">
                Sign in to your account
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="row gy-2 overflow-hidden">
                  <div className="col-12">
                    <div className="form-floating mb-1">
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        id="email"
                        placeholder="name@example.com"
                        required
                        onChange={handleChange}
                        value={values.email}
                        onBlur={handleBlur}
                      />
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                    </div>
                    {touched.email && errors.email ? (
                      <p className="mb-1 text-danger">{errors.email}</p>
                    ) : null}
                  </div>
                  <div className="col-12">
                    <div className="form-floating mb-1">
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        id="password"
                        placeholder="Password"
                        required
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.password}
                      />
                      <label htmlFor="password" className="form-label">
                        Password
                      </label>
                    </div>
                    {touched.password && errors.password ? (
                      <p className="mb-1 text-danger">{errors.password}</p>
                    ) : null}
                  </div>

                  <div className="col-12">
                    <div className="d-grid my-3">
                      <button
                        className="btn btn-primary btn-lg"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        Log in
                      </button>
                    </div>
                  </div>
                  <div className="col-12">
                    <p className="m-0 text-secondary text-center">
                      Don&apos;t have an account?{" "}
                      <Link
                        href="/signup"
                        className="link-primary text-decoration-none"
                      >
                        Sign up
                      </Link>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
