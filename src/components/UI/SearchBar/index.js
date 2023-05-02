import React from 'react';
import styles from "./index.module.scss";
import Input from "@/components/UI/Input";

const Index = ({submit, title, setSearchString}) => {


    return (
        <div className={styles.search}>
            <form onSubmit={(e) => submit(e)}>
                <Input type="text" name="search" placeholder={title} onChange={(e) => setSearchString(e.target.value)}/>
            </form> 
        </div>
    );
}

export default Index;
