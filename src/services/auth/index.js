import { apiInterceptor } from "../axiosClient";
import { RestfulUrls } from "../restfulUrls";

export const userSignupService = async (params) => {
  return await apiInterceptor
    .post(`${RestfulUrls.SIGN_UP}`, params)
    .then((res) => res);
};

export const userLoginService = async (params) => {
  return await apiInterceptor
    .post(`${RestfulUrls.LOG_IN}`, params)
    .then((res) => res);
};
