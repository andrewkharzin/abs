import { useState } from 'react'
import { ToastViewport } from '@radix-ui/react-toast'

type ToastMessage = {
  id: string
  title: string
  description: string
}

export const useToast = () => {
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  const addToast = (title: string, description: string) => {
    const id = crypto.randomUUID()
    const newToast: ToastMessage = { id, title, description }
    setToasts((prevToasts) => [...prevToasts, newToast])

    setTimeout(() => {
      removeToast(id)
    }, 5000)
  }

  const removeToast = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
  }

  return { toasts, addToast, removeToast }
}

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  return <ToastViewport>{children}</ToastViewport>
}
