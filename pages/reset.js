import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import Head from 'next/head'
import { useRouter } from 'next/router'
import axios from 'axios'

const resetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(6)
    .required(),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
})

export default function ResetPassword() {
  const [feedbackMessage, setFeedbackMessage] = useState('')
  const router = useRouter()
  const changePassword = async ({ password }) => {
    const apiURL = process.env.API_URL
    const data = {
      password,
      token: router.query.token,
    }
    try {
      await axios.post('http://localhost:3333/reset', data)
      setFeedbackMessage('Password changed! You can login now.')
    } catch (error) {
      setFeedbackMessage('The request for password is invalid or out of date. Please create a new one.')
    }
  }

  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>
          Easy Study Flashcards
        </h1>
        {
          feedbackMessage
            ? (
            <h3>{feedbackMessage}</h3>
            )
            : (
              <div className="card">
                <h2 className="subtitle">Enter your new password</h2>
                <Formik
                  initialValues={{
                    password: '',
                    confirmPassword: '',
                  }}
                  validationSchema={resetPasswordSchema}
                  onSubmit={values => changePassword(values)}
                >
                    {({
                      values,
                      handleChange,
                      handleBlur,
                      errors,
                      touched,
                      isSubmitting,
                      handleReset,
                      handleSubmit,
                    }) => (
                      <form
                        className="form"
                        onReset={handleReset}
                        onSubmit={handleSubmit}
                      >
                        <TextField
                          type="password"
                          variant="outlined"
                          size="small"
                          label="New password"
                          value={values.password}
                          onChange={handleChange('password')}
                          onBlur={handleBlur('password')}
                          error={(!!touched.password && !!errors.password)}
                          helperText={errors.password}
                          fullWidth
                        />
                        <TextField
                          type="password"
                          variant="outlined"
                          size="small"
                          label="Confirm password"
                          value={values.confirmPassword}
                          onChange={handleChange('confirmPassword')}
                          onBlur={handleBlur('confirmPassword')}
                          error={(!!touched.confirmPassword && !!errors.confirmPassword)}
                          helperText={errors.confirmPassword}
                          fullWidth
                        />
                        <button
                          type="submit"
                          className="primary-button"
                        >
                          Save new password
                        </button>
                      </form>
                    )
                  }
                </Formik>
              </div>
            )
        }
        
      </main>
      
      <style jsx>{`
              .form {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-around;
                height: 200px;
              }

              .subtitle {
                font-weight: 500;
                font-size: 16px;
                line-height: 22px;
                text-align: center;
                letter-spacing: 0.2px;
                color: rgba(0, 0, 0, 0.54);
              }
              
              .primary-button {
                background: -moz-linear-gradient(165deg, #7B1FA2 31%, #6E33CD 75%);/* FF3.6+ */
                background: -webkit-gradient(linear, 165deg, color-stop(31%, 7B1FA2), color-stop(75%, 6E33CD));/* Chrome,Safari4+ */
                background: -webkit-linear-gradient(165deg, #7B1FA2 31%, #6E33CD 75%);/* Chrome10+,Safari5.1+ */
                background: -o-linear-gradient(165deg, #7B1FA2 31%, #6E33CD 75%);/* Opera 11.10+ */
                background: -ms-linear-gradient(165deg, #7B1FA2 31%, #6E33CD 75%);/* IE10+ */
                filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#1301FE', endColorstr='#F4F60C', GradientType='1'); /* for IE */
                background: linear-gradient(165deg, #7B1FA2 31%, #6E33CD 75%);/* W3C */                box-shadow: 0px 8px 20px rgba(97, 62, 234, 0.32);
                border-radius: 6px;
                outline: none;
                padding-top: .9rem;
                padding-bottom: .9rem;
                border: 0;
                width: 100%;
                font-style: normal;
                padding-left: 3rem;
                padding-right: 3rem;
                font-weight: bold;
                font-size: 16px;
                line-height: 16px;
                text-align: center;
                letter-spacing: 0.75px;
                text-transform: uppercase;
                color: #FFFFFF;
                transition: all .5s ease-in;
              }

              .primary-button:active {
                transform: scale(0.90);
                transition: all .5s ease-in;
              }

              .container {
                min-height: 100vh;
                padding: 0 0.5rem;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
              }
      
              main {
                padding: 5rem 0;
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
              }
      
              .card {
                margin: 1rem;
                flex-basis: 45%;
                padding: 1.5rem;
                text-align: left;
                color: inherit;
                text-decoration: none;
                border: 1px solid #eaeaea;
                border-radius: 10px;
                transition: color 0.15s ease, border-color 0.15s ease;
              }

            `}</style>
      
            <style jsx global>{`
              @import url('https://fonts.googleapis.com/css2?family=Sarabun:wght@300;400;600&display=swap');
      
              html,
              body {
                padding: 0;
                margin: 0;
                font-family: 'Sarabun', sans-serif;
              }
      
              * {
                box-sizing: border-box;
              }
            `}</style>
    </div>
  )
}
