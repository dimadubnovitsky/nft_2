import { useState } from 'react';
import styles from './styles/ConnectPage.module.scss';
import ButtonBack from '../../../component/ButtonBack';
import logo from '../../../images/logo.png';
import logoCoinbase from '../../../images/logo_coinbase_wallet.png';
import logoBitski from '../../../images/logo_bitski_wallet.png';
import logoMetamask from '../../../images/logo_metamask_wallet.png';
import Card from './Card/Card';
import { Link } from 'react-router-dom';
import Loader from '../../../component/Loader';

const ConnectPage = ({ isAuthorized, onConnect, loading }) => {
  const [activeCard, setActiveCard] = useState({});
  const [hoverCard, setHoverCard] = useState({});

  const cards = [
    {
      name: 'Coinbase',
      logo: logoCoinbase,
      description:
        'A simple-to-use wallet that works on both mobile and through a browser extantion',
    },
    {
      name: 'Bitski',
      logo: logoBitski,
      description:
        'A simple-to-use wallet that works on both mobile and through a browser extantion',
    },
    {
      name: 'Metamask',
      logo: logoMetamask,
      description:
        'A simple-to-use wallet that works on both mobile and through a browser extantion',
    },
  ];

  const onCardClick = (card) => {
    if (activeCard.name === card.name) {
      setActiveCard({});
    } else {
      setActiveCard(card);
    }
  };

  return (
    <div className={styles.wrapper}>
      {!loading && (
        <div className={styles.buttonBack}>
          <ButtonBack link="/" />
        </div>
      )}
      {!loading && !isAuthorized && (
        <div className={styles.content}>
          <div className={styles.logo}>
            <img src={logo} alt="Logo" />
          </div>
          <div className={styles.description}>
            Please connect your wallet to purchase or manage your NFTs
          </div>
          <div className={styles.cards}>
            {cards.map((card) => (
              <div
                className={styles.card}
                onClick={() => onCardClick(card)}
                onMouseEnter={() => setHoverCard(card)}
                onMouseLeave={() => setHoverCard({})}
              >
                <Card
                  logo={card.logo}
                  description={card.description}
                  active={activeCard.name === card.name}
                />
              </div>
            ))}
          </div>
          {(hoverCard.name || activeCard.name) && (
            <div className={styles.infoText}>
              Your wallet, powered by{' '}
              <span className={styles.name}>
                {hoverCard.name || activeCard.name}
              </span>
              , will be used to securely store your digital goods.
            </div>
          )}
          {activeCard.name && (
            <div className={styles.buttonConnect} onClick={onConnect}>
              Connect Wallet
            </div>
          )}
        </div>
      )}
      {loading && activeCard && (
        <div className={styles.loading}>
          <div className={styles.loader}>
            <Loader wrapper={false} />
          </div>
          <div className={styles.loadingText}>
            Connecting your {activeCard.name} wallet...
          </div>
        </div>
      )}
      {isAuthorized && (
        <div className={styles.success}>
          <div className={styles.successImage}>
            <img src={activeCard.logo} alt="Success" />
          </div>
          <div className={styles.successText}>Wallet connected!</div>
          <Link to="/">
            <div className={styles.buttonDone}>Done</div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ConnectPage;
