import { useState, useEffect } from 'react';
import { Button, Avatar, Card, CardHeader, CardFooter } from '@nextui-org/react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { FollowCounts } from './FollowCounts';

interface Props {
  profileId: string;
}

export const FollowButtonAndCounts = ({ profileId }: Props) => {
  const supabase = createClientComponentClient();
  const [isFollowing, setIsFollowing] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [counts, setCounts] = useState({
    followersCount: 0,
    followingCount: 0,
  });

  // Define handleFollowToggle, handleFollow, and handleUnfollow outside of useEffect
  const handleFollowToggle = async () => {
    try {
      if (isFollowing) {
        await handleUnfollow();
      } else {
        await handleFollow();
      }
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error('Error toggling follow status:', error.message);
    }
  };

  const handleFollow = async () => {
    try {
      const user = await supabase.auth.getUser();
      await supabase
        .from('followers')
        .insert([{ follower_id: user.data.user?.id, followed_id: profileId }]);
      setIsFollowing(true);
    } catch (error) {
      console.error('Error following user:', error.message);
    }
  };

  const handleUnfollow = async () => {
    try {
      const user = await supabase.auth.getUser();
      await supabase
        .from('followers')
        .delete()
        .eq('follower_id', user.data.user?.id)
        .eq('followed_id', profileId);
      setIsFollowing(false);
    } catch (error) {
      console.error('Error unfollowing user:', error.message);
    }
  };

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

  useEffect(() => {
    const followChannel = supabase
      .channel('realtime followers')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'followers' }, (payload) => {
        console.log('Follow change received!', payload);
        // Handle the payload accordingly, e.g., update counts or UI
        // Update count when unfollow event is received
        setCounts((prevCounts) => ({
          ...prevCounts,
          followersCount: prevCounts.followersCount + 1,
        }));
      })
      .subscribe();

    const unfollowChannel = supabase
      .channel('room1')
      .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'followers' }, (payload) => {
        console.log('Unfollow change received!', payload);
        // Update count when unfollow event is received
        setCounts((prevCounts) => ({
          ...prevCounts,
          followersCount: prevCounts.followersCount - 1,
        }));
      })
      .subscribe();

    return () => {
      supabase.removeChannel(followChannel);
      supabase.removeChannel(unfollowChannel);
    };
  }, [profileId, supabase]);

  return (
    <>
      <Button
        color={isFollowing ? 'error' : 'success'}
        onClick={handleFollowToggle}
        size="sm"
        radius="sm"
        variant={isFollowing ? 'filled' : 'ghost'}
      >
        {isFollowing ? 'Unfollow' : 'Follow'}
      </Button>
      <FollowCounts profileId={profileId} />
    </>
  );
};
