import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

export const useSupabase = (cookies: any) => {
  const supabase = createServerComponentClient({ cookies });

  // Function to fetch user information
  const getUser = async () => {
    try {
      const { data: user, error } = await supabase.auth.getUser();
      if (error) {
        throw error;
      }
      return user;
    } catch (error) {
      console.error('Error fetching user:', error.message);
      return null;
    }
  };

  return {
    supabase,
    getUser,
  };
};
