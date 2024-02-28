import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

const useFollowersCountRealtime = (profileId: string): number => {
  const supabase = createClient()
  const [followersCount, setFollowersCount] = useState(0);

  useEffect(() => {
    // Subscribe to real-time updates for the followers table
    const subscription = supabase
      .channel(`followers:followed_id=eq.${profileId}`).on('INSERT', () => {
        // Update followers count when a new follower is added
        setFollowersCount((prevCount) => prevCount + 1);
      }).on('DELETE', () => {
        // Update followers count when a follower is removed
        setFollowersCount((prevCount) => prevCount - 1);
      })
      .subscribe();

    // Cleanup subscription on component unmount
    return () => {
      subscription.unsubscribe();
    };
  }, [supabase, profileId]);

  return followersCount;
};

export default useFollowersCountRealtime;
