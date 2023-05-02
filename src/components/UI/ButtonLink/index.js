import styles from "./index.module.scss";
import Link from "next/link";


const Index = ({ title, className, link }) => {
  return (
    <Link href={link} className={`${styles.btn} ${styles[className]}`}>
      {title}
    </Link>
  );
}

export default Index;
