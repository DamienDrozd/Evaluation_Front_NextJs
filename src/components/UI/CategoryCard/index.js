import styles from "./index.module.scss";

const Index = ({ title, className}) => {
  return (
    <div className={`${styles.btn} ${styles[className]}`}>
      <p>{title}</p>
    </div>
  );
}

export default Index;
