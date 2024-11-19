"use client"

import React from 'react'
import { Button } from './ui/button'
import { getAurinkoAuthUrl } from '~/lib/aurinko'


const LinkAccount = () => {


    const linkemail = async () =>{
    const authlink = await getAurinkoAuthUrl('Google');
    window.location.href = authlink
    console.log(authlink);

    }
  return (
    <div>
      <Button onClick={linkemail}>Link the Email</Button>
    </div>
  )
}

export default LinkAccount
