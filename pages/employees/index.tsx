import { MainLayout } from 'components/layout';
import { Employee } from 'models/employee';
import { GetStaticProps, GetStaticPropsContext } from 'next';
import Link from 'next/link';
import qs from 'qs';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { storeEmployees } from 'slices/employeeSlice';

export interface EmployeesListPageProps {
  employeesList: Employee[];
}

const EmployeesListPage = ({ employeesList = [] }: EmployeesListPageProps) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(storeEmployees(employeesList));
  }, []);
  return (
    <div>
      <h1>List Employees</h1>
      <Link href={`/employees/create`}>Add Employee</Link>
      <ul>
        {employeesList.map((employee, index) => (
          <li key={index}>
            <Link href={`/employees`}>{employee.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const getStaticProps: GetStaticProps<EmployeesListPageProps> = async (
  context: GetStaticPropsContext,
) => {
  const response: any = await fetch(
    `${process.env.APP_URL}/api/employees?${qs.stringify({ pageNumber: 1, pageSize: 10 })}`,
  );
  const datas = await response.json();
  const result = datas.pageItems ?? datas.data;

  if (!datas) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      employeesList: result ?? [],
    },
  };
};

EmployeesListPage.Layout = MainLayout;

export default EmployeesListPage;
