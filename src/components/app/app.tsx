import React, { useState } from 'react';

import styles from './app.module.scss';

interface Todo{
  value: string;
  completed: boolean;
}
type TodoFilters = 'all' | 'active' | 'completed';
export const App = () => {
  const [text, setText] = React.useState('');
  const [todoList, setTodoList] = React.useState<Todo[]>([]);
  const [filter, setFilter] = React.useState<TodoFilters>('all');

  const addTodo = () => {
    if (text.trim() === '') {
      return;
    }

    setTodoList([{ value: text, completed: false }, ...todoList]);
  };

  const addText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const createTask = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    addTodo();

    setText('');
  };
  const deleteTodo = (i: number) => {
    setTodoList(todoList.filter((value : Todo, index :number) => index !== i));
  };

  const checkboxCheck = (i: number) => {
    const newTodo = todoList.map((todo, index) => {
      if (index === i) {
        return {
          value: todo.value,
          completed: !todo.completed,
        };
      }
      return todo;
    });
    setTodoList(newTodo);
    console.log(todoList[i]);
  };
  const deleteCompleted = () => {
    const filteredList = todoList.filter((todo) => {
      if (todo.completed === true) {
        return false;
      }
      return true;
    });
    setTodoList(filteredList);
  };
  const filteredTodos = todoList.filter((todo) => {
    if (filter === 'active') {
      return todo.completed === false;
    }
    if (filter === 'completed') {
      return todo.completed === true;
    }
    return true;
  });

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <span> To Do</span>
        <form onSubmit={createTask}>
          <input className="" type="text" placeholder="Write Task" value={text} onChange={addText} />
          <button type="submit"> Add</button>
        </form>
        <div>
          {filteredTodos.map((item, i) => {
            return (
            // eslint-disable-next-line react/no-array-index-key
              <div key={i}>
                <input type="checkbox" name="" id="" checked={item.completed} onChange={() => checkboxCheck(i)} />
                <span>{item.value}</span>
                <button type="button" onClick={() => deleteTodo(i)}> delete</button>
              </div>
            );
          })}

        </div>
        <div>
          <div>
            <div>
              {filteredTodos.length} items left
            </div>
            <button type="button" onClick={() => setFilter('all')} disabled={filter === 'all'}> All</button>
            <button type="button" onClick={() => setFilter('active')} disabled={filter === 'active'}> Active</button>
            <button type="button" onClick={() => setFilter('completed')} disabled={filter === 'completed'}> Completed</button>
            <button type="button" onClick={deleteCompleted}> Clear Completed</button>
          </div>
        </div>
      </div>
    </div>
  );
};
