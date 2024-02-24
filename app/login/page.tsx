"use client"

import { login, signup } from './actions'
import { useState } from 'react';
import { createClient } from "@/utils/supabase/client"

import { Card, CardHeader, CardBody, CardFooter, Input, Button, Spacer} from "@nextui-org/react";

export default function LoginPage() {
  const [data, setData] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  })
  const supabase = createClient();
  const login = async () => {
    try {
      let { data: dataUser, error } = await supabase
        .auth
        .signInWithPassword({
          email: data.email,
          password: data.password
      })
      if (dataUser) console.log(dataUser)
    } catch (error) {
    console.error(error)

    }
  }

  const handleOnChange = (e: any) => {
    const { name, value } = e.target;
    setData((prev: any) => ({
      ...prev,
      [name]: value
    }))
  }
  return (
    <div className="container w-[400px] flex-col mx-auto py-10">
    <Card>
      <CardHeader>
        <h1 className="text-2xl font-bold">Login</h1>
      </CardHeader>
      <CardBody>

        <div>

          <form>

            <Input
              autofocus
              label="Email"
              variant='bordered'
              type="email"
              value={data?.email}
              required
              onChange={handleOnChange}
               />

            <Spacer y={4} />
            <Input
              label="Email"
              type="password"

              variant='bordered'
              value={data?.password}
              onChange={handleOnChange}
              required />
            <Spacer y={10} />
             <Button color="primary" variant="flat" type="submit"  onClick={login}>Login</Button>
              {/* <Button formAction={signup} color="primary" variant="flat">Sign up</Button> */}
          </form>
        </div>


      </CardBody>
    </Card>

    </div>
  )
}