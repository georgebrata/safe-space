import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface Post {
  id: string
  authorId: string
  authorName: string
  content: string
  isPrivate: boolean
  likes: number
  createdAt: string
  tags: string[]
}

interface CommunityState {
  posts: Post[]
  filter: "all" | "private" | "public"
}

const initialState: CommunityState = {
  posts: [
    {
      id: "1",
      authorId: "demo-user",
      authorName: "Anonymous Orchid",
      content: "Today I managed to leave the house for a walk. It felt like a small victory.",
      isPrivate: false,
      likes: 12,
      createdAt: new Date().toISOString(),
      tags: ["Success", "Daily Life"],
    },
    {
      id: "2",
      authorId: "demo-user",
      authorName: "Me",
      content: "I am documenting this incident privately. He broke the vase in the hallway at 8pm.",
      isPrivate: true,
      likes: 0,
      createdAt: new Date().toISOString(),
      tags: ["Documentation", "Incident"],
    },
  ],
  filter: "all",
}

const communitySlice = createSlice({
  name: "community",
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<Post>) => {
      state.posts.unshift(action.payload)
    },
    setFilter: (state, action: PayloadAction<CommunityState["filter"]>) => {
      state.filter = action.payload
    },
    toggleLike: (state, action: PayloadAction<string>) => {
      const post = state.posts.find((p) => p.id === action.payload)
      if (post) post.likes += 1
    },
  },
})

export const { addPost, setFilter, toggleLike } = communitySlice.actions
export default communitySlice.reducer
