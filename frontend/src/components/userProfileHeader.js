import React, { useEffect, useState} from "react";
import { Settings, ChevronDown} from 'lucide-react';


function OtherProfileHeader({profilePic, profileName, username, numPosts, numFollowers, numFollowing, bioDescription}) {
  return (
    <>
    <div className="flex justify-around items-center w-3/5">
        <div>
            <img src={profilePic}></img>
        </div>

        <div>
            <div className="flex items-center">
                <div className="p-2"><h3 className="text-4xl font-bold pr-10 ">{username}</h3></div>
            </div>

            <div className="flex">
                <div className="p-2">{numPosts} <strong>reviews</strong></div>
                <div className="p-2">{numFollowers} <strong>followers</strong></div>
                <div className="p-2">{numFollowing} <strong>following</strong></div>
            </div>

            <div>
                <div className="p-2"><strong>{profileName}</strong></div>
                <div className="p-2">{bioDescription}</div>
            </div>
        </div>

    </div>
    </>
  );
}

export default OtherProfileHeader