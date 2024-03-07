"use client";

import { useEffect, useState } from 'react';
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { Divider, Spacer, Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { Database } from '@/types/supabase';
import ProfileItem from "./render/ProfileItem";

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
      <Divider />
      <Spacer y={4} />
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 px-2 py-2">
        {loading ? (
          <p>Loading...</p>
        ) : profiles.length === 0 ? (
          <p>No profiles found.</p>
        ) : (
          profiles.map(profile => (
            <div key={profile.id}>

              <ProfileItem profile={profile} />
              <Spacer y={2} />
            </div>
          ))
        )}
      </div>
    </>
  );
}