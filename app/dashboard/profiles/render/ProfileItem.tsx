import { Card, CardHeader, CardBody, CardFooter, Avatar, Button } from "@nextui-org/react";
import { Database } from '@/types/supabase'; // Ensure to import Profile type
import { useState } from "react";
import { createClient } from "@/utils/supabase/client"
import { useFollowProfile } from '@/hooks/useFollowProfile';

type Profile = Database['public']['Tables']['profiles']['Row'];
interface ProfileItemProps {
  profile: Profile;
  isFollowed: boolean; // Add isFollowed as a prop
  onFollowToggle: () => void; // Add onFollowToggle as a prop
}

const ProfileItem: React.FC<ProfileItemProps> = ({ profile }) =>  {
  const supabase = createClient()
  const { followProfile, unfollowProfile, isFollowingProfile } = useFollowProfile();
  const [isFollowed, setIsFollowed] = useState(false);

  // const handleFollowToggle = async () => {
  //   try {
  //     const followerId = 'current_user_id'; // Replace 'current_user_id' with the actual ID of the current user
  //     const followedId = profile.id;
  //     setIsFollowed((prev) => !prev);
  //     if (!isFollowed) {
  //       await followProfile(followerId, followedId);
  //     } else {
  //       await unfollowProfile(followerId, followedId);
  //     }
  //   } catch (error) {
  //     console.error('Error following/unfollowing profile:', error.message);
  //   }
  // };

  const handleFollowToggle = async () => {
    try {
      // Retrieve the UUID of the current user from Supabase Auth
      const { user } = supabase.auth.getUser();
      if (!user || !user.id) {
        console.error('Current user not found');
        return;
      }
      const followerId = user.id; // Use the UUID of the current user
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
          <p className="font-semibold text-default-400 text-small">4</p>
          <p className=" text-default-400 text-small">Following</p>
        </div>
        <div className="flex gap-1">
          <p className="font-semibold text-default-400 text-small">97.1K</p>
          <p className="text-default-400 text-small">Followers</p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProfileItem;
