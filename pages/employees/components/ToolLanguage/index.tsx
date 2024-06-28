import { StateObject } from 'app/store';
import SelectField from 'components/form/SelectField';
import TextareaField from 'components/form/TextareaField';
import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { yearsList } from 'utils/yearsList';

export interface ToolLanguageComponentProps {
  indexPosition: number;
  indexToolLanguage: number;
  position: any;
  form?: any;
  deleteToolLanguage: Function;
}

const ToolLanguageComponent = React.memo(
  ({
    indexPosition,
    indexToolLanguage,
    position,
    form,
    deleteToolLanguage,
  }: ToolLanguageComponentProps) => {
    const {
      positionResource: { positionResources },
    } = useSelector((state: StateObject) => state);

    const [from, setFrom] = useState<number | null>(null);

    const handleChangingData = () => {
      let values: any = form.getValues();
      setFrom(values?.positions[indexPosition]?.toolLanguages[indexToolLanguage]?.from);
    };

    // let values: any = JSON.parse(JSON.stringify(form.getValues()));
    // console.log(position);

    const toolLanguagesList = useMemo(() => {
      return (
        positionResources.find(
          (p: any) =>
            position.positionResourceId &&
            p.positionResourceId === parseInt(position.positionResourceId),
        )?.toolLanguageResources ?? []
      ).map((t: any) => {
        return { id: t.toolLanguageResourceId, label: t.name };
      });
    }, [position.positionResourceId]);

    const toYearList = useMemo(() => {
      if (!from) return [];
      return yearsList(from);
    }, [from]);

    return (
      <>
        <div className="flex mb-8">
          <label className="mr-2 w-1/4">
            Tool/Language
            <span className="ml-1">*</span>
          </label>
          <div className="w-full">
            <div className="flex">
              {/* Select a Tool/Language */}
              <SelectField
                placeholder="Select Tool/Language"
                name={`positions[${indexPosition}].toolLanguages[${indexToolLanguage}].toolLanguageResourceId`}
                options={toolLanguagesList}
                className="w-2/4"
                form={form}
                required
              />
              <div className="w-1/4 pl-4">
                {/* Select From for the position */}
                <SelectField
                  placeholder="From"
                  name={`positions[${indexPosition}].toolLanguages[${indexToolLanguage}].from`}
                  options={yearsList(2000)}
                  afterOnChange={handleChangingData}
                  form={form}
                  required
                />
              </div>
              <div className="w-1/4 pl-4">
                {/* Select To for the position */}
                <SelectField
                  placeholder="To"
                  name={`positions[${indexPosition}].toolLanguages[${indexToolLanguage}].to`}
                  options={toYearList}
                  form={form}
                  required
                />
              </div>
            </div>
          </div>
          <span className="block w-1/4 pl-4">
            <button
              type="button"
              onClick={() => {
                if (!deleteToolLanguage) return;
                deleteToolLanguage(indexToolLanguage);
              }}
              className="bg-gray-400 hover:bg-gray-300 text-white leading-tight w-4/5 h-10 rounded focus:outline-none focus:shadow-outline"
            >
              Delete Tool/Language
            </button>
          </span>
        </div>
        <div className="flex mb-8">
          <label className="mr-2 w-1/4">&nbsp;</label>
          <div className="w-full">
            <TextareaField
              name={`positions[${indexPosition}].toolLanguages[${indexToolLanguage}].description`}
              placeholder={'Description'}
              form={form}
            />
          </div>
          <span className="block w-1/4 pl-4">&nbsp;</span>
        </div>
      </>
    );
  },
);
export default ToolLanguageComponent;
