export type Article = {
  id
  title: string
  body: string
  category: number
  category_data
  user
  image: string
  user_data
  created_at
}

export type Category = {
  id: number
  name: string
}
