import React from "react";
import { Dot } from 'lucide-react';

function ProfileTitle({ ProfilePic, profileName, timePosted }) {
  return (
    <div className="flex flex-row items-center">
      {ProfilePic && <ProfilePic className="w-5 h-5 mr-2" />}
      <div>{profileName}</div>
      <Dot className="w-3 h-3 mx-2 text-gray-400" />
      <div className="text-gray-500">{timePosted}</div>
    </div>
  );
}

export default ProfileTitle;