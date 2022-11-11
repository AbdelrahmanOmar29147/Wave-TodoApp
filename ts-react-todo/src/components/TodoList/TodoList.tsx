import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { Todo } from "../../models";
import SingleTodo from "../SingleTodo/SingleTodo";
import "./todolist.scss";

interface Props {
  todoS: Todo[];
  setTodoS: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTodoS: Todo[];
  setCompletedTodoS: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({
  todoS,
  setTodoS,
  completedTodoS,
  setCompletedTodoS,
}: Props) => {
  return (
    <div className="container">
      <Droppable droppableId="TodosList">
        {(provided, snapshot) => (
          <div
            className={`todos active ${snapshot.isDraggingOver ? "dragactive" : ""}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading">Active Tasks</span>
            {todoS.map((todo, index) => (
              <SingleTodo
                index={index}
                todo={todo}
                key={todo.id}
                todoS={todoS}
                setTodoS={setTodoS}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="TodosRemove">
        {(provided, snapshot) => (
          <div
            className={`todos remove ${ 
              snapshot.isDraggingOver ? "dragcomplete" : ""
            }`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading">Completed Tasks</span>
            {completedTodoS.map((todo, index) => (
              <SingleTodo
                todo={todo}
                key={todo.id}
                todoS={completedTodoS}
                setTodoS={setCompletedTodoS}
                index={index}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TodoList;
