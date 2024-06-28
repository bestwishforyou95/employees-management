import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { employeeApi } from 'api-client/employee-api';
import { paramsEmployee } from 'models/employee';

export const getEmployees = createAsyncThunk(
  'employee/getEmployeesList',
  async (params: paramsEmployee) => {
    const response: any = await employeeApi.getList(params);
    return response.pageItems;
  },
);

const employeeSlice = createSlice({
  name: 'employee',
  initialState: {
    employees: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // .addCase(getEmployees.pending, (state) => {
      //   state.status = 'loading';
      // })
      .addCase(getEmployees.fulfilled, (state, action) => {
        // state.status = 'succeeded';
        state.employees = action.payload;
      });
    // .addCase(getEmployees.rejected, (state, action) => {
    //   state.status = 'failed';
    //   state.error = action.error.message;
    // });
  },
});
const { reducer } = employeeSlice;
export default reducer;
