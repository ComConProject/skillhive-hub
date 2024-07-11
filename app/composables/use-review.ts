import type { Rating } from '~/types'

export function useReview() {
  const { supabase: db } = useCustomSupabase()

  const reviews = useState('reviews', () => [] as Rating[])

  async function fetchReviews() {
    const { data, error } = await db.from('rating').select('*, providing_service(*), freelancer(*)')

    if (error) {
      throw new Error(`[fetchReviews] ${error.message}`)
    }

    reviews.value = data
    return data
  }

  async function insertReview(rating: any) {
    const { data, error } = await db.from('rating').insert(rating).select()

    if (error) {
      throw new Error(`[insertReview] ${error.message}`)
    }

    return data
  }
  return {
    fetchReviews,
    insertReview,
    reviews,
  }
}
