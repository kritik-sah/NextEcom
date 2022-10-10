import Link from 'next/link'
import React, { useEffect } from 'react'
import {signIn, useSession} from 'next-auth/react'
import { useForm } from "react-hook-form";
import Layout from '../components/Layout'
import { getError } from '../utils/error';
import { toast } from 'react-toastify';
import  { useRouter } from 'next/router';


const Login = () => {

  const {data: session} = useSession();
  const router = useRouter()
  const {redirect} = router.query;

  useEffect(() => {
    if(session?.user) {
      router.push(redirect || '/')
    }
  
   
  }, [router, session, redirect])
  
  const { register, handleSubmit, formState: { errors } } = useForm();

  const submitHandler= async ({email , password}) => {
    try {
      const result = await signIn('credentials', {
        redirect:false,
        email,
        password
      });
      if(result.error){
        toast.error(result.error , {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      }
    } catch (error) {
      toast.error(getError(error), {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }
  }
  return (
    <Layout title="Login">
      <form className="mx-auto max-w-screen-sm" onSubmit={handleSubmit(submitHandler)}>
        <h1 className='mb-4 text-xl font-bold text-center'>Login</h1>
        <div className="mb-4">
            <label htmlFor='email'>Email</label>
            <input type='email' {...register('email', {required: 'Please provide an email address', pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                message: 'Please enter valid email',
              },} )} className='w-full' id="email" autoFocus/>
            {errors.email && <p className='text-rose-600'>{errors.email.message}</p>}
        </div>
        <div className="mb-4">
            <label htmlFor='password'>Password</label>
            <input type='password' {...register('password', {required: 'Please add a password', minLength: {
                value: 6,
                message: 'password must be 6 or more characters!',
              },},  )} className='w-full' id="password" autoFocus/>
              {errors.password && <p className='text-rose-600'>{errors.password.message}</p>}
        </div>
        <div className="mb-4">
            <button className="primary-button w-full"  type="submit">
            Login
            </button>
        </div>
        <div className="mb-4">
            <p>Don&apos;t have an account? <Link href={`/register?redirect=${redirect || '/'}`}><a className='text-amber-400 hover:text-amber-500'>register</a></Link></p>
        </div>

      </form>
    </Layout>
  )
}

export default Login