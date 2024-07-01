import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { employeeApi } from 'api-client/employeeApi';
import { EmployeeStateObject } from 'app/store';
import { Employee, paramsEmployee } from 'models/employee';

export const getEmployees = createAsyncThunk(
  'employee/getEmployeesList',
  async (params: paramsEmployee) => {
    const response: any = await employeeApi.getList(params);
    return response.pageItems ?? response;
  },
);
export const createEmployee = createAsyncThunk('employee/createEmployee', async (formData: any) => {
  const response: any = await employeeApi.create(formData);
  return response.pageItems ?? response;
});

const employeeSlice = createSlice({
  name: 'employee',
  initialState: {
    employees: [],
  },
  reducers: {
    storeEmployees(state, action) {
      state.employees = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // .addCase(getEmployees.pending, (state) => {
      //   state.status = 'loading';
      // })
      .addCase(getEmployees.fulfilled, (state, action) => {
        // state.status = 'succeeded';
        state.employees = action.payload;
      })
      // .addCase(getEmployees.rejected, (state, action) => {
      //   state.status = 'failed';
      //   state.error = action.error.message;
      // });
      .addCase(createEmployee.fulfilled, (state: EmployeeStateObject, action: any) => {
        // state.status = 'succeeded';
        state.employees.push(action.payload);
      });
  },
});
const { reducer, actions } = employeeSlice;
export const { storeEmployees } = actions;
export default reducer;
