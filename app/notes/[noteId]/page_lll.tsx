import { createClient } from "@/utils/supabase/client"
import { notFound } from "next/navigation"

export  async function generateStaticParams(){
  const supabase = createClient()
  const { data: notes} = await supabase
     .from("todos").select("id")

     return notes?.map(({ id }) => ({
      id,
     }))


}

export default async function Note({ params: { id } }: {params: { id: string }}) {
  const supabase = createClient()
  const { data: note} = await supabase
     .from("todos").select().match({ id }).single()

  if (!note) {
    notFound()
  }

  return (
    <h2>{note.title}</h2>
  )

}

