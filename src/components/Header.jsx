import React from 'react'
import styles from './Header.module.css'

export const Header = () => {
  return (
    <div className={styles.headerMain}>

        <header className={styles.headerContainer}>
        <img src="./images/troll-face.png" alt="troll-face"  width={55} height={45}/>
        <h2>Meme Generator</h2>
        </header>

    </div>
  )
}
