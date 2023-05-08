import styles from "./index.module.scss";

const Index = ({title, image}) => {
    return (
        <div className={styles.banner}>
            <img src={image} alt="banner"/>
            <h1>{title}</h1>
        </div>
    );
}

export default Index;
