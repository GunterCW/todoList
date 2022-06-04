import styles from './todo-item.module.scss';
import CloseButton from '../image/closeButton';

interface Todo {
  value: string;
  completed: boolean;
}

interface TodoItemProps {
  item: Todo;
  onToggle: () => void;
  onDelete: () => void;

}

export const TodoItem = (props: TodoItemProps) => {
  const { item, onToggle, onDelete } = props;
  return (
    <div className={styles.todoTask}>
      <input type="checkbox" name="" id="" checked={item.completed} onChange={onToggle} />
      <span className={item.completed ? styles.textLine : ''}>{item.value}</span>
      <button type="button" onClick={onDelete}>
        <CloseButton className={styles.closeButton} />
      </button>
    </div>
  );
};
