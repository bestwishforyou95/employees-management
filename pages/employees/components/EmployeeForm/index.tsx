import InputField from 'components/form/InputField';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import PositionComponent from '../Position';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '@/employees/schema';

export interface EmployeeFormProps {
  onSubmit: Function;
}

const initialPosition = {
  displayOrder: 0,
  toolLanguages: [
    {
      displayOrder: 0,
      description: '',
      images: [],
    },
  ],
};

const EmployeeForm = ({ onSubmit }: EmployeeFormProps) => {
  const [employee, setEmployee] = useState<any>(null);

  const form = useForm({
    defaultValues: {
      name: '',
      positions: [initialPosition],
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = (e: any) => {
    setEmployee(e);
    onSubmit(e);
  };

  const handleAddPosition = () => {
    let values: any = JSON.parse(JSON.stringify(form.getValues()));
    values?.positions.push(initialPosition);
    form.setValue(`positions`, values?.positions);
    setEmployee(values);
  };

  const handleDeletePosition = (index: number) => {
    let values: any = JSON.parse(JSON.stringify(form.getValues()));
    values?.positions.splice(index, 1);
    form.setValue(`positions`, values?.positions);
    setEmployee(values);
  };

  useEffect(() => {
    setEmployee(form.getValues());
  }, [form]);

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="items-center">
      {/* Enter a name */}
      <div className="flex mb-8">
        <label className="mr-2 w-1/4">
          Name
          <span className="ml-1">*</span>
        </label>
        <InputField name="name" placeholder={'Enter a name'} form={form} required />
        <span className="block w-1/4 pl-4">&nbsp;</span>
      </div>
      {/* Positions list */}
      {employee?.positions.map((position: any, index: number) => (
        <>
          <PositionComponent
            key={position.positionResourceId ?? index}
            indexPosition={index}
            strEmployee={JSON.stringify(employee)}
            form={form}
            deletePosition={handleDeletePosition}
          />
          {employee?.positions?.length - 1 > index && (
            <div className="flex my-8">
              <label className="mr-2 w-1/4">&nbsp;</label>
              <div className="w-full border-t border-gray-300 my-4"></div>
              <div className="block w-1/4 pl-4">&nbsp;</div>
            </div>
          )}
        </>
      ))}
      {/* Add position */}
      <div className="flex mt-10">
        <label className="mr-2 w-1/4">&nbsp;</label>
        <div className="w-full">
          <button
            type="button"
            onClick={handleAddPosition}
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Position
          </button>
        </div>
        <label className="mr-2 w-1/4">&nbsp;</label>
      </div>
      <div className="flex mt-10">
        <label className="mr-2 w-1/4">&nbsp;</label>
        <div className="w-full">&nbsp;</div>
        <div className="w-1/4 pl-4">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
};
export default EmployeeForm;
