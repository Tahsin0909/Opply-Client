// "use client";


// import getTimeDifference from "@/lib/getTimeDifference";
// import { Image } from "antd";
// import Title from "antd/es/typography/Title";
// import Link from "next/link";
// import { useSearchParams } from "next/navigation";
// import { FC, } from "react";
// import useAuthUser from "@/hooks/useGetMe";
// import { TChatMember, TUserInfo } from "@/interfaces/message";


// interface UserListProps {
//   chatMembers: TChatMember[];
//   joinChat: (participant1Id: string, participant2Id: string) => void;
//   setActiveUser: (user: TUserInfo) => void;
// }

// interface UserCardProps extends TChatMember {
//   setActiveUser: (user: TUserInfo) => void;
//   joinChat: (participant1Id: string, participant2Id: string) => void;
// }


// const UserList : FC<UserListProps> = ({ chatMembers, joinChat, setActiveUser }) => {

//   // Demo Data
//   return (
//     <div className="bg-white rounded-2xl h-full overflow-hidden">
//       <Title className="border-b border-gray-300 p-6" level={4}>
//         Support
//       </Title>
//       <div className="h-full overflow-y-scroll divide-y divide-gray-200 grid pb-7">
//         {chatMembers?.map((user, index) => (
//           <UserCard key={index + 1} {...user} setActiveUser={setActiveUser} joinChat={joinChat} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default UserList;

// const UserCard: FC<UserCardProps> = ({ user, lastMessage, lastMessageTime, unreadCount, setActiveUser, joinChat }) => {
//   const searchParams = useSearchParams();
//   const isActive = searchParams.get("user") === String(user.id);
//   const participant1Id = useAuthUser()?.user?.id
//   const participant2Id = searchParams.get("user") || ""
//   if (isActive) {
//     setActiveUser(user)
//   }



//   return (
//     <Link
//       href={`/messaging?user=${user.id}`}
//       onClick={() => joinChat(participant1Id, participant2Id)}
//       className={`flex gap-3 items-center p-3 duration-200 w-full ${isActive ? "!bg-gray-200 " : "hover:!bg-gray-300"}`}
//     >
//       <Image
//         className="!size-[40px] !rounded-full"
//         preview={false}
//         src={user?.profilePicture || ""}
//         alt={`image of ${name}`}
//       />
//       <div className="w-full">
//         <div className="flex items-center justify-between w-full">
//           <Title level={5} className="!m-0">
//             {user.firstName} {user.lastName}
//           </Title>
//           <span className={`text-[10px] font-semibold ${isActive ? "text-icon-color" : ""}`}>
//             {getTimeDifference(lastMessageTime)}
//           </span>
//         </div>
//         <div className="flex items-center justify-between w-full">
//           <p className="text-icon-color">{lastMessage.slice(0, 20)}...</p>
//           <span className={`text-[10px] font-semibold text-white bg-primary rounded-full py-0 px-1`}>{unreadCount}</span>
//         </div>
//       </div>
//     </Link>
//   );
// };


import { Image } from "antd";
import Title from "antd/es/typography/Title";
import { FC, useMemo } from "react";
import getTimeDifference from "@/lib/getTimeDifference";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import useAuthUser from "@/hooks/useGetMe";
import { TChatMember, TUserInfo } from "@/interfaces/message";
import { useGetSingleUserByIdQuery } from "@/redux/api/auth/authApi";


interface UserListProps {
  chatMembers: TChatMember[];
  joinChat: (participant1Id: string, participant2Id: string) => void;
  setActiveUser: (user: TUserInfo) => void;
}

interface UserCardProps extends TChatMember {
  setActiveUser: (user: TUserInfo) => void;
  joinChat: (participant1Id: string, participant2Id: string) => void;
}

const UserList: FC<UserListProps> = ({ chatMembers, joinChat, setActiveUser }) => {
  const searchParams = useSearchParams();
  const userId = searchParams.get("user") as string;
  const currentUserId = useAuthUser()?.user?.id

  const { data: singleUser } = useGetSingleUserByIdQuery(userId, {
    skip: !userId || chatMembers?.some(member => member.user.id === userId)
  });

  const displayUsers = useMemo(() => {
    if (!chatMembers) return [];

    const users = [...chatMembers];
    if (userId && singleUser && !chatMembers.some(member => member.user.id === userId)) {
      users.unshift({
        user: singleUser?.data as TUserInfo,
        lastMessage: '',
        lastMessageTime: new Date().toISOString(),
        unreadCount: 0
      });
    }
    return users;
  }, [chatMembers, singleUser, userId]);

  return (
    <div className="bg-white rounded-2xl h-full overflow-hidden">
      <Title className="border-b border-gray-300 p-6" level={4}>
        Support
      </Title>
      <div className="h-full overflow-y-scroll divide-y divide-gray-200 grid pb-7">
        {displayUsers?.map((userData) => (
          <UserCard
            key={userData.user.id}
            {...userData}
            setActiveUser={setActiveUser}
            joinChat={joinChat}
            currentUserId={currentUserId}
          />
        ))}
      </div>
    </div>
  );
};

const UserCard: FC<UserCardProps & { currentUserId?: string }> = ({
  user,
  lastMessage,
  lastMessageTime,
  unreadCount,
  setActiveUser,
  joinChat,
  currentUserId
}) => {
  const searchParams = useSearchParams();
  const isActive = searchParams.get("user") === String(user.id);

  const handleClick = () => {
    setActiveUser(user);
    if (currentUserId) {
      joinChat(currentUserId, user.id);
    }
  };

  return (
    <Link
      href={`/messaging?user=${user.id}`}
      onClick={handleClick}
      className={`flex gap-3 items-center p-3 duration-200 w-full ${isActive ? "!bg-gray-200 " : "hover:!bg-gray-300"}`}
    >
      <Image
        className="!size-[40px] !rounded-full"
        preview={false}
        src={user?.profilePicture || ""}
        alt={`image of ${user.firstName} ${user.lastName}`}
      />
      <div className="w-full">
        <div className="flex items-center justify-between w-full">
          <Title level={5} className="!m-0">
            {user.firstName} {user.lastName}
          </Title>
          <span className={`text-[10px] font-semibold ${isActive ? "text-icon-color" : ""}`}>
            {getTimeDifference(lastMessageTime)}
          </span>
        </div>
        <div className="flex items-center justify-between w-full">
          <p className="text-icon-color">{lastMessage?.slice(0, 20)}...</p>
          {unreadCount > 0 && (
            <span className="text-[10px] font-semibold text-white bg-primary rounded-full py-0 px-1">
              {unreadCount}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default UserList;
