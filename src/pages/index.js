import React, { useEffect, useState } from 'react';
import { Router } from 'next/router';
import Head from 'next/head';
import { getCollectionGroups, getDigitalaxGarmentCollections, getDigitalaxMarketplaceOffers, getDigitalaxMarketplaceV2Offers } from '@services/api/apiService';
import styles from './styles.module.scss';
import { useSelector } from 'react-redux';
import { getChainId } from '@selectors/global.selectors';
import Container from '@components/container';
import Link from 'next/link';
import ProductInfoCard from '@components/product-info-card';

const LandingPage = () => {
  const chainId = useSelector(getChainId);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    import('react-facebook-pixel')
      .then((x) => x.default)
      .then((ReactPixel) => {
        ReactPixel.init('485692459240447');
        ReactPixel.pageView();

        Router.events.on('routeChangeComplete', () => {
          ReactPixel.pageView();
        });
      });
  }, []);

  useEffect(() => {
    const fetchCollectionGroups = async () => {
      const { digitalaxCollectionGroups } = await getCollectionGroups(chainId)
      const { digitalaxGarmentCollections } = await getDigitalaxGarmentCollections(chainId)
      const { digitalaxMarketplaceOffers } = await getDigitalaxMarketplaceOffers(chainId);
      const { digitalaxMarketplaceV2Offers } = await getDigitalaxMarketplaceV2Offers(chainId);

      const prods = [];

      digitalaxCollectionGroups.forEach((collectionGroup) => {
        if (collectionGroup.auctions.length > 1 || collectionGroup.auctions.length === 1 && collectionGroup.auctions[0].id !== '0') {
          collectionGroup.auctions.forEach((auction) => {
            prods.push({
              id: auction.id,
              designer: auction.designer,
              topBid: auction.topBid,
              garment: auction.garment,
              rarity: 'Exclusive',
              auction: true,
              version: 2,
            });
          });
        }
        if (collectionGroup.collections.length > 1 || collectionGroup.collections.length === 1 && collectionGroup.collections[0].id !== '0') {
          collectionGroup.collections.forEach((collection) => {
            const offer = digitalaxMarketplaceV2Offers.find((offer) => offer.id === collection.id);
            prods.push({
              id: collection.id,
              designer: collection.designer,
              rarity: collection.rarity,
              garment: collection.garments[0],
              primarySalePrice: offer ? offer.primarySalePrice : 0,
              auction: false,
              version: 2,
            });
          });
        }
        if (collectionGroup.digiBundle.length > 1 || collectionGroup.digiBundle.length === 1 && collectionGroup.digiBundle[0].id !== '0') {
          collectionGroup.digiBundle.forEach((collection) => {
            const offer = digitalaxMarketplaceV2Offers.find((offer) => offer.id === collection.id);
            prods.push({
              id: collection.id,
              designer: collection.designer,
              primarySalePrice: offer ? offer.primarySalePrice : 0,
              rarity: collection.rarity,
              garment: collection.garments[0],
              auction: false,
              version: 2,
            });
          });
        }
      });

      digitalaxGarmentCollections.forEach((collection) => {
        const offer = digitalaxMarketplaceOffers.find((offer) => offer.id === collection.id);
        prods.push({
          id: collection.id,
          garment: collection.garments[0],
          primarySalePrice: offer ? offer.primarySalePrice : 0,
          rarity: collection.rarity,
          auction: false,
          version: 1,
        });
      });

      setProducts(prods);
    };
    fetchCollectionGroups();
  }, []);

  const structuredData = {
    '@context': 'http://schema.org',
    '@type': 'Skins Landing page',
    title: 'Digitalax - Web3 Fashion Economy',
    description:
      'Take your digital fashion skins to the next level: directly into indie games & mods, where players from amateur to pro can start to earn a livelihood through play, without sacrificing our love of the game. ESPA is the first casual esports platform, with direct integration with DIGITALAX NFT skins on Matic Network. ',
  };

  return (
    <div className={styles.wrapper}>
      <Head>
        <meta
          name="description"
          content="Take your digital fashion skins to the next level: directly into indie games & mods, where players from amateur to pro can start to earn a livelihood through play, without sacrificing our love of the game. ESPA is the first casual esports platform, with direct integration with DIGITALAX NFT skins on Matic Network. "
        />
        <meta property="og:title" content="Digitalax - Web3 Fashion Economy" />
        <meta
          property="og:description"
          content="Take your digital fashion skins to the next level: directly into indie games & mods, where players from amateur to pro can start to earn a livelihood through play, without sacrificing our love of the game. ESPA is the first casual esports platform, with direct integration with DIGITALAX NFT skins on Matic Network. "
        />
        <meta property="og:url" content="https://marketplace.digitalax.xyz" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@ESPA4play" />
        <meta name="twitter:title" content="Skins Landing page" />
        <meta
          name="twitter:description"
          content="Take your digital fashion skins to the next level: directly into indie games & mods, where players from amateur to pro can start to earn a livelihood through play, without sacrificing our love of the game. ESPA is the first casual esports platform, with direct integration with DIGITALAX NFT skins on Matic Network. "
        />
        <script src="https://cdn.rawgit.com/progers/pathseg/master/pathseg.js"></script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      <section className={styles.homeHeroSection}>
        <img src="/images/metaverse/web3fashion.png" className={styles.heroLogo} />

        <Link href="/collections">
          <a className={styles.heroSectionLink}>
            View All Collections >
          </a>
        </Link>
      </section>

      <Container>
        <section className={styles.collectionsWrapper}>
          {products.map((prod) => {
            return (
              <>
                <ProductInfoCard
                  product={prod}
                  price={prod.auction ? prod.topBid : prod.primarySalePrice}
                  v1={prod.version === 1}
                  showRarity
                  isAuction={prod.auction}
                />
              </>
            )
          })}
        </section>
      </Container>
    </div>
  );
};

export default LandingPage;
