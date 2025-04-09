import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { useState } from "react"
import { SendHorizonal } from "lucide-react"

export default function CommunityPostInput() {
  const [content, setContent] = useState("")

  const handlePost = () => {
    if (content.trim() === "") return
    // Post logic here, maybe send to backend
    console.log("Post:", content)
    setContent("")
  }

  return (
    <Card className="w-full max-w-2xl mx-auto mt-4 shadow-md bg-background text-foreground">
      <CardContent className="flex gap-4 p-4">
        <Avatar>
          <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <Textarea
            placeholder="Say something..."
            className="resize-none min-h-[80px] text-base"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="flex justify-end mt-2">
            <Button
              onClick={handlePost}
              disabled={!content.trim()}
              className="flex gap-2"
            >
              <SendHorizonal className="w-4 h-4" />
              Post
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
