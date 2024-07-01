import { unwrapResult } from '@reduxjs/toolkit';
import { MainLayout } from 'components/layout';
import { Employee } from 'models/employee';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getPositionResources, storePositionResources } from 'slices/positionResourceSlice';
import EmployeeForm from './components/EmployeeForm';
import { GetStaticProps, GetStaticPropsContext } from 'next';
import qs from 'qs';
import { PositionResource } from 'models/positionResource';
import { createEmployee } from 'slices/employeeSlice';

export interface CreateEmployeePageProps {
  positionResourceList: PositionResource[];
}

const CreateEmployeePage = ({ positionResourceList = [] }: CreateEmployeePageProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(storePositionResources(positionResourceList));
  }, []);

  const handleSubmitEmployee = async (values: Employee) => {
    const formData: any = new FormData();
    formData.append('data', JSON.stringify(values));
    const action: any = createEmployee(formData);
    const resultAction = await dispatch(action);
    unwrapResult(resultAction);
  };

  return (
    <div className="container mx-auto max-w-5xl p-4 text-gray-500">
      <h4 className="text-3xl font-bold-300 mb-14 mt-10">Create employee profile</h4>
      <EmployeeForm onSubmit={handleSubmitEmployee} />
    </div>
  );
};

export const getStaticProps: GetStaticProps<CreateEmployeePageProps> = async (
  context: GetStaticPropsContext,
) => {
  const response: any = await fetch(`${process.env.APP_URL}/api/positionResources`);
  const datas = await response.json();
  const result = datas.pageItems ?? datas.data;

  if (!datas) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      positionResourceList: result ?? [],
    },
  };
};
CreateEmployeePage.Layout = MainLayout;
export default CreateEmployeePage;
