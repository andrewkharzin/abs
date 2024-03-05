import React, { useState, useEffect } from 'react';
import { Avatar, Select, SelectItem, Spacer } from '@nextui-org/react';
import { Database } from '@/types/supabase'; // Ensure to import Profile type
import { createClient } from '@/utils/supabase/client'; // Import your Supabase client

type Profile = Database['public']['Tables']['profiles']['Row'];

interface MultiUserSelectorProps {
  onSelect: (selectedUsers: Profile[]) => void;
}

const MultiUserSelector: React.FC<MultiUserSelectorProps> = ({ onSelect }) => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<Profile[]>([]);

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
      } catch (error) {
        console.error('Error fetching profiles:', error.message);
      }
    };

    fetchProfiles();
  }, []);

  const handleUserSelect = (profile: Profile) => {
    const isUserSelected = selectedUsers.some((user) => user.id === profile.id);
    if (isUserSelected) {
      setSelectedUsers(selectedUsers.filter((user) => user.id !== profile.id));
    } else {
      setSelectedUsers([...selectedUsers, profile]);
    }
  };

  useEffect(() => {
    onSelect(selectedUsers);
  }, [selectedUsers]);

  return (
    <div>
      <Select
        label="Choose User"
        placeholder="Select a user"
        labelPlacement="outside"
        selectionMode="multiple"
        variant="underlined"
      >
        {profiles.map((profile) => (
          <SelectItem
            key={profile.id}
            textValue={profile.username}
            selected={selectedUsers.some((user) => user.id === profile.id)}
            onClick={() => handleUserSelect(profile)}
          >
            <div className="flex gap-2 items-center">
              <Avatar alt={profile.username} className="flex-shrink-0" size="sm" src={profile.avatar_url} />
              <div className="flex flex-col">
                <span className="text-small">{profile.full_name}</span>
                <span className="text-tiny text-default-400">@{profile.username}</span>
              </div>
            </div>
          </SelectItem>
        ))}
      </Select>
      <Spacer y={4} />
      <div className="flex flex-row gap-4">
        {selectedUsers.map((user) => (
          <Avatar
            key={user.id}
            alt={user.username}
            isBordered
            size="sm"
            color="danger"
            radius="full"
            src={`https://teureaztessldmmncynq.supabase.co/storage/v1/object/public/avatars/${user.avatar_url}`}
          />
        ))}
      </div>
    </div>
  );
};

export default MultiUserSelector;
