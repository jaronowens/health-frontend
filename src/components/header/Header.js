import styles from "./Header.module.css";

/**
 * Renders the header for the site
 * @returns a header
 */
const Header = (props) => {
    const { align, children } = props;

    const alignment = align === 'right' ? { textAlign: 'right', paddingRight: '15px' } : { paddingLeft: '15px' };

    return (
        <div className={styles.topnav} style={alignment}>
            <h1 className={styles.title}>{children}</h1>
        </div>
    );
}
export default Header;