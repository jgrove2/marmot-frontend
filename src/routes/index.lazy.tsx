import { createLazyFileRoute } from '@tanstack/react-router'
import Login from '../pages/Login'

export const Route = createLazyFileRoute('/')({
  component: Login,
})