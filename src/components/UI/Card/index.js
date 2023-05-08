import styles from "./index.module.scss";

const Index = ({ className, children }) => {
  return (
    <div className={`${styles.card} ${styles[className]}`}>
      <div className={styles.textDiv}>
        {children}
      </div>
    </div>
  );
}

export default Index;
