// toast-provider.tsx
'use client'

import * as Toast from '@radix-ui/react-toast';

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  return <Toast.Provider>{children}</Toast.Provider>
}
