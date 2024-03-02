//FollowCounts.tsx


import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Spacer, Divider} from "@nextui-org/react"

interface Props {
  profileId: string;
}

interface Counts {
  followingCount: number;
  followersCount: number;
}

interface RealtimePayload {
  event: string;
  new: any;
  old: any;
}

export const FollowCounts = ({ profileId }: Props) => {
  const supabase = createClientComponentClient();
  const [counts, setCounts] = useState<Counts>({
    followingCount: 0,
    followersCount: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      console.log('Fetching counts...');
      try {
        setLoading(true);

        const followingRes = await supabase
          .from('followers')
          .select('follower_id')
          .eq('followed_id', profileId);
        const followersRes = await supabase
          .from('followers')
          .select('followed_id')
          .eq('follower_id', profileId);

        const followingCount = followingRes.data ? followingRes.data.length : 0;
        const followersCount = followersRes.data ? followersRes.data.length : 0;

        console.log('Counts fetched:', { followingCount, followersCount });

        setCounts({
          followingCount,
          followersCount,
        });

        const subscription = supabase
          .channel('realtime followers')
          .on('INSERT', (payload: RealtimePayload) => {
            console.log('Real-time update received:', payload);
            if (payload.new.followed_id === profileId) {
              setCounts((prevCounts) => ({
                ...prevCounts,
                followersCount: prevCounts.followersCount + 1,
              }));
            } else if (payload.new.follower_id === profileId) {
              setCounts((prevCounts) => ({
                ...prevCounts,
                followingCount: prevCounts.followingCount + 1,
              }));
            }
          })
          .subscribe();

        console.log('Subscription established');

        return () => {
          console.log('Unsubscribing...');
          supabase.removeChannel(subscription);
        };
      } catch (error) {
        console.error('Error fetching counts:', (error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, [supabase, profileId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {/* <Divider />
      <Spacer y={2} /> */}
      <div className="flex gap-1">
        <p className="font-bold dark:text-pink-600 text-pink-700 text-tiny">{counts.followingCount}</p>
        <p className="text-default-500 font-light text-tiny">Following</p>
      </div>
      <div className="flex gap-1">
        <p className="font-bold dark:text-pink-600 text-pink-700 text-tiny">{counts.followersCount}</p>
        <p className="text-default-500 font-light text-tiny">Followers</p>
      </div>
    </>
  );
};
