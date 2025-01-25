import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../Store/Slice/selectedUser";

const OtherUser = ({ user }) => {

  const onlineUser = useSelector((state) => state.onlineUsers);

  const isOnline = onlineUser?.onlineUsers?.includes(user._id);
  //    console.log(isOnline);

  const dispatch = useDispatch();
  const { selectedUser } = useSelector((state) => state.selectedUser);
  const selectedUserhandler = async (user) => {
    if (!user) return;
    dispatch(setSelectedUser(user));
  };

  return (
    <>
      <div
        onClick={() => selectedUserhandler(user)}
        className={`${
          selectedUser?._id === user?._id ? "bg-green-200" : "text-white"
        } flex items-center gap-2 hover:bg-green-200 rounded-md p-2 cursor-pointer overflow-hidden my-2 `}
      >
        <div className={`avatar ${isOnline ? "online" : " "}`}>
          <div className=" rounded-full w-12">
            <img src={user?.profilePhoto} alt="" />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex justify-between gap-2 ">
            <h3>{user?.fullName}</h3>
          </div>
        </div>
      </div>
      <div className="divider my-0 py-0 h-[1px] bg-gray-400"></div>
    </>
  );
};

export default OtherUser;
