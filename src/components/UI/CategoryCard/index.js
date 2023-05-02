import styles from "./index.module.scss";

const Index = ({ type, title, handleClick, className, disabled, name, value }) => {
  return (
    <div className={`${styles.btn} ${styles[className]}`}>
      <p>{title}</p>
    </div>
  );
}

export default Index;
