import styles from './FormButton.module.css';

/**
 * @name FormButton
 * @returns a stylized button for linking to create/edit forms
 */
const FormButton = (props) => {

    const {children} = props;

    return (
        <button className={styles.create}>{children}</button>
    )
}
export default FormButton;