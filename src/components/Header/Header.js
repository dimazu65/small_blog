import styles from './Header.module.css'
export const Header = () => {
    return (
        <header className={styles.mainHeader}>
            <nav>
                <a href="#first">Home</a>
                <a href="#second">About</a>
                <a href="#third">Contact</a>
            </nav>
        </header>
    )
}