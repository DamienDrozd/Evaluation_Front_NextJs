import styles from "./index.module.scss";
import ButtonLink from "@/components/UI/ButtonLink";
import CategoryCard from "@/components/UI/CategoryCard"

const Index = ({ freelance }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <img src={freelance.thumbnail} alt={freelance.name} />
        <div className={styles.textDiv}>
          <h3>{freelance.firstName} {freelance.lastName}</h3>
          <p>{freelance?.freelance?.price} €</p>
          <div className={styles.jobDiv}>
            {freelance?.freelance?.jobs?.map((job, index) => (
              <CategoryCard key={index} title={job.name} className="category__job"/>
            ))}
          </div>
          <div className={styles.centerDiv}>
            <ButtonLink link={`/freelance/${freelance._id}`} className="btn__primary" title="Voir le profil" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
