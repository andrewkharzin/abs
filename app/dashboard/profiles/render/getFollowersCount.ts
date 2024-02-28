import { createClient } from '@/utils/supabase/client';

const getFollowersCount = async (profileId: string): Promise<number> => {
  const supabase = createClient()
  try {
    // Execute a SQL query to count the number of followers for the given profile ID
    const { data: followers, error } = await supabase
      .from('followers')
      .select('follower_id')
      .eq('followed_id', profileId);

    if (error) {
      throw error;
    }

    // If followers exist, return the count of followers, otherwise return 0
    return followers ? followers.length : 0;
  } catch (error) {
    console.error('Error fetching followers count:', error.message);
    return 0; // Return 0 in case of an error
  }
};

export default getFollowersCount;