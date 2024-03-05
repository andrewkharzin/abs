import React, { useState, useEffect } from "react";
import { Database } from "@/types/supabase";
import { Enums } from "@/types/supabase";
import { Select, SelectItem } from "@nextui-org/react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Session, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Input, Button, Spacer } from "@nextui-org/react";
import { notes_cats } from "./data/note_category";
import { extractTagsFromContent } from "./nlp/extractTagsFromContent";

type Todos = Database["public"]["Tables"]["todos"]["Row"];

export default function TodoList({ session }: { session: Session }) {
  const supabase = createClientComponentClient();
  const [todos, setTodos] = useState<Todos[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("COMMON"); // State to hold selected category
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskContent, setNewTaskContent] = useState("");
  const [newTaskCategory, setNewTaskCategory] = useState("");
  const [errorText, setErrorText] = useState("");
  const [isOpen, setIsOpen] = useState(false); // State variable to track modal open/close
  const [selectedCategoryInternal, setSelectedCategoryInternal] =
    useState<string>("COMMON"); // State to hold selected category internally

  const [newTaskTags, setNewTaskTags] = useState<string[]>([]);
  // const [tags, setTags] = useState<string[]>([]);
  const handleCloseModal = () => {
    setIsOpen(false); // Close the modal
  };

  // Handler for content change
  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const content = e.target.value;
    setNewTaskContent(content); // Update content state
    const extractedTags = extractTagsFromContent(content); // Extract tags from content
    console.log("Extracted Tags:", extractedTags);
    setNewTaskTags(extractedTags); // Update tags state with extracted tags
  };

  // Handler for selecting categories
  const handleCategorySelect = (selectedItem: string) => {
    setSelectedCategory(selectedItem);
  };

  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     try {
  //       const { data, error } = await supabase.from("Enums").select("note_category")
  //       if (error) throw error;
  //       if (!data) throw new Error('No data returned from the query');
  //       setCategories(data.map((item: { note_category: Category[] }) => item.note_category));
  //       console.log("Cats loaded", note_category)
  //     } catch (error) {
  //       console.error('Error fetching categories:', error.message);
  //     }
  //   };

  //   fetchCategories();
  // }, [supabase]);

  const fetchData = async () => {
    try {
      const user = await supabase.auth.getUser();
      console.log(user);
      return user;
    } catch (error) {
      console.error("Error fetching user:", error.message);
      return null;
    }
  };

  const addTodo = async () => {
    try {
      const user = await fetchData();
      console.log("User data response", user);
      if (!user) {
        throw new Error("User data not found");
      }

      const title = newTaskTitle.trim();
      const content = newTaskContent.trim();
      const category = newTaskCategory.trim();
      const tags = newTaskTags.join(",");

      const { data: todo, error } = await supabase
        .from("todos")
        .insert({
          title,
          content,
          category: selectedCategoryInternal,
          tags,
          user_id: user.data.user?.id,
        })
        .single();

      if (error) {
        throw new Error(error.message);
      }

      setTodos([...todos, todo]);
      setNewTaskTitle("");
      setNewTaskContent("");
      setSelectedCategory("");
      setNewTaskCategory("");
      setNewTaskTags("");
      setErrorText("");
      handleCloseModal(); // Close the modal after adding the task
    } catch (error) {
      console.error("Error adding todo:", error.message);
      setErrorText("Error adding todo");
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      await supabase.from("todos").delete().eq("id", id).single();
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error.message);
    }
  };

  return (
    <div className="container">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addTodo();
        }}
      >
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
            onChange={(e) => {
              setNewTaskContent(e.target.value); // Execute existing function
              handleContentChange(e); // Execute handleContentChange
            }}
            // onChange={(e) =>
            //   setNewTaskContent(e.target.value),
            //   handleContentChange(e)
            // }
            variant="outlined"
          />
        </div>
        <div>
          <Spacer y={2} />

          <Select
            label="Categories"
            placeholder="Select category"
            selectionMode="single"
            // value={selectedCategory}
            value={selectedCategoryInternal} // Use internal state here
            className=""
            onChange={(e) => {
              setSelectedCategoryInternal(e.target.value); // Update internal state
              setSelectedCategory(e.target.value); // Update external state
            }}
          >
            {notes_cats.map((notes_cat) => (
              <SelectItem key={notes_cat.value} value={notes_cat.value}>
                {notes_cat.label}
              </SelectItem>
            ))}
          </Select>
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
        <Button color="success" type="submit">
          Add Task
        </Button>
        <Spacer y={4} />
      </form>
      {errorText && <p>{errorText}</p>}
      <ul>
        {todos.map(
          (todo) =>
            todo && (
              <li key={todo.id}>
                <div>{todo.id}</div>
                {/* Render other todo properties here */}
              </li>
            )
        )}
      </ul>
    </div>
  );
}
