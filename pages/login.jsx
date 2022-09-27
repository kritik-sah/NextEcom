import Link from 'next/link'
import React from 'react'
import Layout from '../components/Layout'

const login = () => {
  return (
    <Layout title="Login">
      <form className="mx-auto max-w-screen-sm">
        <h1 className='mb-4 text-xl font-bold text-center'>Login</h1>
        <div className="mb-4">
            <label htmlFor='email'>Email</label>
            <input type='email' className='w-full' id="email" autoFocus/>
        </div>
        <div className="mb-4">
            <label htmlFor='password'>Password</label>
            <input type='password' className='w-full' id="password" autoFocus/>
        </div>
        <div className="mb-4">
            <button className="primary-button w-full"  type="button">
            Login
            </button>
        </div>
        <div className="mb-4">
            <p>Don&apos;t have an account? <Link href="/register"><a className='text-amber-400 hover:text-amber-500'>register</a></Link></p>
        </div>

      </form>
    </Layout>
  )
}

export default login