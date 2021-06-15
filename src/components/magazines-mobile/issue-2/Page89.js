import React from 'react'
import styles from './page89.module.scss'
import Link from 'next/link';

const Page89 = () => {
  return (
    <div className={styles.wrapper}>
       <img src="./magazine/2/images/97_98/image1.png" className={styles.image1} />
       <div className={styles.image2}></div>
       <video autoPlay muted loop className={styles.image3}>
        <source src="./magazine/2/images/97_98/Automata-Turntable.mp4" type="video/mp4" />
      </video>
       <Link href="https://twitter.com/rudeoolph"><a className={styles.text1}>
      Rudeolph
      </a>
      </Link>
      <p className={styles.text2}>
      Automata
      </p>
    </div>
  )
}

export default Page89