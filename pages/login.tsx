import { async } from '@firebase/util'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import useAuth from '../hooks/useAuth'
type Inputs = {
  email: string
  password: string
}
const Login = () => {
  const [login, setLogin] = useState(false)
  const { signIn, signUp } = useAuth()
  const route = useRouter()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    if (login) {
      await signIn(email, password)
    } else {
      await signUp(email, password)
    }
  }
  return (
    <div className="relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent">
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Image
        src="https://rb.gy/p2hphi"
        layout="fill"
        className="-z-10 !hidden opacity-60 sm:!inline"
        objectFit="cover"
      />
      `
      <img
        src="https://rb.gy/ulxxee"
        className="absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6"
        width={150}
        height={150}
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14"
      >
        <h1 className="text-4xl font-semibold">
          {login ? ' Sign In' : 'Sign Up'}
        </h1>
        <div className="space-y-4">
          <label className="inline-block w-full">
            <input
              type="email"
              placeholder="Email"
              {...register('email', { required: true })}
              className="input"
            />
          </label>
          {errors.email && (
            <p className="p-1 text-[13px] font-light  text-orange-500">
              Please enter a valid email.
            </p>
          )}
          <label className="inline-block w-full ">
            <input
              type="password"
              className="input"
              placeholder="Password"
              {...register('password', { required: true })}
            />
          </label>
          {errors.password && (
            <p className="p-1 text-[13px] font-light  text-orange-500">
              Please enter a valid password.
            </p>
          )}
        </div>
        <button
          onClick={() => setLogin(true)}
          type="submit"
          className="w-full rounded bg-[#e50914] py-2 font-semibold"
        >
          Sign In
        </button>
        <div className="text-[gray]">
          New to Netflix?
          <button
            onClick={() => setLogin(false)}
            type="submit"
            className="ml-1 text-white hover:underline"
          >
            {' '}
            Sign Up Now
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login
