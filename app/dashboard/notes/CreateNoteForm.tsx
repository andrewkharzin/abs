import React, { useState, useEffect } from 'react';
import { Database } from "@/types/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Session, useSupabaseClient } from '@supabase/auth-helpers-react';
import { Input, Button, Spacer } from "@nextui-org/react";


type Todos = Database['public']['Tables']['todos']['Row']

type Todo = {
  id: number;
  title: string;
  content: string;
  category: string;
  tags: string;
  user_id: string;
}

export default function TodoList({ session }: { session: Session }) {
  const supabase = createClientComponentClient()
  const [todos, setTodos] = useState<Todos[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskContent, setNewTaskContent] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState('');
  const [newTaskTags, setNewTaskTags] = useState('');
  const [errorText, setErrorText] = useState('');

  const user = session?.user

  const addTodo = async () => {
    const title = newTaskTitle.trim();
    const content = newTaskContent.trim();
    const category = newTaskCategory.trim();
    const tags = newTaskTags.trim();


    const { data: todo, error } = await supabase.from('todos').insert({ title, content, category, tags, user_id: user?.id }).single();

    if (error) {
      setErrorText(error.message);
    } else {
      setTodos([...todos, todo]);
      setNewTaskTitle('');
      setNewTaskContent('');
      setNewTaskCategory('');
      setNewTaskTags('');
      setErrorText('');
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      await supabase
        .from('todos')
        .delete()
        .eq('id', id)
        .single();
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error.message);
    }
  };

  return (
    <div className="container">
      <form onSubmit={(e) => {
        e.preventDefault();
        addTodo();
      }}>
        <div>
          <Spacer y={2} />
          <Input
            type="text"
            id="title"
            value={newTaskTitle}
            label="Title"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            variant="outlined"
          />
        </div>
        <div>
          <Spacer y={2} />
          <Input
            type="text"
            id="content"
            value={newTaskContent}
            label="Content"
            onChange={(e) => setNewTaskContent(e.target.value)}
            variant="outlined"
          />
        </div>
        <div>
          <Spacer y={2} />
          <Input
            type="text"
            id="category"
            value={newTaskCategory}
            label="Category"
            onChange={(e) => setNewTaskCategory(e.target.value)}
            variant="outlined"
          />
        </div>
        <div>
          <Spacer y={2} />
          <Input
            type="text"
            id="tags"
            value={newTaskTags}
            label="Tags"
            onChange={(e) => setNewTaskTags(e.target.value)}
            variant="outlined"
          />
        </div>
        <Spacer y={4} />
        <Button color="success" type="submit">Add Task</Button>
      </form>
      {errorText && <p>{errorText}</p>}
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <div>{todo.title}</div>
            <Button onClick={() => deleteTodo(todo.id)}>Delete</Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
