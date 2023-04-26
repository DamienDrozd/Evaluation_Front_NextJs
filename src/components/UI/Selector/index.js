import styles from "./index.module.scss";

const Index = ({ label, name, options, onChange }) => {
    if (options == null || options.length == 0 || options == undefined || Array.isArray(options) == false) {
        return null;
    }
    return (
        <div className={styles.wrapper}>
        {
            label && (
            <label>{label}</label>
            )
        }
            <select 
                name={name}
                onChange={onChange}
            >
                {options.map((option) => {
                    return <option key={option.id} value={JSON.stringify(option)} disabled={option.disabled}>{option.name}</option>
                })}
            </select> 
            
        </div>
    );
}

export default Index;
