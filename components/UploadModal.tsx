'use client'

import useUploadModal from '@/hooks/useUploadModel'
import { useUser } from '@/hooks/useUser'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import uniqid from 'uniqid'
import Button from './Button'
import Input from './Input'
import Modal from './Modal'

const UploadModal = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { isOpen, onClose } = useUploadModal()
  const { user } = useUser()
  const supabaseClient = useSupabaseClient()
  const router = useRouter()
  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      author: '',
      title: '',
      image: null,
      song: null,
    },
  })

  const onChange = (open: boolean) => {
    if (!open) {
      reset()
      onClose()
    }
  }

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true)

      const song = values?.song[0]
      const image = values?.image[0]
      if (!song || !image || !user) {
        toast.error('Missing fields')
        return
      }
      // upload song
      const songId = uniqid()
      const encodedTitle = btoa(encodeURIComponent(values.title))
      const { data: songData, error: songError } = await supabaseClient.storage
        .from('songs')
        .upload(`song-${encodedTitle}-${songId}`, song, {
          cacheControl: '3600',
          upsert: false,
        })
      if (songError) {
        setIsLoading(false)
        return toast.error('Failed song upload')
      }

      // upload image
      const imageId = uniqid()
      const { data: imageData, error: imageError } =
        await supabaseClient.storage
          .from('images')
          .upload(`image-${encodedTitle}-${imageId}`, image, {
            cacheControl: '3600',
            upsert: false,
          })
      if (imageError) {
        setIsLoading(false)
        return toast.error('Failed image upload')
      }

      // insert song data
      const { error } = await supabaseClient.from('songs').insert({
        user_id: user.id,
        title: values.title,
        author: values.author,
        song_path: songData.path,
        image_path: imageData.path,
      })

      if (error) {
        setIsLoading(false)
        return toast.error(error.message)
      }

      router.refresh()
      setIsLoading(false)
      toast.success('Song created!')
      reset()
      onClose()
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <Modal
      title="Add a song"
      description="Upload an mp3 file and image to add a new song"
      isOpen={isOpen}
      onChange={onChange}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <Input
          id="title"
          disabled={isLoading}
          {...register('title', { required: true })}
          placeholder="Song title"
        />
        <Input
          id="author"
          disabled={isLoading}
          {...register('author', { required: true })}
          placeholder="Song author"
        />
        <div>
          <p className="pb-1">Select a song file</p>
          <Input
            id="song"
            type="file"
            disabled={isLoading}
            accept=".mp3"
            {...register('song', { required: true })}
          />
        </div>
        <div>
          <p className="pb-1">Select a image file</p>
          <Input
            id="image"
            type="file"
            disabled={isLoading}
            accept="image/*"
            {...register('image', { required: true })}
          />
        </div>
        <Button disabled={isLoading} type="submit">
          Create
        </Button>
      </form>
    </Modal>
  )
}

export default UploadModal
