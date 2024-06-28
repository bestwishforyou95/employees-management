import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { positionResourceApi } from 'api-client/positionResourcesApi';
import { params } from 'models/common';

export const getPositionResources = createAsyncThunk(
  'positionResource/getPositionResourcesList',
  async (params: params) => {
    const response: any = await positionResourceApi.getList(params);
    return response;
  },
);

const positionResourceSlice = createSlice({
  name: 'positionResource',
  initialState: {
    positionResources: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPositionResources.fulfilled, (state, action) => {
      state.positionResources = action.payload;
    });
  },
});
const { reducer } = positionResourceSlice;
export default reducer;
