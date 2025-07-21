"use client";
import { Row, Col, Spin } from "antd";
import UserList from "./userList/UserList";
import MessageBox from "./messageBox/MessageBox";
import { useState, useEffect } from "react";
import { useChat } from "../../../hooks/useChat";
import { TUserInfo } from "@/interfaces/message";
import useAuthUser from "@/hooks/useGetMe";
import { useSearchParams } from "next/navigation";

const MessagesPage = () => {
  const [activeUser, setActiveUser] = useState<TUserInfo | null>(null);
   const searchParams = useSearchParams();
  const userId = searchParams.get("user");

  const { chatMembers, joinChat, messages, sendMessage, refreshChatMembers } = useChat();

  useEffect(() => {
    // Refresh chat members when component mounts
    refreshChatMembers();
  }, [refreshChatMembers]);

  useEffect(() => {
    if (userId && chatMembers?.length > 0) {
      const user = chatMembers.find(member => member.user.id === userId)?.user;
      if (user) {
        setActiveUser(user);
      }
    }
  }, [userId, chatMembers]);
  const currentUserId = useAuthUser()?.user?.id
  const handleUserClick = (user: TUserInfo) => {
    setActiveUser(user);
    joinChat(currentUserId!, user.id);
  };

  return (
    <div className="container my-2 sm:my-4 lg:my-12">
      <Row gutter={[16, 16]} className="h-full p-4 ">
        <Col xs={0} xl={6} className="h-full xl:block hidden">
          <UserList
            chatMembers={chatMembers}
            joinChat={joinChat}
            setActiveUser={handleUserClick}
          />
        </Col>
        <Col xs={24} xl={18} className="h-full">
          {activeUser ? (
            <MessageBox
              activeUser={activeUser}
              messages={messages}
              sendMessage={sendMessage}
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <Spin size="large" />
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default MessagesPage;