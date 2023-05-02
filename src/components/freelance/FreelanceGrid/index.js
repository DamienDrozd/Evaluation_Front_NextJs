import styles from "./index.module.scss";
import FreelanceCard from "@/components/freelance/FreelanceCard";

const Index = ({ freelances }) => {
  return (
    <div className={styles.wrapper}>
      {
        freelances.length > 0 && freelances.map(freelance => (
          <FreelanceCard key={freelance.id} freelance={freelance}/>
        ))
      }
    </div>
  );
}

export default Index;
