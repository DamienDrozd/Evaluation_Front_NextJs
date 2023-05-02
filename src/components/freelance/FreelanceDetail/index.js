import styles from "./index.module.scss";
import CategoryCard from "@/components/UI/CategoryCard"

const Index = ({ freelance }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <img src={freelance.thumbnail} alt={freelance.name} />
        <div className={styles.textDiv}>
          <h3>{freelance.firstName} {freelance.lastName}</h3>
          <p>{freelance?.city}</p>
          <p>{freelance?.country}</p>
          <div className={styles.priceDiv}>
            <p>{freelance?.freelance?.price} €</p>
          </div>
          <div className={styles.experienceDiv}>
            <p>{freelance?.freelance?.experience_years}</p>
          </div>
          <div className={styles.jobDiv}>
            {freelance?.freelance?.jobs?.map((job, index) => (
              <CategoryCard key={index} title={job.name} className="category__job"/>
            ))}
          </div>
          <div className={styles.skillDiv}>
            {freelance?.freelance?.skills?.map((skill, index) => (
              <CategoryCard key={index} title={skill.name} className="category__skill"/>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
