import React, { useState, useEffect } from "react";
import {
  SidebarContainer,
  SidebarUserContainer,
  SidebarUser,
  SidebarOptionsContainer,
  SidebarChannelsContainer,
} from "./SidebarStyles";
import CircleIcon from "@mui/icons-material/Circle";
import AddIcon from "@mui/icons-material/Add";
import HomeIcon from "@mui/icons-material/Home";
import { Avatar } from "@mui/material";
import SidebarOption from "../SidebarOption";
import { auth, db } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../features/appSlice";
import { enterRoomId } from "../../features/roomSlice";

const Sidebar = ({ activeMenu }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    db.collection("rooms")
      .orderBy("channelName", "asc")
      .onSnapshot((snapshot) =>
        setChannels(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, []);

  const logout = () => {
    auth.signOut();
    dispatch(enterRoomId({ roomId: "" }));
  };

  return (
    <SidebarContainer activeMenu={activeMenu}>
      <SidebarUserContainer>
        <SidebarUser>
          <h4>your Time Start</h4>
          <span>
            <CircleIcon />
            <p>{user.username}</p>
          </span>
        </SidebarUser>
        <Avatar src={user.profilePic} />
      </SidebarUserContainer>
      <SidebarOptionsContainer>
        <SidebarOption noneClick Icon={<HomeIcon />} title="Home" />
        <SidebarOption Icon={<AddIcon />} title="Add ROOM" />
        <SidebarChannelsContainer>
          {channels?.map((channel) => (
            <SidebarOption
              enterChannel
              key={channel?.id}
              title={channel?.data?.channelName}
              id={channel?.id}
            />
          ))}
        </SidebarChannelsContainer>
      </SidebarOptionsContainer>
    </SidebarContainer>
  );
};

export default Sidebar;
