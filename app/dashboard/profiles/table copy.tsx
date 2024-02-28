import { useEffect, useState } from 'react';
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { Divider, Spacer, Button } from "@nextui-org/react";
import { Database } from '@/types/supabase';

type Profile = Database['public']['Tables']['profiles']['Row']

export default function ProfilesPage() {
  const supabase = createClient();
  const router = useRouter();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProfiles = async () => {
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
  }, [supabase]);

  return (
    <>
      <Spacer y={2} />
      <div className="flex space-x-2 mb-4">
        {/* You can add filter buttons here if needed */}
      </div>
      <Divider />
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Username</th>
              <th className="px-4 py-2">Full Name</th>
              <th className="px-4 py-2">Avatar URL</th>
              <th className="px-4 py-2">Website</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              // Render loading skeleton or spinner while profiles are being fetched
              <tr>
                <td colSpan={4} className="px-4 py-2">Loading...</td>
              </tr>
            ) : profiles.length === 0 ? (
              // Render message if no profiles are found
              <tr>
                <td colSpan={4} className="px-4 py-2">No profiles found.</td>
              </tr>
            ) : (
              // Render list of profiles
              profiles.map(profile => (
                <tr key={profile.id}>
                  <td className="px-4 py-2">{profile.username}</td>
                  <td className="px-4 py-2">{profile.full_name}</td>
                  <td className="px-4 py-2">{profile.avatar_url}</td>
                  <td className="px-4 py-2">{profile.website}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
