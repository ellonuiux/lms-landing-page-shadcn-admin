import { createFileRoute, redirect } from '@tanstack/react-router'

// Thay vì định nghĩa route trực tiếp, sử dụng lazy route để tránh xung đột
const dashboardRoute = createFileRoute('/dashboard')({})

export const Route = dashboardRoute.update({
  beforeLoad: () => {
    throw redirect({
      to: '/_authenticated/dashboard',
    })
  },
}) 