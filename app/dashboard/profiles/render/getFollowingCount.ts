import { createClient } from '@/utils/supabase/client';

const getFollowingCount = async (userId: string) => {
  const supabase = createClient()
  try {
    const { data, error } = await supabase
      .from('followers')
      .select('follower_id')
      .eq('follower_id', userId);

    if (error) {
      throw error;
    }

    // Count the number of follow relationships where the current user is the follower
    const count = data ? data.length : 0;
    return count;
  } catch (error) {
    console.error('Error fetching following count:', error.message);
    throw error;
  }
};

export default getFollowingCount;
