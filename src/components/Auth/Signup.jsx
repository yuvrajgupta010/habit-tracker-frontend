import { userSignupService } from "@/services/auth";
import { toastConfig } from "@/utils/config";
import { userSignupValidationSchema } from "@/utils/validations";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-toastify";

const Signup = () => {
  const [isAgreeOnTerms, setIsAgreeOnTerms] = useState(false);
  const router = useRouter();

  const { values, handleChange, handleSubmit, handleBlur, errors, touched } =
    useFormik({
      initialValues: {
        fullName: "",
        email: "",
        password: "",
      },
      validationSchema: userSignupValidationSchema,
      onSubmit: async (values) => {
        try {
          const res = await userSignupService(values);
          router.push("/login");
          toast.success(
            res?.data?.message ?? "Account has been created!",
            toastConfig
          );
        } catch (err) {
          toast.error(err?.data?.message, toastConfig);
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
            <div className="card-body p-3 p-md-3 p-xl-3">
              <div className="text-center mb-3">
                <p className="fw-bold m-0 fs-4">Habit Tracker</p>
              </div>
              <h2 className="fs-6 fw-normal text-center text-secondary mb-4">
                Create your account
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="row gy-2 overflow-hidden">
                  <div className="col-12">
                    <div className="form-floating mb-1">
                      <input
                        type="text"
                        className="form-control"
                        name="fullName"
                        id="fullName"
                        placeholder="Honey Singh"
                        required
                        onChange={handleChange}
                        value={values.fullName}
                        onBlur={handleBlur}
                      />

                      <label htmlFor="fullName" className="form-label">
                        Full Name
                      </label>
                    </div>
                    {touched.fullName && errors.fullName ? (
                      <p className="mb-1 text-danger">{errors.fullName}</p>
                    ) : null}
                  </div>
                  <div className="col-12">
                    <div className="form-floating mb-1">
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        id="email"
                        placeholder="name@example.com"
                        required
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.email}
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
                    <div className="d-flex gap-2 justify-content-between">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={isAgreeOnTerms}
                          name="rememberMe"
                          id="rememberMe"
                          onChange={(e) => setIsAgreeOnTerms(e.target.checked)}
                        />
                        <label
                          className="form-check-label text-secondary"
                          htmlFor="rememberMe"
                        >
                          Agree on{" "}
                          <span className="text-primary">terms & policy</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="d-grid my-3">
                      <button
                        className="btn btn-primary btn-lg"
                        type="submit"
                        disabled={!isAgreeOnTerms}
                      >
                        Sign up
                      </button>
                    </div>
                  </div>
                  <div className="col-12">
                    <p className="m-0 text-secondary text-center">
                      Already have account?{" "}
                      <Link
                        href="/login"
                        className="link-primary text-decoration-none"
                      >
                        Login
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

export default Signup;
