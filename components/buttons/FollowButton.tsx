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
        const { data: { user } } = await supabase.auth.getUser();
        setCurrentUser(user);
      } catch (error) {
        console.error('Error fetching current user:', error.message);
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

      try {
        const { count } = await supabase
          .from('followers')
          .select('*', { count: 'exact' })
          .eq('follower_id', currentUser.id)
          .eq('followed_id', profileId);

        setIsFollowing(count > 0);
      } catch (error) {
        console.error('Error fetching follow status:', error.message);
      }
    };

    fetchFollowStatus();
  }, [currentUser, supabase, profileId]);

  const handleFollow = async () => {
    if (!currentUser) {
      alert('You must be logged in to follow a user.');
      return;
    }

    try {
      await supabase.from('followers').insert([{ follower_id: currentUser.id, followed_id: profileId }]);
      setIsFollowing(true);
    } catch (error) {
      console.error('Error following user:', error.message);
    }
  };

  const handleUnfollow = async () => {
    if (!currentUser) {
      alert('You must be logged in to unfollow a user.');
      return;
    }

    try {
      await supabase
        .from('followers')
        .delete()
        .eq('follower_id', currentUser.id)
        .eq('followed_id', profileId);
      setIsFollowing(false);
    } catch (error) {
      console.error('Error unfollowing user:', error.message);
    }
  };

  return (
    <Button
      color={isFollowing ? 'error' : 'success'}
      onClick={isFollowing ? handleUnfollow : handleFollow}
      size="sm"
      radius="sm"
      variant={isFollowing ? 'filled' : 'ghost'}
    >
      {isFollowing ? 'Unfollow' : 'Follow'}
    </Button>
  );
};
