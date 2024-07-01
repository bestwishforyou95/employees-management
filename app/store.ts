import { configureStore } from '@reduxjs/toolkit';
import { Employee } from 'models/employee';
import { PositionResource } from 'models/positionResource';
import employeeReducer from 'slices/employeeSlice';
import positionResourceReducer from 'slices/positionResourceSlice';

export interface EmployeeStateObject {
  employees: Employee[];
}
export interface PositionResourceStateObject {
  positionResources: PositionResource[];
}

export interface StateObject {
  employee: EmployeeStateObject;
  positionResource: PositionResourceStateObject;
}

const rootReducer = {
  employee: employeeReducer,
  positionResource: positionResourceReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
