import React from 'react';
import styles from './page9798.module.scss';
import Link from 'next/link';

const Page9798 = () => {
  return (
    <div className={styles.wrapper}>
       <img src="./magazine/1/97_98/image1.png" className={styles.image1} />
       <img src="./magazine/1/97_98/image4.png" className={styles.image4} />
       <img src="./magazine/1/97_98/image4.png" className={styles.image5} />
       <img src="./magazine/1/97_98/image3.png" className={styles.image3} />
       <img src="./magazine/1/97_98/image5.png" className={styles.image6} />
       <video className={styles.image2} muted loop autoPlay>
        <source src="./magazine/1/97_98/espa_skin.mp4" type="video/mp4" />
       </video>
       <Link href="www.instagram.com/pr.esc/"><a className={styles.text1}>
        Jessica Schott
        </a>
       </Link>
       <p className={styles.text2}>BBLUNDERR</p>
       <p className={styles.text3}>minecraft</p>
    </div>
  );
};

export default Page9798;
