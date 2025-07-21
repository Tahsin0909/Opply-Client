/* eslint-disable @typescript-eslint/no-explicit-any */
import { Image } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import ChatMessage from "../chats/ChatMessage";
import ChatInput from "../chatInput/ChaptInput";
import getTimeDifference from "@/lib/getTimeDifference";
import { TMessage, TUserInfo } from "@/interfaces/message";

interface MessageProps {
  activeUser: TUserInfo | null;
  messages: TMessage[];
  sendMessage: any;
}


const MessageBox = ({ activeUser, messages, sendMessage }: MessageProps) => {

 

  return (
    <div className="bg-white rounded-lg lg:px-[22px] flex flex-col py-4 h-full overflow-hidden">
      <div className="border-b border-gray-300 pb-[15px] flex gap-4 items-center">
        <Image className="!size-[60px] overflow-hidden object-cover !rounded-lg" alt={activeUser?.firstName} src={activeUser?.profilePicture || "https://randomuser.me/api/portraits/men/45.jpg"} />
        <div>
          <Paragraph className="!leading-0">{activeUser?.firstName} {activeUser?.lastName}</Paragraph>
          <div className="flex items-center gap-3"><p className="text-primary !font-normal flex items-center gap-1"><span className="size-[12px] rounded-full bg-primary"></span> {activeUser?.isOnline ? "Online" : "Offline"}</p> { !activeUser?.isOnline && <p className="text-gray-600">{getTimeDifference(activeUser?.lastSeen || "")}</p>}</div>
        </div>
      </div>
      <div className="flex-1 h-full "><ChatMessage messages={messages} /></div>
      <ChatInput sendMessage={sendMessage} />
    </div>
  )
}

export default MessageBox
