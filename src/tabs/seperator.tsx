import styles from './styles.module.css';

interface SeparatorProps {
  isActive: boolean;
}

export default function Separator(props: SeparatorProps) {
  const { isActive } = props;

  return (
    <div className={styles.tab__separator}>
      <div
        className={styles[`separator--${isActive ? 'inactive' : 'active'}`]}
      />
    </div>
  );
}
