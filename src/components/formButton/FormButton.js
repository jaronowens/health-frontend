import styles from './FormButton.module.css';

const FormButton = (props) => {

    const {children} = props;

    return (
        <button className={styles.create}>{children}</button>
    )
}
export default FormButton;