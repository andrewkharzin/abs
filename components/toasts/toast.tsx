'use client'

import * as React from 'react'
import { X } from 'lucide-react'
import styles from './toast.module.css'

type ToastProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
}

const Toast: React.FC<ToastProps> = ({ open, onOpenChange, title, description }) => {
  const [isMounted, setIsMounted] = React.useState(false)

  React.useEffect(() => {
    setIsMounted(true)

    return () => {
      setIsMounted(false)
    }
  }, [])

  React.useEffect(() => {
    if (!open) {
      return
    }

    const timer = setTimeout(() => {
      onOpenChange(false)
    }, 3000)

    return () => {
      clearTimeout(timer)
    }
  }, [open, onOpenChange])

  if (!isMounted) {
    return null
  }

  return (
    <div className={`${styles.toastRoot} ${open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
      <div className="flex items-start gap-3">
        <div className="flex-1">
          <div className="text-sm font-medium">{title}</div>
          <div className="text-sm text-muted-foreground">{description}</div>
        </div>
        <button className={styles.closeButton} onClick={() => onOpenChange(false)}>
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
      </div>
    </div>
  )
}

export { Toast }