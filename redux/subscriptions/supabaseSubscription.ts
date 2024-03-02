import { createClient } from '../../utils/supabase/client';
import { followUser, unfollowUser } from '../../redux/slices/followSlice';
import { AppDispatch } from '../../redux/store';

interface RealtimePayload {
  event: string;
  new: {
    followed_id?: string;
    follower_id?: string;
  };
  old?: {
    followed_id?: string;
    follower_id?: string;
  };
}

export const initSupabaseSubscription = (dispatch: AppDispatch, profileId: string) => {
  console.log('Initializing Supabase subscription...');
  const supabase = createClient();

  const fetchFollowStatus = async () => {
    console.log('Fetching follow status...');
    const currentUser = supabase.auth.getUser();
    console.log('Current user:', currentUser);

    if (!currentUser) {
      console.log('No current user found');
      return;
    }

    const { count, error } = await supabase
      .from('followers')
      .select('*', { count: 'exact' })
      .eq('follower_id', (await currentUser).data.user?.id)
      .eq('followed_id', profileId);

    if (error) {
      console.error('Error fetching follow status:', error.message);
    } else {
      const isFollowing = count > 0;
      console.log(`Is following? ${isFollowing}`);
      if (isFollowing) {
        dispatch(followUser(profileId));
      } else {
        dispatch(unfollowUser(profileId));
      }
    }
  };

  fetchFollowStatus();

  const subscription = supabase
    .channel('realtime followers')
    .on('INSERT', (payload: RealtimePayload) => {
      console.log('New follower added:', payload);
      if (payload.new.followed_id === profileId) {
        dispatch(followUser(profileId));
      } else if (payload.new.follower_id === profileId) {
        dispatch(followUser(profileId));
      }
    })
    .on('DELETE', (payload: RealtimePayload) => {
      console.log('Follower removed:', payload);
      if (payload.old.followed_id === profileId) {
        dispatch(unfollowUser(profileId));
      } else if (payload.old.follower_id === profileId) {
        dispatch(unfollowUser(profileId));
      }
    })
    .subscribe();

  console.log('Subscription established');
  return subscription;
};
