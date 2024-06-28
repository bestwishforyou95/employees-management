import { params } from 'models/common';
import qs from 'qs';
import axiosClient from './axios-client';

export const positionResourceApi = {
  getList(params: params) {
    return axiosClient.get(`/positionResources?${qs.stringify(params)}`);
  },
};
