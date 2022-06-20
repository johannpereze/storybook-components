import { Alert, Box, Button, Paper, Typography } from '@mui/material'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import TextField from '../../components/textField/TextField'

export default function RecoveryForm() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const validationSchema = yup.object({
    email: yup.string().email(t('errors.login.enter_a_valid_email')).required(t('errors.login.email_is_required'))
  })

  const formik = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema,
    onSubmit: () => {
      // alert(JSON.stringify(values, null, 2)) TODO: check if this is needed
      navigate('/')
    },
    validateOnBlur: true,
    validateOnMount: true
  })
  return (
    <Box component='form' onSubmit={formik.handleSubmit}>
      <Alert sx={{ mt: 2 }} severity='info'>
        {t('login.password_recovery')}
      </Alert>
      <Paper
        sx={{
          p: 2,
          mt: 2
        }}
        variant='outlined'
      >
        <Typography variant='body2'>{t('login.instructions_will_be_sent')}</Typography>
      </Paper>
      <Box sx={{ mt: 2, mb: 0 }}>
        <TextField fullWidth formik={formik} name='email' label={t('login.email')} />
      </Box>

      <Button
        fullWidth
        variant='contained'
        type='submit'
        disabled={formik.isSubmitting || !formik.isValid}
        sx={{ mt: 3, mb: 2 }}
      >
        {t('login.recover_password')}
      </Button>
    </Box>
  )
}
