import styles from './Submit.module.css';

const Submit = (props) => {
    const {name, value} = props;

    return(
        <input className={styles.submit} type="submit" name={name} value={value} />
    );

}
export default Submit;