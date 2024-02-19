"use client";

import { useRouter } from "next/navigation";

export default function Todo({ todo }: { todo: any }) {
  const router = useRouter();

  const markAsComplete = async () => {
    await fetch(`http://localhost:3000/notes`, {
      method: "put",
      body: JSON.stringify({ id: todo.id }),
    });
    router.refresh();
  };

  return <button onClick={markAsComplete}>{todo.title}</button>;
}