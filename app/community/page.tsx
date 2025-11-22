"use client"

import { useState } from "react"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { addPost, setFilter, toggleLike } from "@/redux/slices/communitySlice"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Lock, Globe, Heart, Send } from "lucide-react"

export default function CommunityPage() {
  const dispatch = useAppDispatch()
  const { posts, filter } = useAppSelector((state) => state.community)
  const [newPostContent, setNewPostContent] = useState("")
  const [isPrivate, setIsPrivate] = useState(false)

  const filteredPosts = posts.filter((post) => {
    if (filter === "all") return true
    if (filter === "private") return post.isPrivate
    if (filter === "public") return !post.isPrivate
    return true
  })

  const handlePost = () => {
    if (!newPostContent.trim()) return

    dispatch(
      addPost({
        id: Date.now().toString(),
        authorId: "current-user",
        authorName: isPrivate ? "Me (Private)" : "Anonymous",
        content: newPostContent,
        isPrivate,
        likes: 0,
        createdAt: new Date().toISOString(),
        tags: [],
      }),
    )
    setNewPostContent("")
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container mx-auto max-w-2xl px-4 py-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Community</h1>
          <div className="flex gap-2 bg-secondary/50 p-1 rounded-lg">
            <Button
              variant={filter === "all" ? "default" : "ghost"}
              size="sm"
              onClick={() => dispatch(setFilter("all"))}
            >
              All
            </Button>
            <Button
              variant={filter === "public" ? "default" : "ghost"}
              size="sm"
              onClick={() => dispatch(setFilter("public"))}
            >
              Public
            </Button>
            <Button
              variant={filter === "private" ? "default" : "ghost"}
              size="sm"
              onClick={() => dispatch(setFilter("private"))}
            >
              Private
            </Button>
          </div>
        </div>

        {/* Post Composer */}
        <Card>
          <CardContent className="pt-6 space-y-4">
            <Textarea
              placeholder={isPrivate ? "Write a private journal entry..." : "Share something with the community..."}
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              className="min-h-[100px]"
            />
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsPrivate(!isPrivate)}
                className={isPrivate ? "border-primary text-primary bg-primary/5" : ""}
              >
                {isPrivate ? <Lock className="h-4 w-4 mr-2" /> : <Globe className="h-4 w-4 mr-2" />}
                {isPrivate ? "Private Journal" : "Public Post"}
              </Button>
              <Button onClick={handlePost} disabled={!newPostContent.trim()}>
                <Send className="h-4 w-4 mr-2" />
                Post
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Feed */}
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <Card key={post.id} className={post.isPrivate ? "border-l-4 border-l-primary bg-secondary/10" : ""}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold ${post.isPrivate ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"}`}
                    >
                      {post.authorName[0]}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{post.authorName}</p>
                      <p className="text-xs text-muted-foreground">{new Date(post.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  {post.isPrivate && <Lock className="h-4 w-4 text-muted-foreground" />}
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{post.content}</p>
              </CardContent>
              <CardFooter className="pt-2">
                {!post.isPrivate && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-red-500"
                    onClick={() => dispatch(toggleLike(post.id))}
                  >
                    <Heart className={`h-4 w-4 mr-2 ${post.likes > 0 ? "fill-current text-red-500" : ""}`} />
                    {post.likes} Support
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
