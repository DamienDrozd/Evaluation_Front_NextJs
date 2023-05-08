import styles from "./index.module.scss";
import CategoryCard from "@/components/UI/CategoryCard"

const Index = ({ user }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <img src={user?.thumbnail} alt={user?.name} />
        <div className={styles.textDiv}>
          <h3>{user?.firstName} {user?.lastName}</h3>
          <p>{user?.country}</p>
          {user?.freelance != null && (
            <div className={styles.descriptionDiv}>
              <div className={styles.priceDiv}>
                <p>Tarif indicatif : </p>
                <p>{user?.freelance?.price}€ / jour</p>
              </div>
              <div className={styles.experienceDiv}>
                <p>Expérience : </p>
                <p>{user?.freelance?.experience_years} ans </p>
              </div>
            </div>
          )}
          {user?.company != null && (
            <div className={styles.descriptionDiv}>
              <div className={styles.priceDiv}>
                <p>Company : </p>
                <p>{user?.company?.name} </p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={styles.secondary_content}>
        <div className={styles.BoxDiv}>
          <h4>Localisation et déplacement</h4>
          <p>{user?.address}</p>
          <p>{user?.postcode}</p>
          <p>{user?.city}</p>
          <h4>Contact : </h4>
          <p>{user?.email}</p>
          <p>{user?.phone}</p>
        </div>
        {user?.freelance != null && (
          <div className={styles.BoxDiv}>
            <h4>Compétences</h4>
            <div className={styles.competences}>
              <div className={styles.jobDiv}> 
                Liste des hard skills :
                {user?.freelance?.jobs?.map((job, index) => (
                  <CategoryCard key={index} title={job.name} className="category__job"/>
                ))}
              </div>
              <div className={styles.separationDiv}></div>
              <div className={styles.skillDiv}>
                Liste des soft skills :
                {user?.freelance?.skills?.map((skill, index) => (
                  <CategoryCard key={index} title={skill.name} className="category__skill"/>
                ))} 
              </div>
            </div>
          </div>
        )}

        {user?.company != null && (
          <div className={styles.BoxDiv}>
            <h4> {user?.company.name}</h4>
            <div className={styles.company}>
              <div className={styles.company__info}>
                <h5>Informations légales</h5>
                <p>status : {user?.company.status}</p>
                <p>siret : {user?.company.siret}</p>
              </div>
              <div className={styles.company__separator}></div>  
              <div className={styles.company__address}>
                <h5>Adresse</h5>
                <p>address : {user?.company.address}</p>
                <p>city : {user?.company.city}</p>
                <p>postcode : {user?.company.postcode}</p> 
              </div>
            </div>
          </div>
        )}
        
      </div>
    </div>
  );
}

export default Index;
