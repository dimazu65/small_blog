import styles from './Footer.module.css'
export const Footer = ({year}) => {
    return (
    <footer className={styles.footer}>
     <span> Small Blog (React JS)- {year} </span>
    </footer>
    )
}