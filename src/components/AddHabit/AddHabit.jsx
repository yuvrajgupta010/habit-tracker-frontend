import React, { useState } from "react";
import Link from "next/link";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import { userLoginService } from "@/services/auth";
import { toastConfig } from "@/utils/config";
import { createHabitValidationSchema } from "@/utils/validations";
import { useAuthCtx } from "@/context/AuthCtx";
import { addHabitService } from "@/services/habit";

const AddHabit = (props) => {
  const router = useRouter();
  const { _authenticate } = useAuthCtx();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { values, handleChange, handleSubmit, handleBlur, errors, touched } =
    useFormik({
      initialValues: {
        habitName: "",
        goal: 0,
        description: "",
      },
      validationSchema: createHabitValidationSchema,
      onSubmit: async (values, { resetForm }) => {
        setIsSubmitting(true);
        try {
          const res = await addHabitService({ data: values });
          toast.success(
            res?.data?.message ?? "Habit created successfully!",
            toastConfig
          );
          resetForm({
            habitName: "",
            goal: "",
            description: "",
          });
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
          <div className="card border border-light-subtle rounded-3 shadow-sm overflow-visible">
            <div className="card-body p-3 p-md-4 p-xl-4">
              <h2 className="fs-4 fw-bold text-center text-secondary mb-4">
                Create new habit
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="row gy-2 overflow-hidden">
                  <div className="col-12">
                    <div className="form-floating mb-1">
                      <input
                        type="text"
                        className="form-control"
                        name="habitName"
                        id="habitName"
                        placeholder="Glasses of Water"
                        required
                        onChange={handleChange}
                        value={values.habitName}
                        onBlur={handleBlur}
                      />
                      <label htmlFor="habitName" className="form-label">
                        Habit Name
                      </label>
                    </div>
                    {touched.habitName && errors.habitName ? (
                      <p className="mb-1 text-danger">{errors.habitName}</p>
                    ) : null}
                  </div>
                  <div className="col-12">
                    <div className="form-floating mb-1">
                      <input
                        type="text"
                        className="form-control"
                        name="description"
                        id="description"
                        placeholder="description"
                        onChange={handleChange}
                        value={values.description}
                        onBlur={handleBlur}
                      />
                      <label htmlFor="description" className="form-label">
                        Description
                      </label>
                    </div>
                    {touched.description && errors.description ? (
                      <p className="mb-1 text-danger">{errors.description}</p>
                    ) : null}
                  </div>
                  <div className="col-12">
                    <div className="form-floating mb-1">
                      <input
                        type="number"
                        className="form-control"
                        name="goal"
                        id="goal"
                        required
                        min={1}
                        placeholder="Goal"
                        onChange={handleChange}
                        value={values.goal}
                        onBlur={handleBlur}
                      />
                      <label htmlFor="Goal" className="form-label">
                        Goal
                      </label>
                    </div>
                    {touched.goal && errors.goal ? (
                      <p className="mb-1 text-danger">{errors.goal}</p>
                    ) : null}
                  </div>

                  <div className="col-12">
                    <div className="d-grid my-3">
                      <button
                        className="btn btn-primary btn-lg"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        Create Habit
                      </button>
                    </div>
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

export default AddHabit;
