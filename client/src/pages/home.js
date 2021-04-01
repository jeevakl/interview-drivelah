import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { createContactRequest } from '../api'

export function Home (props) {
  const [loading, setLoading] = useState(false)

  const schema = yup.object().shape(
    {
      name: yup.string().required('Name is required'),
      email: yup.string().required('Email is required').email('Enter a valid Email'),
      message: yup.string()
    }
  )
  const defaultValues = {
    name: '',
    email: '',
    message: ''
  }
  const { handleSubmit, register, errors, reset } = useForm(
    {
      resolver: yupResolver(schema),
      defaultValues
    }
  )

  const onSubmit = (data) => {
    if (loading) {
      return
    }
    setLoading(true)
    createContactRequest(data)
      .then(response => {
        if (response) {
          reset()
        }
        setLoading(false)
      })
  }

  return (
    <div className='row'>
      <div className='col-sm-12'>
        <div className='row justify-content-center'>
          <div className='col-md-6'>
            <form
              name='contactRequest'
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className='card'>
                <div className='card-header'>
                  <h5 className='title'>
                    Contact Us
                  </h5>
                </div>
                <div className='card-body'>
                  <div className='form-group'>
                    <label className='control-label'>
                      Name
                    </label>
                    <input
                      className='form-control'
                      name='name'
                      ref={register}
                    />
                    <small className='text-danger'>
                      {
                        errors && errors.name && errors.name.message
                      }
                    </small>
                  </div>
                  <div className='form-group'>
                    <label className='control-label'>
                      Email
                    </label>
                    <input
                      className='form-control'
                      name='email'
                      ref={register}
                    />
                    <small className='text-danger'>
                      {
                        errors && errors.email && errors.email.message
                      }
                    </small>
                  </div>
                  <div className='form-group'>
                    <label className='control-label'>
                      Message
                    </label>
                    <textarea
                      className='form-control'
                      name='message'
                      ref={register}
                    />
                    <small className='text-danger'>
                      {
                        errors && errors.message && errors.message.message
                      }
                    </small>
                  </div>
                </div>
                <div className='card-footer text-right'>
                  <button className='btn btn-success' disabled={loading}>
                    {
                      !loading && 'Submit'
                    }
                    {
                      loading &&
                        <span>
                          Submitting...&nbsp;&nbsp;
                          <span className='spinner-border spinner-border-sm' role='status' aria-hidden='true' />
                        </span>
                    }
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
