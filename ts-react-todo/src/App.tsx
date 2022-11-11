import React, { useState } from "react";
import InputField from "./components/InputFields/InputField";
import TodoList from "./components/TodoList/TodoList";
import { Todo } from "./models";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import "./App.css";

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todoS, setTodoS] = useState<Todo[]>([]);
  const [completedTodoS, setCompletedTodoS] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault(); //to stop refreshing on submit

    if (todo) {
      setTodoS([...todoS, { id: Date.now(), todo, isDone: false }]);
      setTodo("");
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let add,
      active = todoS,
      complete = completedTodoS;

    // Source
    if (source.droppableId === "TodosList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    // Destination
    if (destination.droppableId === "TodosList") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setCompletedTodoS(complete);
    setTodoS(active);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">Tasks On The Shore</span>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList
          todoS={todoS}
          setTodoS={setTodoS}
          completedTodoS={completedTodoS}
          setCompletedTodoS={setCompletedTodoS}
        />
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
      </div>
    </DragDropContext>
  );
};

export default App;
