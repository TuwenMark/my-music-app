'use client'

import { useEffect, useState } from 'react'

import AuthModal from '@/components/AuthModal'
import { UpdatePassword } from '@supabase/auth-ui-react'
import UploadModal from '@/components/UploadModal'

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    // 保证不在服务端渲染
    return null
  }

  return (
    <>
      <AuthModal />
      <UploadModal />
    </>
  )
}

export default ModalProvider
