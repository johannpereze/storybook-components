import { FormControl, InputLabel, MenuItem, Select as MUISelect, SelectChangeEvent } from '@mui/material'
import { Box } from '@mui/system'
import { pick } from 'dot-object'
import { FormikProps, useFormik } from 'formik'

export interface SelectProps {
  /**
   * This is the name for it's value in formik. must match formik definition
   */
  name: string
  /**
   * This is the complete form from useFormik
   */
  form: FormikProps<any>
  /**
   * Must be an array of objects with value and label
   */
  options: { value: any; label: string }[]
  label?: string
  size?: 'small' | 'medium'
  variant?: 'outlined' | 'filled' | 'standard'
}

export default function Select({ label, options, form: propsForm, name, size, variant }: SelectProps) {
  const form =
    propsForm ||
    useFormik({
      initialValues: {
        componetName: ''
      },
      onSubmit: () => {}
    })
  const handleChange = (event: SelectChangeEvent<string>) => {
    form.setFieldValue(name, event.target.value)
  }

  return (
    <Box sx={{ width: '120px' }}>
      <FormControl fullWidth size={size} variant={variant}>
        <InputLabel id='simple-select-label'>{label || 'label'}</InputLabel>
        <MUISelect
          labelId='simple-select-label'
          fullWidth
          value={pick(name, form.values)}
          label={label || 'label'}
          onChange={handleChange}
        >
          {options.map(({ value, label }) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </MUISelect>
      </FormControl>
    </Box>
  )
}

Select.defaultProps = {
  label: 'label',
  size: 'medium',
  options: [
    { value: 'Option A', label: 'Option A' },
    { value: 'Option B', label: 'Option B' },
    { value: 'Option C', label: 'Option C' }
  ],
  name: 'componetName',
  variant: 'outlined'
}
