import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { positionResourceApi } from 'api-client/positionResourcesApi';
import { params } from 'models/common';

export const getPositionResources = createAsyncThunk(
  'positionResource/getPositionResourcesList',
  async (params?: params) => {
    const response: any = await positionResourceApi.getList(params);
    return response.pageItems ?? response;
  },
);

const positionResourceSlice = createSlice({
  name: 'positionResource',
  initialState: {
    positionResources: [],
  },
  reducers: {
    storePositionResources(state, action) {
      state.positionResources = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPositionResources.fulfilled, (state, action) => {
      state.positionResources = action.payload;
    });
  },
});

const { reducer, actions } = positionResourceSlice;
export const { storePositionResources } = actions;
export default reducer;
