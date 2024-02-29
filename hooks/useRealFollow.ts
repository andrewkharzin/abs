import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

interface RealFollowProps {
  profileId: string;
}

const useRealFollow = ({ profileId }: RealFollowProps) => {
  const supabase = createClient();
  const [isFollowed, setIsFollowed] = useState(false);

  useEffect(() => {
    const fetchFollowStatus = async () => {
      try {
        const currentUser = supabase.auth.getUser();

        if (currentUser) {
          const { data: followData, error } = await supabase
            .from('follows')
            .select('*')
            .eq('follower_id', currentUser.id)
            .eq('followed_id', profileId)
            .single();

          if (error) {
            console.error('Error fetching follow status:', error.message);
            return;
          }

          setIsFollowed(!!followData); // Convert to boolean
        }
      } catch (error) {
        console.error('Error fetching follow status:', error.message);
      }
    };

    const followerSubscription = supabase
      .channel(`follows:follower_id=eq.${supabase.auth.getUser()}`)
      .on('*', (payload, context) => {
        if (context.eventType === 'INSERT' && payload.new.followed_id === profileId) {
          setIsFollowed(true);
        } else if (context.eventType === 'DELETE' && payload.old.followed_id === profileId) {
          setIsFollowed(false);
        }
      })
      .subscribe();

    fetchFollowStatus();

    return () => {
      followerSubscription.unsubscribe();
    };
  }, [supabase, profileId]);

  return isFollowed;
};

export default useRealFollow;