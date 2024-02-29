import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';


export const useProfiles = () => {
  const supabase = createClient()
  const [profiles, setProfiles] = useState<any[]>([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, username, full_name, avatar_url, website');
      if (error) {
        console.error(error);
      } else {
        setProfiles(data);
      }
    };
    fetchProfiles();
  }, [supabase]);

  return profiles;
};
