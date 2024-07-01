import { StateObject } from 'app/store';
import SelectField from 'components/form/SelectField';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import ToolLanguageComponent from '../ToolLanguage';

export interface PositionComponentProps {
  indexPosition: number;
  strEmployee: string;
  form?: any;
  deletePosition: Function;
}

const PositionComponent = ({
  indexPosition,
  strEmployee,
  form,
  deletePosition,
}: PositionComponentProps) => {
  const [position, setPosition] = useState<any>(null);

  const {
    positionResource: { positionResources },
  } = useSelector((state: StateObject) => state);

  const positionResourceList = useMemo(() => {
    return positionResources.map((p: any) => {
      return { id: p.positionResourceId, label: p.name };
    });
  }, [positionResources]);

  const handleChangingData = () => {
    let values: any = JSON.parse(JSON.stringify(form.getValues()));
    setPosition(values?.positions[indexPosition]);
  };

  const handleAddToolLanguage = () => {
    let values: any = JSON.parse(JSON.stringify(form.getValues()));
    values?.positions[indexPosition].toolLanguages.push({
      displayOrder: 0,
      description: '',
      images: [],
    });
    form.setValue(`positions`, values.positions);
    setPosition(values?.positions[indexPosition]);
  };

  const handleDeleteToolLanguage = (index: number) => {
    let values: any = JSON.parse(JSON.stringify(form.getValues()));
    values?.positions[indexPosition]?.toolLanguages.splice(index, 1);
    form.setValue(
      `positions[${indexPosition}].toolLanguages`,
      values?.positions[indexPosition]?.toolLanguages,
    );
    setPosition(values?.positions[indexPosition]);
  };

  useEffect(() => {
    setPosition(JSON.parse(strEmployee)?.positions[indexPosition]);
  }, [strEmployee, indexPosition]);

  return (
    <>
      <div className="flex mb-8">
        <label className="mr-2 w-1/4">
          Position
          <span className="ml-1">*</span>
        </label>
        <SelectField
          name={`positions[${indexPosition}].positionResourceId`}
          options={positionResourceList}
          form={form}
          afterOnChange={handleChangingData}
          required
        />
        <span className="block w-1/4 pl-4">
          <button
            type="button"
            onClick={() => {
              if (!deletePosition) return;
              deletePosition(indexPosition);
            }}
            className="bg-gray-400 hover:bg-gray-300 text-white rounded w-4/5 h-10 focus:outline-none focus:shadow-outline"
          >
            Delete position
          </button>
        </span>
      </div>
      {position?.positionResourceId
        ? position.toolLanguages?.map((toolLanguage: any, index: number) => (
            <>
              <ToolLanguageComponent
                key={toolLanguage.toolLanguageResourceId ?? index}
                indexPosition={indexPosition}
                indexToolLanguage={index}
                position={position}
                form={form}
                deleteToolLanguage={handleDeleteToolLanguage}
              />
              {position.toolLanguages?.length - 1 > index && (
                <div className="flex my-8">
                  <label className="mr-2 w-1/4">&nbsp;</label>
                  <div className="w-full border-t border-dashed border-gray-300 my-4"></div>
                  <div className="block w-1/4 pl-4">&nbsp;</div>
                </div>
              )}
            </>
          ))
        : null}
      {position?.positionResourceId && (
        <div className="flex mt-10">
          <label className="mr-2 w-1/4">&nbsp;</label>
          <div className="w-full">
            <button
              type="button"
              onClick={handleAddToolLanguage}
              className="bg-white-500 hover:bg-white-700 border border-blue-500 text-blue-500 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add Tool/Language
            </button>
          </div>
          <label className="mr-2 w-1/4">&nbsp;</label>
        </div>
      )}
    </>
  );
};
export default PositionComponent;
