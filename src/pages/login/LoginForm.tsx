import { LoadingButton } from '@mui/lab'
import { Box, Link, Typography } from '@mui/material'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import * as yup from 'yup'
import { useAppSelector } from '../../app/hooks'
import { LoginValues, SetSubmitting } from '../../auth/signIn'
import PasswordField from '../../components/passwordField/PasswordField'
import TextField from '../../components/textField/TextField'

interface LoginFormProps {
  submit: ({ email, password }: LoginValues, setSubmitting: SetSubmitting) => void
}
export default function LoginForm({ submit }: LoginFormProps) {
  const { t } = useTranslation()
  const confirmedEmil = useAppSelector(state => state.auth.confirmed_email)
  const validationSchema = yup.object({
    email: yup.string().email().required(t('errors.login.email_is_required')),
    password: yup
      .string()
      .min(8, t('errors.login.password_should_be_of_minimum_8_characters_long'))
      .required(t('errors.login.password_is_required'))
  })

  const formik = useFormik({
    initialValues: {
      email: confirmedEmil || '',
      password: ''
    },
    validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      submit(values, setSubmitting)
    },
    validateOnBlur: true,
    validateOnMount: true
  })

  return (
    <Box component='form' onSubmit={formik.handleSubmit}>
      <Box sx={{ mt: 2, mb: 0 }}>
        <TextField fullWidth formik={formik} name='email' label={t('login.email')} />
      </Box>
      <Box sx={{ mt: 2, mb: 0 }}>
        <PasswordField fullWidth formik={formik} name='password' label={t('login.password')} />
      </Box>
      <LoadingButton
        fullWidth
        variant='contained'
        type='submit'
        disabled={formik.isSubmitting || !formik.isValid}
        sx={{ mt: 3 }}
        loading={formik.isSubmitting}
      >
        {t('login.log_in')}
      </LoadingButton>
      <Typography sx={{ display: 'flex', justifyContent: 'end', mt: 2, mb: 1 }} variant='body2'>
        <Link component={NavLink} to='/login/password-recovery'>
          {t('login.forgot_password')}
        </Link>
      </Typography>
    </Box>
  )
}
