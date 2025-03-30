'use client'

import useAuthModal from '@/hooks/useAuthModel'
import { useUser } from '@/hooks/useUser'
import {
  addLikedSong,
  getLikedSong,
  removeLikedSong,
} from '@/lib/likedSongsActions'
import { useSessionContext } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

interface LikeButtonProps {
  songId: string
}

const LikeButton = ({ songId }: LikeButtonProps) => {
  const router = useRouter()
  const { supabaseClient } = useSessionContext()
  const { user } = useUser()
  const [isLiked, setIsLiked] = useState(false)

  useEffect(() => {
    if (!user?.id) {
      return
    }

    const fetchData = async () => {
      const { success, data, error } = await getLikedSong(songId, user.id)
      if (!success) {
        return toast.error(error ?? 'Something went wrong')
      }
      if (data) {
        setIsLiked(true)
      } else {
        setIsLiked(false)
      }
    }

    fetchData()
  }, [supabaseClient, songId, user?.id])

  const Icon = isLiked ? AiFillHeart : AiOutlineHeart

  const handleLike = async () => {
    if (!user?.id) {
      const authModal = useAuthModal()
      authModal.onOpen()
      return
    }

    if (isLiked) {
      const { success, error } = await removeLikedSong(songId)
      if (!success) {
        toast.error(error ?? 'Something went wrong')
      } else {
        toast.success('Cancel liked!')
        setIsLiked(false)
      }
    } else {
      const { success, error } = await addLikedSong(songId)
      if (!success) {
        toast.error(error ?? 'Something went wrong')
      } else {
        toast.success('Liked!')
        setIsLiked(true)
      }
    }

    router.refresh()
  }

  return (
    <button
      className="hover:opacity-75 transition-opacity"
      onClick={handleLike}
    >
      <Icon color={isLiked ? '#22c55e' : 'white'} size={25} />
    </button>
  )
}

export default LikeButton
