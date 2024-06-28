import { unwrapResult } from '@reduxjs/toolkit';
import { StateObject } from 'app/store';
import { MainLayout } from 'components/layout';
import { Employee } from 'models/employee';
import Link from 'next/link';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployees } from 'slices/employeeSlice';

export interface EmployeesListPageProps {
  employeesList: Employee[];
}

const EmployeesListPage = ({ employeesList = [] }: EmployeesListPageProps) => {
  const dispatch = useDispatch();

  const employeeList = useSelector((state: StateObject) => state.employee.employees);

  useEffect(() => {
    try {
      (async () => {
        const action: any = getEmployees({ pageSize: 10, pageNumber: 1 });
        const resultAction = await dispatch(action);
        unwrapResult(resultAction);
      })();
    } catch (error) {
      console.log('error');
    }
  }, []);

  return (
    <div>
      <h1>List Employees</h1>
      <Link href={`/employees/create`}>Add Employee</Link>
      <ul>
        {employeeList.map((employee, index) => (
          <li key={index}>
            <Link href={`/employees`}>{employee.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

// export const getStaticProps: GetStaticProps<EmployeesListPageProps> = async (
//   context: GetStaticPropsContext,
// ) => {
//   const response = await axios.get(
//     `https://dev-admin-api.6ixgo.com/api/Employees?pageNumber=1&pageSize=10`,
//   );
//   if (!response) {
//     return {
//       notFound: true,
//     };
//   }
//   return {
//     props: {
//       employeesList:
//         response.data.map((employee: Employee) => ({
//           name: employee.name,
//           positions: employee.positions,
//         })) ?? [],
//     },
//   };
// };

EmployeesListPage.Layout = MainLayout;

export default EmployeesListPage;
