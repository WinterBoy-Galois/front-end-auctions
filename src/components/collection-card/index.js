import Link from 'next/link';
import React from 'react';
import CollectionInfoCard from './collection-info-card';
import styles from './styles.module.scss';

const CollectionCard = ({ collection }) => {
  const collectionNames = [
    'GDN DAO Endowment Auction',
    'Haute Couture',
    'Crazy Shoes',
    'DeFi Fashion',
    'Wild Web3',
    'Web3 Digi Models',
    'Jewelry and Accessories',
    'International',
    'Fashion x Art',
  ]
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.title}>{collectionNames[parseInt(collection?.id) - 3]}</div>
        <div className={styles.imageWrapper}>
          <div className={styles.image}>
            <video autoPlay muted loop>
              <source
                src={collection?.animation.replace('gateway.pinata', 'digitalax.mypinata')}
                type="video/mp4"
              />
            </video>
          </div>
        </div>
        <CollectionInfoCard collection={collection} />
      </div>
    </>
  );
};

export default CollectionCard;
