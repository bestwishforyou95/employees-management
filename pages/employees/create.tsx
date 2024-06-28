import { unwrapResult } from '@reduxjs/toolkit';
import { MainLayout } from 'components/layout';
import { Employee } from 'models/employee';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getPositionResources } from 'slices/positionResourceSlice';
import EmployeeForm from './components/EmployeeForm';

export interface CreateEmployeePageProps {}

const CreateEmployeePage = (props: CreateEmployeePageProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      (async () => {
        const action: any = getPositionResources({ pageSize: 10, pageNumber: 1 });
        const resultAction = await dispatch(action);
        unwrapResult(resultAction);
      })();
    } catch (error) {
      console.log('error');
    }
  }, []);
  const handleSubmitEmployee = (values: Employee) => {
    console.log(values);
  };
  return (
    <div className="container mx-auto max-w-5xl p-4 text-gray-500">
      <h4 className="text-3xl font-bold-300 mb-14 mt-10">Create employee profile</h4>
      <EmployeeForm onSubmit={handleSubmitEmployee} />
    </div>
  );
};
CreateEmployeePage.Layout = MainLayout;
export default CreateEmployeePage;
