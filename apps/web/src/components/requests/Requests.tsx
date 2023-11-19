"use client";

import { trpc } from "@web/app/_trpc/client";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { useToast } from "../ui/use-toast";

interface FriendRequestProps {
  username: string;
  firstName: string;
  lastName: string;
}

const FriendRequest: React.FC<FriendRequestProps> = ({ username, firstName, lastName }) => {

  const {toast}  = useToast();
  const [isVisible, setIsVisible] = useState(true);

  const handleFriendReqAccept = trpc.friend.acceptRequest.useMutation({
    onSuccess: () => {
      toast({
        title: `Accepted request from @${username}`,
        description: `You are now friends with ${firstName} ${lastName}}`,
      });
      setIsVisible(false);
    },
    onError: (error) => {
      toast({
        title: "Error accepting friend request",
        description: error.message,
        variant: "destructive",
      });
    }
  });
  
  const handleFriendReqDecline = trpc.friend.declineRequest.useMutation({
    onSuccess: () => {
      toast({
        title: `Declined request from ${username}`,
      });
      setIsVisible(false);
    },
    onError: (error) => {
      toast({
        title: "Error declining friend request",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  const handleAccept = () => {
      handleFriendReqAccept.mutate({username});
  };

  const handleDecline = () => {
      handleFriendReqDecline.mutate({username});
  };

  return (
      <Card className={`flex justify-between items-center overflow-hidden ${isVisible ? 'opacity-100 h-auto' : 'opacity-0 h-0 absolute'} transition-all duration-500`}>
          <CardHeader>
              <CardTitle>{`${firstName} ${lastName}`}</CardTitle>
              <CardDescription>@{username}</CardDescription>
          </CardHeader>
              <CardFooter className="flex items-center gap-2 py-0">
              <Button disabled={handleFriendReqAccept.isLoading || handleFriendReqDecline.isLoading} onClick={handleAccept}>
              <span>{handleFriendReqAccept.isLoading ? <Loader2 className="w-4 h-4 animate-spin stroke-white mr-2" /> : ""}</span>
                Accept
              </Button>
              <Button disabled={handleFriendReqAccept.isLoading || handleFriendReqDecline.isLoading} variant="secondary" onClick={handleDecline}>
              <span>{handleFriendReqDecline.isLoading ? <Loader2 className="w-4 h-4 animate-spin stroke-white mr-2" /> : ""}</span>
                Decline
              </Button>
            </CardFooter>
      </Card>
  );
};

function Requests({ data }: { data: any[] | undefined }) {
  
  return (
    <div>
      <div>
          <h1 className="my-8 mb-4 text-2xl font-semibold tracking-tight">
              Friend Requests
          </h1>
          <p className="text-muted-foreground">Here&apos;s friend requests</p>
    </div>
    <div className="flex flex-col gap-3 relative">
        {data?.length !== 0 && data?.map((request) => (
            <FriendRequest key={request.id} username={request.username} firstName={request.firstName} lastName={request.lastName} />
        ))}
        {data?.length === 0 && (
            <div className="text-center text-gray-500">
                <p>No friend requests</p>
            </div>
        )}
    </div>
    </div>
  )
}

export default Requests