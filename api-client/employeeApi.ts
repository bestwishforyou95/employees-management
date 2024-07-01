import { Employee, paramsEmployee } from 'models/employee';
import axiosClient from './axios-client';
import qs from 'qs';

export const employeeApi = {
  getList(params?: paramsEmployee) {
    if (!params?.pageSize) params = { pageSize: 100, pageNumber: 1 };
    return axiosClient.get(`/employees?${qs.stringify(params)}`);
  },
  create(data: any) {
    return axiosClient.post(`/employees`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  uploadFile(data: any) {
    return axiosClient.post(`/employees/uploads`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};
