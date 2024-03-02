// ProfileItem

"use client";

import { Card, Divider, Spacer, CardHeader, CardBody, CardFooter, Avatar, Button } from "@nextui-org/react";
import { useCallback, useEffect, useState } from 'react'
import { Database } from '@/types/supabase'; // Ensure to import Profile type
import { User, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { FollowButton } from "../../../../components/buttons/FollowButton";
// import { ProfileCard } from "../../../../components/buttons/FollowButton";
import { FollowCounts } from '../../../../components/buttons/FollowCounts';
import { FollowButtonAndCounts } from '../../../../components/buttons/FollowButtonAndCounts';



type Profile = Database['public']['Tables']['profiles']['Row'];
interface ProfileItemProps {
  profile: Profile;
  isFollowed: boolean; // Add isFollowed as a prop
  onFollowToggle: () => void; // Add onFollowToggle as a prop
}

const ProfileItem: React.FC<ProfileItemProps> = ({ profile,  onFollowToggle }) =>  {
  const supabase = createClientComponentClient<Database>()
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  // const [isFollowed, setIsFollowed] = useState(false);


  // Construct the correct avatar URL
  const avatarUrl = profile ? `https://teureaztessldmmncynq.supabase.co/storage/v1/object/public/avatars/${profile.avatar_url}` : '';
  const username = profile?.username;
  const currentUser = supabase.auth.getUser()
  return (
    <Card className="w-full h-[200px]" shadow="sm">
      <CardHeader className="justify-between">
        <div className="flex gap-4">
         <Avatar isBordered color="danger" radius="sm" size="lg" src={avatarUrl} />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">{profile.full_name}</h4>
            <h5 className="text-small tracking-tight text-default-400">@{profile.username}</h5>
          </div>
        </div>
          <div>
            {/* <FollowButton profileId={profile.id} /> */}
          </div>

      </CardHeader>
      <CardFooter className="gap-3">
        {/* <Divider /> */}
        {/* <Spacer y={2} /> */}
        <FollowButtonAndCounts profileId={profile.id} />
      </CardFooter>
    </Card>
  );
};

export default ProfileItem;
