import { Field } from '@ark-ui/react/field'
import "./EvalUrlInsert.css"

import { Formik, Form, Field as FormikField } from 'formik'
import { validateUrl } from '../validators/validators'

export const EvalUrlInsert = () => {
  return (
    <Field.Root>
      <Field.Label>Website Url</Field.Label>
      <Formik
        initialValues={{url: ''}}
        onSubmit={values => {
          console.log(values);
        }}
      >
        {({ errors, touched }) => (
            <Form>
              <div id='form-errors'>
                <div id='field-button'>
                    <FormikField id='input-field' name="url" validate={validateUrl} />
                    <button type='submit'> Start Monitoring</button>
                </div>
                {errors.url && touched.url && <div id='errors'>{errors.url}</div>}
              </div>
            </Form>
        )}
      </Formik>
      <Field.ErrorText>The inserted website url is incorrect.</Field.ErrorText>
    </Field.Root>
  )
}
