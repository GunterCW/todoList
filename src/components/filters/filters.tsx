import styles from './filters.module.scss';

type TodoFilters = 'all' | 'active' | 'completed';

interface FiltersProps {
  onDelete: () => void;
  state: TodoFilters;
  setState: React.Dispatch<React.SetStateAction<TodoFilters>>
}

export const Filters = (props: FiltersProps) => {
  const { onDelete, state, setState } = props;
  return (

    <div className={styles.botButtonsSection}>
      <button className={styles.botButtons} type="button" onClick={() => setState('all')} disabled={state === 'all'}>All</button>
      <button className={styles.botButtons} type="button" onClick={() => setState('active')} disabled={state === 'active'}>Active</button>
      <button className={styles.botButtons} type="button" onClick={() => setState('completed')} disabled={state === 'completed'}>Completed</button>
      <button className={styles.botButtons} type="button" onClick={onDelete}>Clear Completed</button>
    </div>
  );
};
