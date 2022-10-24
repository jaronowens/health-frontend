import styles from './Input.module.css';

/**
 * Renders an input with a label, as well as styling for errors
 * @param {*} props - type, name, label, obj (the object to be rendered), onChange
 * @returns an Input with the given props
 */
const Input = (props) => {
    const { type, name, label, obj, onChange } = props;

    const errorStyle = obj.error ? styles.error : styles.noerror;

    return (
        <div>
            <label htmlFor={name}>{label}</label>
            {obj.error && <div className={styles.errMsg}>{obj.errorMsg}</div>}
            <input type={type} name={name} value={obj.value} onChange={onChange} className={errorStyle} />
        </div>
    );
}

export default Input;