import { TextField as MuiTexField } from '@mui/material'
import { pick } from 'dot-object'
import { FormikProps, useFormik } from 'formik'

interface TextFieldProps {
  formik: FormikProps<any>
  name: string
  fullWidth?: boolean
  label?: string | null
  value?: string
  type?: 'text' | 'number'
}

export default function TextField({ formik, name, fullWidth, label, value, type }: TextFieldProps) {
  const form =
    formik ||
    useFormik({
      initialValues: {
        componentName: ''
      },
      onSubmit: () => {}
    })

  return (
    <MuiTexField
      fullWidth={fullWidth}
      name={name}
      label={label}
      value={value || pick(name, form.values)}
      onChange={form.handleChange}
      error={pick(name, form.touched) && Boolean(pick(name, form.errors))}
      helperText={pick(name, form.touched) && pick(name, form.errors)}
      onBlur={() => form.setFieldTouched(name, true)}
      type={type}
    />
  )
}

TextField.defaultProps = {
  fullWidth: false,
  label: null,
  type: 'text',
  value: null,
  name: 'componentName'
}
