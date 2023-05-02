import styles from "./index.module.scss";

const Index = ({title, image}) => {
    return (
        <div className={styles.banner}>
            <h1>{title}</h1>
            <img src={image} alt="banner"/>
        </div>
    );
}

export default Index;
