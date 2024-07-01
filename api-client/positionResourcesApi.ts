import { params } from 'models/common';
import qs from 'qs';
import axiosClient from './axios-client';

export const positionResourceApi = {
  getList(params?: params) {
    if (!params?.pageSize) params = { pageSize: 100, pageNumber: 1 };
    return axiosClient.get(`/positionResources?${qs.stringify(params)}`);
  },
};
