"use client";

import { Tab, TabGroup, TabList, TabPanel, TabPanels, TextInput } from "@tremor/react";
import { trpc } from "@web/app/_trpc/client";
import { addFriendValidator } from "@web/lib/validations/add-friend";
import { PlusCircleIcon, SearchIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Icons } from "../global/Icons";
import { Modal } from "../global/Modal";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useToast } from "../ui/use-toast";

interface Friend {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  image: string;
}


function Explore({ friends, userId }: { friends: any[] | undefined, userId: string }) {

    const { toast } = useToast();

    const [searchQuery, setSearchQuery] = useState("");
    const [friendSearchQuery, setFriendSearchQuery] = useState("");
    const [newRequest, setNewRequest] = useState<boolean>(false);

    const isFriendSelected = (friend: Friend) =>
     ( friend.username.toLowerCase().includes(friendSearchQuery.toLowerCase()) || friend.firstName.toLowerCase().includes(friendSearchQuery.toLowerCase()) || friend.lastName.toLowerCase().includes(friendSearchQuery.toLowerCase()) || (friend.firstName + " " + friend.lastName).toLowerCase().includes(friendSearchQuery.toLowerCase()) || friendSearchQuery === "");

    const [username, setUsername] = useState<string>("");

    const makeFriendRequest = trpc.friend.makeRequest.useMutation({
        onSuccess: () => {
            toast({
              title: "Success ",
              description: "Successfully sent a friend request!",
            })
            setNewRequest(false);
          },
            onError: (error) => {
                toast({
                title: "Error ",
                description: error.message,
                variant: "destructive",
                })
                setNewRequest(false);
            },
      })
  return (
    <div>
      <div>
          <h1 className="my-8 mb-4 text-2xl font-semibold tracking-tight">
              Explore
          </h1>
      </div>
      <TabGroup>
      <TabList className="mt-8">
          <Tab>Discover</Tab>
          <Tab>Friends</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <div>
          <div className="flex justify-center items-center gap-5 mt-4">

    {/* Search Bar */}
    <TextInput
      icon={SearchIcon}
      placeholder="Search..."
      onChange={(event) => setSearchQuery(event.target.value)}
    />

    {/* Modal Trigger for new friend request */}
    <Button className="w-1/3 flex items-center gap-3" onClick={() => setNewRequest(true)}>
        <PlusCircleIcon className="w-4 h-4" /> Make a Friend Request
    </Button>
      </div>
        
      {/* Modal for new problem */}
      {newRequest && (
        <Modal toClose={setNewRequest} popupTitle="Make a Request" popupDescription="Make a Friend Request with their username" popupCTA="Request" popupCTAHandler={() => {
          const data = {
            username: username,
          }
          let {username: usrname} = addFriendValidator.parse(data);
          if (usrname[0] === "@") {
            usrname = usrname.slice(1);
          }
          makeFriendRequest.mutate({username: usrname},);
        }}
          >
          {/* Modal Form */}
          <form onSubmit={(event) => {
            event.preventDefault();
          }}>
            <div className="grid w-full items-center gap-4">
              
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Username</Label>
                <Input id="name" placeholder="Username" onChange={
                  (event) => setUsername(event.target.value)
                }/>
              </div>
            </div>
          </form>
        </Modal>)}

    
      <div className="text-center text-gray-500 py-10">
            <p>Search Under Work!! Coming Soon!! But if you know the username, you can send a request with above button.</p>
      </div>

      {searchQuery && (
          <div className="text-center text-gray-500">
            <p>Why are you trying to search??</p>
          </div>
          )}
        </div>
        </TabPanel>
        <TabPanel>
        <div className="flex flex-col gap-5 mt-4">
          {/* Search Bar */}
          <TextInput
            icon={SearchIcon}
            placeholder="Search among your friends..."
            onChange={(event) => setFriendSearchQuery(event.target.value)}
          />
          {friends && friends
            .filter((item) => isFriendSelected(item))
            .map((item) => {
              // sort between user.id and item.id and add to /chat/user.id--item.id
              let chatLink = "/chat/";
              if (item.id > userId) {
                chatLink += userId + "--" + item.id;
              } else {
                chatLink += item.id + "--" + userId;
              }
              return (
              <Card className="flex justify-between items-center" key={item.id}>
              <CardHeader className="flex items-center flex-row gap-4">
              <Avatar className="relative h-10 w-10 rounded-full object-cover">
                        {item.image ? (
                            <div className="relative aspect-square h-full w-full">
                                <Image
                                    fill
                                    src={item.image}
                                    alt="profile picture"
                                    referrerPolicy="no-referrer"
                                />
                            </div>
                        ) : (
                            <AvatarFallback>
                                <span className="sr-only">{item.firstName} {item.lastName}</span>
                                <Icons.user className="h-4 w-4 text-zinc-900" />
                            </AvatarFallback>
                        )}
                    </Avatar>
                  <div>
                  <CardTitle>{`${item.firstName} ${item.lastName}`}</CardTitle>
                  <CardDescription>@{item.username}</CardDescription>
                  </div>
              </CardHeader>

                  <CardFooter className="flex items-center gap-2 py-0">
                  <Link href={chatLink}>
                    <Button>
                      Chat
                    </Button>
                  </Link>
                  <Link href={"/profile/" + item.username}>
                  <Button variant={"secondary"}>
                    Profile
                  </Button>
                  </Link>
                </CardFooter>
          </Card>
            )})}
        </div>
        </TabPanel>
      </TabPanels>
      </TabGroup>
      </div>
  )
}

export default Explore