
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageCircle, Heart, Repeat2 } from "lucide-react";

export default function CommunityPost({ post }) {
  return (
    <Card className="w-full max-w-xl mx-auto mb-4 bg-background shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <Avatar>
            <AvatarImage src={post.user.avatar} alt={post.user.name} />
            <AvatarFallback>{post.user.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <div className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{post.user.name}</span>
                <span className="ml-1">@{post.user.username}</span> ·
                <span className="ml-1">{post.time}</span>
              </div>
            </div>
            <p className="mt-1 text-foreground text-sm">{post.content}</p>
            {post.image && (
              <img
                src={post.image}
                alt="Post"
                className="mt-2 rounded-xl w-full max-h-96 object-cover"
              />
            )}
            <div className="flex gap-6 mt-3 text-muted-foreground text-sm">
              {/* <Button variant="ghost" size="sm" className="flex items-center gap-1">
                <MessageCircle className="w-4 h-4" /> {post.comments}
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center gap-1">
                <Repeat2 className="w-4 h-4" /> {post.reposts}
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center gap-1">
                <Heart className="w-4 h-4" /> {post.likes}
              </Button> */}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
