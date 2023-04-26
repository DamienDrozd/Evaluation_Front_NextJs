import styles from "./index.module.scss";

const Index = ({type, message}) => {
  if (typeof message === "string") {
    return (
      <div className={`${styles.notification} ${styles[type]}`}>
        <p>{message}</p>
      </div>
    );
  } 
}

export default Index;
