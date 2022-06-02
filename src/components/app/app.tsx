import React from 'react';

import styles from './app.module.scss';

interface Todo {
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
      <h1 className={styles.title}>To Do</h1>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={createTask}>
          <input className={styles.entryField} type="text" placeholder="Write Task" value={text} onChange={addText} />
          <button type="submit">Add</button>
        </form>
        <div className={styles.todoList}>
          {filteredTodos.map((item, i) => {
            return (

              // eslint-disable-next-line react/no-array-index-key
              <div className={styles.todoTask} key={i}>
                <input type="checkbox" name="" id="" checked={item.completed} onChange={() => checkboxCheck(i)} />
                <span className={item.completed ? styles.textLine : ''}>{item.value}</span>
                <button type="button" onClick={() => deleteTodo(i)}>X</button>
              </div>
            );
          })}
          <footer className={styles.botBar}>
            <div className={styles.todosCounter}>
              {filteredTodos.length} items left
            </div>
            <div className={styles.botButtonsSection}>
              <button className={styles.botButtons} type="button" onClick={() => setFilter('all')} disabled={filter === 'all'}>All</button>
              <button className={styles.botButtons} type="button" onClick={() => setFilter('active')} disabled={filter === 'active'}>Active</button>
              <button className={styles.botButtons} type="button" onClick={() => setFilter('completed')} disabled={filter === 'completed'}>Completed</button>
              <button className={styles.botButtons} type="button" onClick={deleteCompleted}>Clear Completed</button>
            </div>
          </footer>

        </div>
      </div>
    </div>
  );
};
