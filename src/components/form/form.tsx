import React from 'react';
import styles from './form.module.scss';

interface FormProps{
  onCreate: (text: string) => void;

}

export const Form = (props: FormProps) => {
  const { onCreate } = props;
  const [text, setText] = React.useState('');

  const addText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const createTask = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onCreate(text);
    setText('');
  };
  return (
    <form className={styles.form} onSubmit={createTask}>
      <input className={styles.entryField} type="text" placeholder="Write Task" value={text} onChange={addText} />
      <button type="submit">Add</button>
    </form>
  );
};
