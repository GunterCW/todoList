import React, { useEffect } from 'react';

import styles from './app.module.scss';

import { TodoItem } from '../todo-item';
import { Header } from '../header';
import { Form } from '../form';

interface Todo {
  value: string;
  completed: boolean;
}

type TodoFilters = 'all' | 'active' | 'completed';
const parsedList = () => {
  const savedList: string | null = window.localStorage.getItem('savedList');
  if (savedList === null) {
    return [];
  }
  return JSON.parse(savedList);
};

export const App = () => {
  const [todoList, setTodoList] = React.useState<Todo[]>(parsedList);
  const [filter, setFilter] = React.useState<TodoFilters>('all');

  useEffect(() => {
    window.localStorage.setItem('savedList', JSON.stringify(todoList));
  }, [todoList]);

  const addTodo = (text: string) => {
    if (text.trim() === '') {
      return;
    }
    setTodoList([{ value: text, completed: false }, ...todoList]);
  };

  const deleteTodo = (i: number) => {
    setTodoList(todoList.filter((value, index) => index !== i));
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
  };

  const deleteCompleted = () => {
    const filteredList = todoList.filter((todo) => {
      return !todo.completed;
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
      <Header titleText="To Do" />
      <div className={styles.container}>
        <Form onCreate={addTodo} />
        <div className={styles.todoList}>
          <div className={styles.buttonsBar}>
            <div className={styles.todosCounter}>
              {filteredTodos.length} items left
            </div>
            <div className={styles.botButtonsSection}>
              <button className={styles.botButtons} type="button" onClick={() => setFilter('all')} disabled={filter === 'all'}>All</button>
              <button className={styles.botButtons} type="button" onClick={() => setFilter('active')} disabled={filter === 'active'}>Active</button>
              <button className={styles.botButtons} type="button" onClick={() => setFilter('completed')} disabled={filter === 'completed'}>Completed</button>
              <button className={styles.botButtons} type="button" onClick={deleteCompleted}>Clear Completed</button>
            </div>
          </div>
          {filteredTodos.map((item, i) => {
            return (
              // eslint-disable-next-line react/no-array-index-key
              <TodoItem item={item} onToggle={() => checkboxCheck(i)} onDelete={() => deleteTodo(i)} key={i} />
            );
          })}
        </div>
      </div>
    </div>
  );
};
