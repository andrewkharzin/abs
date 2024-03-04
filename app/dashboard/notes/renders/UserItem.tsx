// UserItem.tsx

import { useEffect, useState } from 'react';
import { Avatar, Select, SelectItem } from '@nextui-org/react';
import { Database } from '@/types/supabase'; // Ensure to import Profile type
import { createClient } from '@/utils/supabase/client'; // Import your Supabase client

type Profile = Database['public']['Tables']['profiles']['Row'];


interface UserItemProps {
  profile: Profile,
  isFollowed: boolean; // Add isFollowed as a prop
  selectedUsers: Profile[];
  setSelectedUsers: React.Dispatch<React.SetStateAction<Profile[]>>;
  // currentUserProfile: Profile;
}


const UserItem: React.FC<UserItemProps> = ({ profile, selectedUsers, setSelectedUsers, currentUserProfile }) =>  {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const isUserSelected = selectedUsers.some((user) => user.id === profile.id);

  // if (profile.id === currentUserProfile.id) {
  //   return null;
  // }

  const handleUserSelect = () => {
    if (isUserSelected) {
      setSelectedUsers(selectedUsers.filter((user) => user.id !== profile.id));
    } else {
      setSelectedUsers([...selectedUsers, profile]);
    }
  };
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
      <Select
         label="Choose User"
         placeholder="Select a user"
         labelPlacement="outside"
         selectionMode="multiple"
         variant="underlined"
        //  onClick={() => onFollowToggle(profile)}
       >
        {loading ? (
          <SelectItem disabled>Loading...</SelectItem>
        ) : (
          profiles.map(profile => {
            const avatarUrl = profile ? `https://teureaztessldmmncynq.supabase.co/storage/v1/object/public/avatars/${profile.avatar_url}` : '';
            return (
              <SelectItem
                key={profile.id}
                textValue={profile.username}
                selected={selectedUsers.some((user) => user.id === profile.id)}
                onClick={handleUserSelect}

              >
                <div className="flex gap-2 items-center">
                  <Avatar alt={profile.username} className="flex-shrink-0" size="sm" src={avatarUrl} />
                  <div className="flex flex-col">
                    <span className="text-small">{profile.full_name}</span>
                    <span className="text-tiny text-default-400">@{profile.username}</span>
                  </div>
                </div>
              </SelectItem>
            );
          })
        )}
      </Select>
    </div>
  );
};

export default UserItem;
