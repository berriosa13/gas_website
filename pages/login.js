import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import SubFooter from "../components/SubFooter"

export default function Login() {
  const router = useRouter()
  const { user, login } = useAuth()
  const [data, setData] = useState({
    email: '',
    password: '',
  })

  const handleLogin = async (e) => {
    e.preventDefault()

    console.log(user)
    try {
      await login(data.email, data.password)
      router.push('/carDashboard')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <div className="login-background w-25 position-absolute top-50 start-50 translate-middle">
        <h1 className="text-center my-3 ">Login</h1>
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onChange={(e) => {
                setData({
                  ...data,
                  email: e.target.value,
                })
              }}
              value={data.email}
              required
              type="email"
              placeholder="Enter email"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onChange={(e) => {
                setData({
                  ...data,
                  password: e.target.value,
                })
              }}
              value={data.password}
              required
              type="password"
              placeholder="Password"
            />
          </Form.Group>
          <div className="d-flex justify-content-center">
            <Button className="mt-3" variant="primary" type="submit">
              Login
            </Button>
          </div>
        </Form>
      </div>
    
    </>
  )
}