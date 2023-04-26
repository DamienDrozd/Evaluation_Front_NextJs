import styles from "./index.module.scss";

const Index = ({ type, title, handleClick, className, disabled, name, value }) => {
  return (
    <button value={value} type={type} name={name} onClick={handleClick} disabled={disabled ? true : false} className={`${styles.btn} ${styles[className]}`}>
      {title}
    </button>
  );
}

export default Index;
