import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import CustomSpinner from "../UI/CustomSpinner";
import { editHabitService, getHabitService } from "@/services/habit";
import { useFormik } from "formik";
import { createHabitValidationSchema } from "@/utils/validations";
import { toast } from "react-toastify";
import { toastConfig } from "@/utils/config";

const EditHabit = () => {
  const router = useRouter();
  const {
    query: { habitId },
    isReady,
  } = router;

  const [habitData, setHabitData] = useState(null);
  const [isFetchingData, setIsFetchingData] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    values,
    handleChange,
    handleSubmit,
    handleBlur,
    errors,
    touched,
    setValues,
  } = useFormik({
    initialValues: {
      habitName: "",
      goal: 0,
      description: "",
    },
    validationSchema: createHabitValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      setIsSubmitting(true);
      try {
        const res = await editHabitService({ data: values, habitId });
        toast.success(
          res?.data?.message ?? "Habit edited successfully!",
          toastConfig
        );
        // navigate back to the habit list page after editing
        router.push("/manage-habit");
      } catch (err) {
        toast.error(err?.data?.message, toastConfig);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const fetchHabitData = useCallback(async () => {
    setIsFetchingData(true);
    try {
      const response = await getHabitService({ habitId: habitId });
      const data = response?.data?.data;
      setHabitData(data);

      setValues({
        habitName: data?.habitName ?? "",
        goal: data?.goal ?? "",
        description: data?.description ?? "",
      }); // set initial values to form fields when data is fetched and ready to edit
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetchingData(false);
    }
  }, [habitId, setValues]);

  useEffect(() => {
    if (isReady && habitId) {
      fetchHabitData();
    }
  }, [isReady, habitId, fetchHabitData]);

  if (isFetchingData && !habitData) {
    return <CustomSpinner />;
  }

  return (
    <div
      className="container w-100 h-100 d-flex justify-content-center align-items-center pt-1"
      style={{ flex: "1 0 auto" }}
    >
      <div className="row justify-content-center">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-5">
          <div className="card border border-light-subtle rounded-3 shadow-sm overflow-visible">
            <div className="card-body p-3 p-md-4 p-xl-4">
              {/* <div className="text-center mb-3">
                <p className="fw-bold m-0 fs-4">Habit Tracker</p>
              </div> */}
              <h2 className="fs-4 fw-bold text-center text-secondary mb-4">
                Edit habit
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
                        placeholder="Goal"
                        min={1}
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
                        Edit Habit
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

export default EditHabit;
