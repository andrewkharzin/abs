'use client'
import { useCallback, useEffect, useState } from 'react'
import { Database } from '@/types/supabase'
import Avatar from './avatar'
import { User, createClientComponentClient } from '@supabase/auth-helpers-nextjs'

import {Spacer, Card, CardHeader, CardBody, CardFooter, Button, Input} from "@nextui-org/react";

export default function AccountForm({ user }: { user: User | null }) {
  const supabase = createClientComponentClient<Database>()
  const [loading, setLoading] = useState(true)
  const [fullname, setFullname] = useState<string | null>(null)
  const [username, setUsername] = useState<string | null>(null)
  const [website, setWebsite] = useState<string | null>(null)
  const [avatar_url, setAvatarUrl] = useState<string | null>(null)

  const getProfile = useCallback(async () => {
    try {
      setLoading(true)

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`full_name, username, website, avatar_url`)
        .eq('id', user?.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setFullname(data.full_name)
        setUsername(data.username)
        setWebsite(data.website)
        setAvatarUrl(data.avatar_url)
      }
    } catch (error) {
      alert('Error loading user data!')
    } finally {
      setLoading(false)
    }
  }, [user, supabase])

  useEffect(() => {
    getProfile()
  }, [user, getProfile])

  async function updateProfile({
    username,
    website,
    avatar_url,
  }: {
    username: string | null
    fullname: string | null
    website: string | null
    avatar_url: string | null
  }) {
    try {
      setLoading(true)

      const { error } = await supabase.from('profiles').upsert({
        id: user?.id as string,
        full_name: fullname,
        username,
        website,
        avatar_url,
        updated_at: new Date().toISOString(),
      })
      if (error) throw error
      alert('Profile updated!')
    } catch (error) {
      alert('Error updating the data!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col mx-auto">
      <div>
      <Card>
        <CardHeader>

          <h3 className="font-bold text-ms dark:text-slate-300 text-base ">Update User info</h3>
        </CardHeader>
        <CardBody>
          <Avatar
          uid={user.id}
          url={avatar_url}
          size={150}
          onUpload={(url) => {
            setAvatarUrl(url)
            updateProfile({ fullname, username, website, avatar_url: url })
          }}
        />

        </CardBody>
        <CardFooter>

        </CardFooter>
      </Card>

      </div>
      <div>
         <div>
            <Spacer y={2} />
            <span className="text-sm font-mono font-light text-base">Email</span>
            <Spacer y={2} />
            <Input id="email" type="text" value={user?.email} disabled />
          </div>
          <div>
           <Spacer y={2} />
            <span className="text-sm font-mono font-light text-base">Full Name</span>
            <Spacer y={2} />
            <Input
              id="fullName"
              type="text"
              value={fullname || ''}
              onChange={(e) => setFullname(e.target.value)}
            />
          </div>
          <div>
           <Spacer y={2} />
            <span className="text-sm font-mono font-light text-base">Username</span>
            <Spacer y={2} />
            <Input
              id="username"
              type="text"
              value={username || ''}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
          <Spacer y={2} />
            <span className="text-sm font-mono font-light text-base">Website</span>
            <Spacer y={2} />
            <Input
              id="website"
              type="url"
              value={website || ''}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>

          <div>
          <Spacer y={2} />
            <Button
              color="success"
              variant="solid"
              onClick={() => updateProfile({ fullname, username, website, avatar_url })}
              disabled={loading}
            >
              {loading ? 'Loading ...' : 'Update'}
            </Button>
            <div>
            <form action="/auth/signout" method="post">
              <Button color="danger" variant="solid" type="submit">
                Sign out
              </Button>
            </form>
          </div>
          </div>
      </div>


    </div>

  );

}