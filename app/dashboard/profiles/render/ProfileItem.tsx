// ProfileItem

"use client";

import { Card, CardHeader, CardBody, CardFooter, Avatar, Button } from "@nextui-org/react";
import { useCallback, useEffect, useState } from 'react'
import { Database } from '@/types/supabase'; // Ensure to import Profile type
import { User, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { FollowButton } from "../../../../components/buttons/FollowButton";
// import { ProfileCard } from "../../../../components/buttons/FollowButton";
import { FollowCounts } from '../../../../components/buttons/FollowCounts';
import getFollowersCount from "@/components/buttons/getFollowersCount"
import getFollowingCount from "@/components/buttons/getFollowingCount"
import useFollowersCountRealtime from '@/components/buttons/useFollowersCountRealtime';
import useRealFollow from '@/hooks/useRealFollow';

type Profile = Database['public']['Tables']['profiles']['Row'];
interface ProfileItemProps {
  profile: Profile;
  isFollowed: boolean; // Add isFollowed as a prop
  onFollowToggle: () => void; // Add onFollowToggle as a prop
}

const ProfileItem: React.FC<ProfileItemProps> = ({ profile,  onFollowToggle }) =>  {
  const supabase = createClientComponentClient<Database>()
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  // const [isFollowed, setIsFollowed] = useState(false);


  // Construct the correct avatar URL
  const avatarUrl = profile ? `https://teureaztessldmmncynq.supabase.co/storage/v1/object/public/avatars/${profile.avatar_url}` : '';
  const username = profile?.username;
  return (
    <Card className="max-w-[340px]">
      <CardHeader className="justify-between">
        <div className="flex gap-5">
         <Avatar isBordered radius="full" size="md" src={avatarUrl} />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">{profile.full_name}</h4>
            <h5 className="text-small tracking-tight text-default-400">@{profile.username}</h5>
          </div>
        </div>
      {currentUser?.data.user?.id === profile.id ? ( // Check if the current user is the same as the profile user

          <span className="text-pink-600 text-lg font-bold pl-5">BOSS</span>
        ) : (

            <div>


              <FollowButton profileId={profile.id} />

            </div>
        )}
      </CardHeader>
      <CardFooter className="gap-3">
        {/* <div className="flex gap-1">
          <p className="font-semibold text-default-400 text-small">{followingCount}</p>
          <p className="text-default-400 text-small">Following</p>
        </div>
        <div className="flex gap-1">
          <p className="font-semibold text-default-400 text-small">{followersCount}</p>
          <p className="text-default-400 text-small">Followers</p>
        </div> */}
        <FollowCounts profileId={profile.id} />
      </CardFooter>
    </Card>
  );
};

export default ProfileItem;
