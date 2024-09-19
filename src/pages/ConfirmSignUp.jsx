import BackToHome from '@/components/BackToHome'
import React from 'react'

function ConfirmSignUp() {
  return (
    <div className='text-left my-24'>
        <img src="/assets/confirm-email.svg" alt="confirm email"  className='mb-6 h-52'/>
        <h1 className='font-bold text-4xl'>
            Please Check Your Email
        </h1>
        <p className='md:max-w-3xl'>
            Thank you for joining the top real estate platform and community of investors and buyers.
            Please check your email inbox for a link to confirm your registration. You will then be redirected to our website to create your profile and get started.
        </p>
        <BackToHome />
    </div>
  )
}

export default ConfirmSignUp