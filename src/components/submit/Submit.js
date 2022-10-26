import styles from './Submit.module.css';

/**
 * @name Submit
 * @description a custom-formatted submit button for forms.
 * @returns component
 */
const Submit = (props) => {
    const { name, value } = props;

    return (
        <input className={styles.submit} type="submit" name={name} value={value} />
    );

}
export default Submit;