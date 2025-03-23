import { useSupabaseClient } from '@supabase/auth-helpers-react'

const useLoadImage = (id: string) => {
  const supabase = useSupabaseClient()
  if (!id) {
    return ''
  }
  const { data: imageData } = supabase.storage.from('images').getPublicUrl(id)
  return imageData.publicUrl
}

export default useLoadImage
