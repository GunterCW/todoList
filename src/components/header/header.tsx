import styles from './header.module.scss';

interface HeaderProps{
  titleText: string
}

export const Header = (props: HeaderProps) => {
  const { titleText } = props;
  return (
    <header className={styles.title}>{titleText}</header>);
};
