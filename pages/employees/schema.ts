import * as yup from 'yup';

const toolLanguageSchema = yup
  .object()
  .shape({
    toolLanguageResourceId: yup.number().required('Please choose a Tool/Language'),
    displayOrder: yup.number(),
    from: yup.number().required('From is required'),
    to: yup.number().required('To is required'),
    description: yup.string(),
    images: yup.array(),
  })
  .test('is-valid', 'From must be less than or equal to To', function (value) {
    const { from, to } = value;
    return from <= to;
  });

const positionSchema = yup.object().shape({
  positionResourceId: yup.number().required('Please choose a position'),
  displayOrder: yup.number(),
  toolLanguages: yup.array().of(toolLanguageSchema),
});

export const schema = yup.object().shape({
  name: yup.string().required('Please enter a name'),
  positions: yup.array().of(positionSchema).min(1, 'Please add more 1 position'),
});
