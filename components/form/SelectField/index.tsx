import { Controller } from 'react-hook-form';
import get from 'lodash/get';

interface SelectFieldProps {
  name?: string;
  disabled?: boolean;
  required?: boolean;
  form?: any;
  options?: any[];
  placeholder?: string;
  className?: string;
  afterOnChange?: Function;
}

const SelectField = (props: SelectFieldProps) => {
  const {
    name = '',
    disabled = false,
    required = false,
    form,
    options = [],
    placeholder = 'Select',
    className,
    afterOnChange,
  } = props;

  const { errors } = form?.formState;
  const hasError = !!(name && errors && get(errors, name));

  return (
    <Controller
      name={name}
      control={form?.control}
      render={({ field }: any) => (
        <div className={'relative ' + (className ?? 'w-full')}>
          <select
            className={
              'w-full shadow appearance-none border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ' +
              (field.value ? 'text-gray-700' : 'text-gray-400')
            }
            value={field.value}
            onChange={(e) => {
              field.onChange(e);
              if (!afterOnChange) return;
              afterOnChange();
            }}
            required={required}
            disabled={disabled}
          >
            <option className="text-gray-400" value={undefined}>
              {placeholder}
            </option>
            {options.map((option, index) => (
              <option key={option.id ?? index} value={option.id} className="text-gray-700">
                {option.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M7 10l5 5 5-5H7z" />
            </svg>
          </div>
          {hasError && (
            <span className="text-sm absolute left-0 top-10 text-red-500">
              {get(errors, name).message}
            </span>
          )}
        </div>
      )}
    />
  );
};
export default SelectField;
