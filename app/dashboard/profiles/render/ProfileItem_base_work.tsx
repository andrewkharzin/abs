"use client";

import { Card, CardHeader, CardBody, CardFooter, Avatar, Button } from "@nextui-org/react";
import { useCallback, useEffect, useState } from 'react'
import { Database } from '@/types/supabase'; // Ensure to import Profile type
import { useFollowProfile } from '@/hooks/useFollowProfile';
import { User, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import getFollowersCount from "./getFollowersCount"
import useFollowersCountRealtime from './useFollowersCountRealtime';

type Profile = Database['public']['Tables']['profiles']['Row'];
interface ProfileItemProps {
  profile: Profile;
  isFollowed: boolean; // Add isFollowed as a prop
  onFollowToggle: () => void; // Add onFollowToggle as a prop
}

const ProfileItem: React.FC<ProfileItemProps> = ({  profile }) =>  {
  const supabase = createClientComponentClient<Database>()
  const { followProfile, unfollowProfile, isFollowingProfile } = useFollowProfile();
  const [isFollowed, setIsFollowed] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null); // State to store the current user
  const [followersCount, setFollowersCount] = useState(0);



  // useEffect to fetch followers count when profile changes
  useEffect(() => {
    const fetchFollowersCount = async () => {
      try {
        // Fetch followers count for the profile
        // You need to implement getFollowersCount function
        const count = await getFollowersCount(profile.id);
        setFollowersCount(count);
      } catch (error) {
        console.error('Error fetching followers count:', error.message);
      }
    };
    fetchFollowersCount();
  }, [profile.id]); // Depend on profile.id to fetch count when profile changes


  const handleFollowToggle = async () => {
    try {
      const currentUser = await supabase.auth.getUser(); // Fetch the current user synchronously

      console.log('Current user in handleFollowToggle:', currentUser); // Log the current user

      if (!currentUser || !currentUser.data.user?.id) {
        console.error('Current user not found');
        return;
      }

      const followerId = currentUser.data.user?.id; // Use the UUID of the current user
      const followedId = profile.id;
      setIsFollowed((prev) => !prev);
      if (!isFollowed) {
        await followProfile(followerId, followedId);
      } else {
        await unfollowProfile(followerId, followedId);
      }
    } catch (error) {
      console.error('Error following/unfollowing profile:', error.message);
    }
  };
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
        <Button
          className={isFollowed ? 'bg-transparent text-foreground border-default-200' : ''}
          color="primary"
          radius="full"
          size="sm"
          variant={isFollowed ? 'bordered' : 'solid'}
          onClick={handleFollowToggle}
        >
          {isFollowed ? 'Unfollow' : 'Follow'}
        </Button>
      </CardHeader>
      <CardFooter className="gap-3">
        <div className="flex gap-1">
          <p className="font-semibold text-default-400 text-small">{profile.following_count}</p>
          <p className=" text-default-400 text-small">Following</p>
        </div>
        <div className="flex gap-1">
          <p className="font-semibold text-default-400 text-small">{followersCount}</p>
          <p className="text-default-400 text-small">Followers</p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProfileItem;
