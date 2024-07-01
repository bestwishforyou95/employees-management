import { useDropzone } from 'react-dropzone';

interface UploadFileProps {
  disabled?: boolean;
  required?: boolean;
  className?: string;
  onDrop: any;
}

const UploadFile = (props: UploadFileProps) => {
  const { disabled = false, required = false, className, onDrop } = props;

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': [],
    },
  });

  return (
    <div {...getRootProps({ className: `${className ?? 'w-full'} relative` })}>
      <input
        type="file"
        accept="image/*"
        disabled={disabled}
        required={required}
        {...getInputProps()}
      />
      <button
        type="button"
        className="shadow px-6 h-24 border text-gray-700 leading-tight rounded-xl focus:outline-none focus:shadow-outline"
      >
        <span className="block text-2xl">+</span>
        <span className="block">Upload</span>
      </button>
    </div>
  );
};
export default UploadFile;
