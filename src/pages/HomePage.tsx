import { useState } from 'react';
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MessageSquare, Heart, X, CornerDownRight } from 'lucide-react';
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Reply {
  id: number;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  likes: number;
  liked: boolean;
}

interface Comment {
  id: number;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  expanded?: boolean;
  likes: number;
  liked: boolean;
  replies: Reply[];
  showReplies: boolean;
  replyInputVisible?: boolean;
}

interface Post {
  id: number;
  author: string;
  avatar: string;
  content: string;
  image?: string;
  likes: number;
  liked: boolean;
  comments: Comment[];
  showComments: boolean;
  timestamp: string;
}

const initialPosts: Post[] = [
  {
    id: 1,
    author: "Sarah Chen",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    content: "Just finished my morning hike! The sunrise was absolutely breathtaking today. 🌄",
    image: "https://images.unsplash.com/photo-1682686580391-615b1e32be01?w=800",
    likes: 42,
    liked: false,
    comments: Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      author: `User ${i + 1}`,
      avatar: `https://images.unsplash.com/photo-${1500000000000 + i}?w=400`,
      content: i % 3 === 0 ? 
        "This is a longer comment that demonstrates how we handle text overflow and expansion. It contains multiple sentences to ensure we test the show more/less functionality properly." :
        "Great photo! Love the composition.",
      timestamp: `${i + 1}m ago`,
      expanded: false,
      likes: Math.floor(Math.random() * 20),
      liked: false,
      replies: i % 5 === 0 ? [
        {
          id: 1,
          author: "Reply User",
          avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
          content: "Thanks for sharing!",
          timestamp: "Just now",
          likes: 3,
          liked: false
        }
      ] : [],
      showReplies: false,
      replyInputVisible: false
    })),
    showComments: false,
    timestamp: "2h ago"
  },
  // ... (keep the second post as is)
  {
    id: 2,
    author: "Alex Rivera",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    content: "Working on a new project using React and Tailwind. The developer experience is amazing! 💻",
    likes: 28,
    liked: false,
    comments: [
      {
        id: 1,
        author: "Sarah Chen",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
        content: "Can't wait to see what you're building!",
        timestamp: "3h ago",
        expanded: false,
        likes: 5,
        liked: false,
        replies: [],
        showReplies: false
      }
    ],
    showComments: false,
    timestamp: "4h ago"
  }
];

function HomePage() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [newComments, setNewComments] = useState<{ [key: number]: string }>({});
  const [newReplies, setNewReplies] = useState<{ [key: string]: string }>({});

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const liked = !post.liked;
        return { 
          ...post, 
          liked, 
          likes: liked ? post.likes + 1 : post.likes - 1 
        };
      }
      return post;
    }));
  };

  const handleCommentLike = (postId: number, commentId: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: post.comments.map(comment => {
            if (comment.id === commentId) {
              const liked = !comment.liked;
              return {
                ...comment,
                liked,
                likes: liked ? comment.likes + 1 : comment.likes - 1
              };
            }
            return comment;
          })
        };
      }
      return post;
    }));
  };

  const handleReplyLike = (postId: number, commentId: number, replyId: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: post.comments.map(comment => {
            if (comment.id === commentId) {
              return {
                ...comment,
                replies: comment.replies.map(reply => {
                  if (reply.id === replyId) {
                    const liked = !reply.liked;
                    return {
                      ...reply,
                      liked,
                      likes: liked ? reply.likes + 1 : reply.likes - 1
                    };
                  }
                  return reply;
                })
              };
            }
            return comment;
          })
        };
      }
      return post;
    }));
  };

  const toggleComments = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, showComments: !post.showComments } : post
    ));
  };

  const toggleReplies = (postId: number, commentId: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: post.comments.map(comment => {
            if (comment.id === commentId) {
              return { ...comment, showReplies: !comment.showReplies };
            }
            return comment;
          })
        };
      }
      return post;
    }));
  };

  const toggleReplyInput = (postId: number, commentId: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: post.comments.map(comment => {
            if (comment.id === commentId) {
              return { ...comment, replyInputVisible: !comment.replyInputVisible };
            }
            return comment;
          })
        };
      }
      return post;
    }));
  };

  const handleNewComment = (postId: number) => {
    const commentText = newComments[postId]?.trim();
    if (!commentText) return;

    setPosts(posts.map(post => {
      if (post.id === postId) {
        const newComment = {
          id: post.comments.length + 1,
          author: "You",
          avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
          content: commentText,
          timestamp: "Just now",
          expanded: false,
          likes: 0,
          liked: false,
          replies: [],
          showReplies: false
        };
        return {
          ...post,
          comments: [...post.comments, newComment]
        };
      }
      return post;
    }));

    setNewComments({
      ...newComments,
      [postId]: ""
    });
  };

  const handleNewReply = (postId: number, commentId: number) => {
    const replyKey = `${postId}-${commentId}`;
    const replyText = newReplies[replyKey]?.trim();
    if (!replyText) return;

    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: post.comments.map(comment => {
            if (comment.id === commentId) {
              const newReply = {
                id: comment.replies.length + 1,
                author: "You",
                avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
                content: replyText,
                timestamp: "Just now",
                likes: 0,
                liked: false
              };
              return {
                ...comment,
                replies: [...comment.replies, newReply],
                replyInputVisible: false,
                showReplies: true
              };
            }
            return comment;
          })
        };
      }
      return post;
    }));

    setNewReplies({
      ...newReplies,
      [replyKey]: ""
    });
  };

  const toggleCommentExpansion = (postId: number, commentId: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: post.comments.map(comment => {
            if (comment.id === commentId) {
              return { ...comment, expanded: !comment.expanded };
            }
            return comment;
          })
        };
      }
      return post;
    }));
  };

  const MAX_COMMENT_LENGTH = 100;

  return (
    <>
      {/* Stories */}
      <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center space-y-1">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-yellow-400 to-pink-500 p-0.5">
              <Avatar className="w-full h-full">
                <AvatarImage 
                  src={`https://images.unsplash.com/photo-${1500000000000 + i}?w=150`} 
                  alt={`User ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </Avatar>
            </div>
            <span className="text-xs">User {i + 1}</span>
          </div>
        ))}
      </div>

      <Separator className="my-4" />

      {/* Posts */}
      <div className="space-y-6">
        {posts.map(post => (
          <Card key={post.id} className="p-4">
            <div className="flex items-center space-x-3 mb-4">
              <Avatar>
                <AvatarImage src={post.avatar} alt={post.author} className="w-full h-full object-cover" />
              </Avatar>
              <div>
                <h3 className="font-semibold">{post.author}</h3>
                <p className="text-sm text-gray-500">{post.timestamp}</p>
              </div>
            </div>
            <p className="mb-4">{post.content}</p>
            {post.image && (
              <img 
                src={post.image} 
                alt="Post content" 
                className="rounded-lg w-full h-64 object-cover mb-4"
              />
            )}
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => handleLike(post.id)}
                className={post.liked ? "text-red-500" : "text-gray-500"}
              >
                <Heart className={`h-4 w-4 mr-2 ${post.liked ? "fill-red-500" : ""}`} />
                {post.likes}
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => toggleComments(post.id)}
                className="text-gray-500"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                {post.comments.length}
              </Button>
            </div>

            {/* Comments Section */}
            {post.showComments && (
              <div className="mt-4">
                <Separator className="mb-4" />
                <div className="sticky top-16 bg-white z-10 pb-4">
                  <h4 className="font-medium">Comments ({post.comments.length})</h4>
                  {/* Add Comment */}
                  <div className="flex space-x-3 items-start mt-4">
                    <Avatar className="w-8 h-8 flex-shrink-0">
                      <AvatarImage 
                        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400" 
                        alt="Your avatar" 
                        className="w-full h-full object-cover"
                      />
                    </Avatar>
                    <div className="flex-1 min-w-0 space-y-2">
                      <Textarea 
                        placeholder="Add a comment..."
                        value={newComments[post.id] || ""}
                        onChange={(e) => setNewComments({
                          ...newComments,
                          [post.id]: e.target.value
                        })}
                        className="min-h-[60px] w-full"
                      />
                      <div className="flex justify-end">
                        <Button 
                          size="sm"
                          onClick={() => handleNewComment(post.id)}
                          disabled={!newComments[post.id]?.trim()}
                        >
                          Post
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-4">
                    {post.comments.map(comment => (
                      <div key={comment.id} className="space-y-2">
                        <div className="flex space-x-3">
                          <Avatar className="w-8 h-8 flex-shrink-0">
                            <AvatarImage src={comment.avatar} alt={comment.author} className="w-full h-full object-cover" />
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="bg-gray-100 p-3 rounded-lg">
                              <div className="flex justify-between items-center mb-1">
                                <span className="font-medium text-sm">{comment.author}</span>
                                <span className="text-xs text-gray-500">{comment.timestamp}</span>
                              </div>
                              <div className="text-sm break-words">
                                {comment.content.length > MAX_COMMENT_LENGTH && !comment.expanded ? (
                                  <div>
                                    <p className="line-clamp-2">
                                      {comment.content}
                                    </p>
                                    <Button 
                                      variant="link" 
                                      size="sm" 
                                      className="p-0 h-auto text-xs mt-1"
                                      onClick={() => toggleCommentExpansion(post.id, comment.id)}
                                    >
                                      Show more
                                    </Button>
                                  </div>
                                ) : (
                                  <div>
                                    <p className={!comment.expanded ? "line-clamp-2" : ""}>
                                      {comment.content}
                                    </p>
                                    {comment.content.length > MAX_COMMENT_LENGTH && comment.expanded && (
                                      <Button 
                                        variant="link" 
                                        size="sm" 
                                        className="p-0 h-auto text-xs mt-1"
                                        onClick={() => toggleCommentExpansion(post.id, comment.id)}
                                      >
                                        Show less
                                      </Button>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center space-x-4 mt-1 ml-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                className={`px-0 ${comment.liked ? 'text-red-500' : 'text-gray-500'}`}
                                onClick={() => handleCommentLike(post.id, comment.id)}
                              >
                                <Heart className={`h-3 w-3 mr-1 ${comment.liked ? "fill-red-500" : ""}`} />
                                <span className="text-xs">{comment.likes}</span>
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="px-0 text-gray-500"
                                onClick={() => toggleReplyInput(post.id, comment.id)}
                              >
                                <MessageSquare className="h-3 w-3 mr-1" />
                                <span className="text-xs">Reply</span>
                              </Button>
                              {comment.replies.length > 0 && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="px-0 text-gray-500"
                                  onClick={() => toggleReplies(post.id, comment.id)}
                                >
                                  <span className="text-xs">
                                    {comment.showReplies ? 'Hide replies' : `Show ${comment.replies.length} replies`}
                                  </span>
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Reply Input */}
                        {comment.replyInputVisible && (
                          <div className="ml-11 flex space-x-3 items-start">
                            <Avatar className="w-6 h-6 flex-shrink-0">
                              <AvatarImage 
                                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400" 
                                alt="Your avatar"
                                className="w-full h-full object-cover"
                              />
                            </Avatar>
                            <div className="flex-1 min-w-0 space-y-2">
                              <Textarea 
                                placeholder="Write a reply..."
                                value={newReplies[`${post.id}-${comment.id}`] || ""}
                                onChange={(e) => setNewReplies({
                                  ...newReplies,
                                  [`${post.id}-${comment.id}`]: e.target.value
                                })}
                                className="min-h-[60px] w-full text-sm"
                              />
                              <div className="flex justify-end space-x-2">
                                <Button 
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => toggleReplyInput(post.id, comment.id)}
                                >
                                  Cancel
                                </Button>
                                <Button 
                                  size="sm"
                                  onClick={() => handleNewReply(post.id, comment.id)}
                                  disabled={!newReplies[`${post.id}-${comment.id}`]?.trim()}
                                >
                                  Reply
                                </Button>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Replies */}
                        {comment.showReplies && comment.replies.length > 0 && (
                          <div className="ml-11 space-y-3">
                            {comment.replies.map(reply => (
                              <div key={reply.id} className="flex space-x-3">
                                <Avatar className="w-6 h-6 flex-shrink-0">
                                  <AvatarImage src={reply.avatar} alt={reply.author} className="w-full h-full object-cover" />
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                  <div className="bg-gray-100 p-2 rounded-lg">
                                    <div className="flex justify-between items-center mb-1">
                                      <span className="font-medium text-xs">{reply.author}</span>
                                      <span className="text-xs text-gray-500">{reply.timestamp}</span>
                                    </div>
                                    <p className="text-sm break-words">{reply.content}</p>
                                  </div>
                                  <div className="flex items-center space-x-4 mt-1 ml-1">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className={`px-0 ${reply.liked ? 'text-red-500' : 'text-gray-500'}`}
                                      onClick={() => handleReplyLike(post.id, comment.id, reply.id)}
                                    >
                                      <Heart className={`h-3 w-3 mr-1 ${reply.liked ? "fill-red-500" : ""}`} />
                                      <span className="text-xs">{reply.likes}</span>
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            )}
          </Card>
        ))}
      </div>
    </>
  );
}

export default HomePage;