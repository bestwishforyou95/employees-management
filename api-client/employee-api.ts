import { paramsEmployee } from 'models/employee';
import axiosClient from './axios-client';
import qs from 'qs';

export const employeeApi = {
  getList(params: paramsEmployee) {
    return axiosClient.get(`/employees?${qs.stringify(params)}`);
  },
};
