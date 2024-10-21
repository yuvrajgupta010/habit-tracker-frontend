import { apiInterceptor } from "../axiosClient";
import { RestfulUrls } from "../restfulUrls";

export const getHabitsService = async () => {
  return await apiInterceptor
    .get(`${RestfulUrls.GET_HABITS}`)
    .then((res) => res);
};

export const getHabitService = async (params) => {
  return await apiInterceptor
    .get(`${RestfulUrls.GET_HABIT}`.replace(":habitId", params.habitId))
    .then((res) => res);
};

export const getDashboardDataService = async () => {
  return await apiInterceptor
    .get(`${RestfulUrls.GET_DASHBOARD_DATA}`)
    .then((res) => res);
};

export const addHabitService = async (params) => {
  return await apiInterceptor
    .post(`${RestfulUrls.ADD_HABIT}`, params.data)
    .then((res) => res);
};

export const deleteHabitService = async (params) => {
  return await apiInterceptor
    .delete(`${RestfulUrls.DELETE_HABIT}`.replace(":habitId", params.habitId))
    .then((res) => res);
};

export const editHabitService = async (params) => {
  return await apiInterceptor
    .put(
      `${RestfulUrls.EDIT_HABIT}`.replace(":habitId", params.habitId),
      params.data
    )
    .then((res) => res);
};

export const addNewRecordService = async (params) => {
  return await apiInterceptor
    .post(`${RestfulUrls.ADD_HABIT_RECORD}`, params.data)
    .then((res) => res);
};

export const editRecordService = async (params) => {
  return await apiInterceptor
    .put(`${RestfulUrls.EDIT_HABIT_RECORD}`, params.data)
    .then((res) => res);
};
