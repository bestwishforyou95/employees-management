import get from 'lodash/get';
import { Controller } from 'react-hook-form';

interface InputFieldProps {
  type?: 'text' | 'password' | 'email' | 'number';
  name?: string;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
  className?: string;
  form?: any;
}

const InputField = (props: InputFieldProps) => {
  const {
    type = 'text',
    name = '',
    disabled = false,
    required = false,
    placeholder = '',
    className,
    form,
  } = props;

  const { errors } = form.formState;
  const hasError = !!(name && errors && get(errors, name));

  return (
    <Controller
      name={name}
      control={form?.control}
      render={({ field }: any) => (
        <div className={'relative ' + (className ?? 'w-full')}>
          <input
            className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type={type}
            placeholder={placeholder}
            value={field.value}
            disabled={disabled}
            onChange={field.onChange}
            required={required}
          />
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
export default InputField;
