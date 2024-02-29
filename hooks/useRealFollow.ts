import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

// Define an interface representing the payload structure
interface RealtimePayload {
  new: {
    followers_count: number;
  };
}

const useFollowersCountRealtime = (profileId: string): number => {
  const supabase = createClient();
  const [followersCount, setFollowersCount] = useState(0);

  useEffect(() => {
    // Subscribe to real-time updates for the followers table
    const subscription = supabase
      .channel("realtime followers")
      .on(
        "postgres_changes", // Listen specifically for INSERT events
        {
          event: "*",
          schema: "public",
          table: "followers",
        },
        (payload: RealtimePayload) => { // Annotate payload with RealtimePayload interface
          console.log("Realtime change received:", payload);
          // Extract relevant information from payload and update state accordingly
          // For example, if payload contains the new count directly:
          setFollowersCount(payload.new.followers_count);
        }
      )
      .subscribe();
    // Cleanup subscription on component unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return followersCount;
};

export default useFollowersCountRealtime;
