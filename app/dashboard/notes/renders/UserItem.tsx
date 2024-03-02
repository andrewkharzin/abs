import { useEffect, useState } from 'react';
import { Avatar, Select, SelectItem } from '@nextui-org/react';
import { Database } from '@/types/supabase'; // Ensure to import Profile type
import { createClient } from '@/utils/supabase/client'; // Import your Supabase client

type Profile = Database['public']['Tables']['profiles']['Row'];
interface UserItemProps {
  profile: Profile;
  isFollowed: boolean; // Add isFollowed as a prop
  onFollowToggle: () => void; // Add onFollowToggle as a prop
}

const UserItem: React.FC<UserItemProps> = ({ profile,  onFollowToggle }) =>  {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfiles = async () => {
      const supabase = createClient();
      try {
        const { data: profilesData, error } = await supabase
          .from('profiles')
          .select('*');
        if (error) {
          throw error;
        }
        setProfiles(profilesData || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profiles:', error.message);
      }
    };

    fetchProfiles();
  }, []);


  // Construct the correct avatar URL
  // const avatarUrl = profile ? `https://teureaztessldmmncynq.supabase.co/storage/v1/object/public/avatars/${profile.avatar_url}` : '';
  const username = profile?.username;

  // Render the user profiles here, based on the fetched data
  return (
    <div>
       <Select label="Select user" className="max-w-xs">
        {loading ? (
          <SelectItem disabled>Loading...</SelectItem>
        ) : (
          profiles.map(profile => {
            const avatarUrl = profile ? `https://teureaztessldmmncynq.supabase.co/storage/v1/object/public/avatars/${profile.avatar_url}` : '';
            return (
              <SelectItem
                key={profile.id}
                value={profile.id}
                startContent={<Avatar alt={profile.username } className="w-6 h-6" src={avatarUrl} />}
              >
                {profile.username}
              </SelectItem>
            );
          })
        )}
      </Select>
    </div>
  );
};

export default UserItem;
