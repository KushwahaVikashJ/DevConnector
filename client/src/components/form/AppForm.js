import React from 'react'
import { Formik } from 'formik'

function AppForm({initialValues, onSubmit, validationSchema, children}) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize={true}> 
      {
        () => (
          <form autocomplete="off" noValidate>
            {children}
          </form>
        )  
      }
    </Formik>
  )
}

export default AppForm