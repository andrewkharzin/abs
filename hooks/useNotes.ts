import { createClient } from "@/utils/supabase/client"
import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";
import { useState } from "react"
import { getNoteById } from "../queries/notes/getNoteById"


export default function NotePage({ params }: {params: {id: number}}) {
   const supabase = createClient()

   const {data: note, isLoading, isError } = useQuery(getNoteById(supabase, params.id))

   return (
    note
   )
}