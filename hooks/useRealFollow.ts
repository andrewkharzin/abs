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
        const currentUser = await supabase.auth.getUser();

        if (currentUser) {
          const { data, error } = await supabase
            .from('followers')
            .select('*')
            .eq('follower_id', currentUser.data.user?.id)
            .eq('followed_id', profileId);

          if (error) {
            throw error;
          }

          if (data.length === 1) {
            setIsFollowed(true);
          } else if (data.length === 0) {
            setIsFollowed(false);
          } else {
            console.error('Unexpected multiple rows returned for follow status');
          }

          const followerId = currentUser.data.user?.id; // Get the follower ID here

          if (followerId) {
            const followerSubscription = supabase
              .channel(`followers:follower_id=eq.`)
              .on<any>('INSERT', (payload: any, context: any) => {
                if (context.payload.new.followed_id === profileId) {
                  setIsFollowed(true);
                }
              })
              .on<any>('DELETE', (payload: any, context: any) => {
                if (context.payload.old.followed_id === profileId) {
                  setIsFollowed(false);
                }
              })
              .subscribe();

            return () => {
              followerSubscription.unsubscribe();
            };
          }
        }
      } catch (error) {
        console.error('Error fetching follow status:', error.message);
      }
    };


    let followerSubscription: any = null; // Initialize followerSubscription

    const subscribeToFollower = async () => {
      try {
        const currentUser = await supabase.auth.getUser(); // Await the promise

        if (currentUser) {
          const followerId = await currentUser.data.user?.id // Await the promise
          followerSubscription = supabase // Assign to followerSubscription inside the if block
            .channel(`followers:follower_id=eq.`)
            .on<any>('INSERT', (payload: any, context: any) => {
              if (context.payload.new.followed_id === profileId) {
                setIsFollowed(true);
              }
            })
            .on<any>('DELETE', (payload: any, context: any) => {
              if (context.payload.old.followed_id === profileId) {
                setIsFollowed(false);
              }
            })
            .subscribe();
        }
      } catch (error) {
        console.error('Error subscribing to follower:', error.message);
      }
    };

    fetchFollowStatus();
    subscribeToFollower();

    return () => {
      if (followerSubscription) { // Check if followerSubscription is defined
        followerSubscription.unsubscribe();
      }
    };
  }, [supabase, profileId]);

  return isFollowed;
};

export default useRealFollow;