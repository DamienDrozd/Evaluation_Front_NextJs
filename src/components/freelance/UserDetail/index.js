import styles from "./index.module.scss";
import CategoryCard from "@/components/UI/CategoryCard"

const Index = ({ freelance }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <img src={freelance.thumbnail} alt={freelance.name} />
        <div className={styles.textDiv}>
          <h3>{freelance.firstName} {freelance.lastName}</h3>
          <p>{freelance?.country}</p>
          <div className={styles.descriptionDiv}>
            <div className={styles.priceDiv}>
              <p>Tarif indicatif : </p>
              <p>{freelance?.freelance?.price}€ / jour</p>
            </div>
            <div className={styles.experienceDiv}>
              <p>Expérience : </p>
              <p>{freelance?.freelance?.experience_years} ans </p>
            </div>
          </div>
          
        </div>
      </div>
      <div className={styles.secondary_content}>
        <div className={styles.BoxDiv}>
          <h4>Localisation et déplacement</h4>
          <p>{freelance?.city}</p>
          <p>{freelance?.address}</p>
          <p>{freelance?.postCode}</p>
          <h4>Contact : </h4>
          <p>{freelance?.email}</p>
          <p>{freelance?.phone}</p>
        </div>
        <div className={styles.BoxDiv}>
          <h4>Compétences</h4>
          <div className={styles.competences}>
            <div className={styles.jobDiv}> 
              Liste des hard skills :
              {freelance?.freelance?.jobs?.map((job, index) => (
                <CategoryCard key={index} title={job.name} className="category__job"/>
              ))}
            </div>
            <div className={styles.separationDiv}></div>
            <div className={styles.skillDiv}>
              Liste des soft skills :
              {freelance?.freelance?.skills?.map((skill, index) => (
                <CategoryCard key={index} title={skill.name} className="category__skill"/>
              ))} 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
