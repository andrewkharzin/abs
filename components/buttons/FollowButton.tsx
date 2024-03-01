// FollowButton.tsx

import { useState, useEffect } from 'react';
import { Button } from '@nextui-org/react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

interface Props {
  profileId: string;
}

export const FollowButton = ({ profileId }: Props) => {
  const supabase = createClientComponentClient();
  const [isFollowing, setIsFollowing] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setCurrentUser(user);
      } catch (error) {
        console.error('Error fetching counts:', (error as Error).message);
      }
    };

    fetchCurrentUser();

    const subscription = supabase
      .channel('followers')
      .on('*', (payload) => {
        if (payload.new && payload.new.followed_id === profileId) {
          setIsFollowing(true);
        }
        if (payload.old && payload.old.followed_id === profileId) {
          setIsFollowing(false);
        }
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase, profileId]);

  useEffect(() => {
    const fetchFollowStatus = async () => {
      if (!currentUser) {
        return;
      }

      const { count, error } = await supabase
        .from('followers')
        .select('*', { count: 'exact' })
        .eq('follower_id', currentUser.id)
        .eq('followed_id', profileId);

      if (error) {
        console.error(error);
      } else {
        setIsFollowing(count > 0);
      }
    };

    fetchFollowStatus();
  }, [currentUser, supabase, profileId]);

  const handleFollow = async () => {
    if (!currentUser) {
      alert('You must be logged in to follow a user.');
      return;
    }

    const { error } = await supabase
      .from('followers')
      .insert([{ follower_id: currentUser.id, followed_id: profileId }]);

    if (error) {
      console.error(error);
    } else {
      setIsFollowing(true);
    }
  };

  const handleUnfollow = async () => {
    if (!currentUser) {
      alert('You must be logged in to unfollow a user.');
      return;
    }

    const { error } = await supabase
      .from('followers')
      .delete()
      .eq('follower_id', currentUser.id)
      .eq('followed_id', profileId);

    if (error) {
      console.error(error);
    } else {
      setIsFollowing(false);
    }
  };

  return (
    <Button
      color={isFollowing ? 'error' : 'success'}
      onClick={isFollowing ? handleUnfollow : handleFollow}
      size="sm"
      radius="sm"
      variant={isFollowing ? 'filled' : 'ghost'} // Use 'filled' for follow, 'ghost' for unfollow
      // color={isFollowing ? 'danger' : undefined} // Set color to 'danger' for unfollow
    >
      {isFollowing ? 'Unfollow' : 'Follow'}
    </Button>
  );
};
