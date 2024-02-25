import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '@/types/supabase'
import AccountForm from './account-form'
import AuthButton from "@/components/AuthButton"

export default async function Account() {
  const supabase = createServerComponentClient<Database>({ cookies })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className="container grid grid-cols-2 mx-2 gap-2">
      <div>
        <AccountForm user={user} />
        {/* <AuthButton /> */}

      </div>
      <div>
        Some info
      </div>

    </div>

 )
}

// import { redirect } from 'next/navigation'

// import { createClient } from '@/utils/supabase/server'

// export default async function PrivatePage() {
//   const supabase = createClient()

//   const { data, error } = await supabase.auth.getUser()
//   if (error || !data?.user) {
//     redirect('/')
//   }

//   return <p>Hello {data.user.email}</p>
// }