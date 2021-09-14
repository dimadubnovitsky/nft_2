import styles from './styles/Header.module.scss';
import logo from '../../images/logo.png';
import reload from '../../images/reload.svg';
import wallet from '../../images/wallet.png';
import { Link } from 'react-router-dom';
import { makeSelectIsAuthorized } from '../../containers/App/selectors';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Hidden from '@material-ui/core/Hidden';
import React from 'react';
import Box from '@material-ui/core/Box';

const Header = ({ isAuthorized, onRefresh }) => (
  <>
    <Hidden smUp>
      <Box padding={2}>
        <div className={styles.wrapper}>
          <div className={styles.leftContent}>
            <div className={styles.logo}>
              <img src={logo} alt="Logo" />
            </div>
          </div>
          {isAuthorized ? (
            <div className={styles.wallet}>
              <div className={styles.walletId}>#123456789</div>
              <div className={styles.buttonWallet}>
                <img src={wallet} alt="Wallet" />
              </div>
            </div>
          ) : (
            <Link to="/connect">
              <div className={styles.buttonConnect}>Connect Wallet</div>
            </Link>
          )}
        </div>
      </Box>
    </Hidden>
    <Hidden xsDown>
      <Box paddingX={2.4} paddingY={4}>
        <div className={styles.wrapper}>
          <div className={styles.leftContent}>
            <div className={styles.logo}>
              <img src={logo} alt="Logo" />
            </div>
            <div className={styles.reload} onClick={onRefresh}>
              <img src={reload} alt="Reload" />
            </div>
          </div>
          <div className={styles.title}>Million Pixel NFT</div>
          {isAuthorized ? (
            <div className={styles.wallet}>
              <div className={styles.walletId}>#123456789</div>
              <div className={styles.buttonWallet}>
                <img src={wallet} alt="Wallet" />
              </div>
            </div>
          ) : (
            <Link to="/connect">
              <div className={styles.buttonConnect}>Connect Wallet</div>
            </Link>
          )}
        </div>
      </Box>
    </Hidden>
  </>
);

const mapStateToProps = createStructuredSelector({
  isAuthorized: makeSelectIsAuthorized(),
});

const mapDispatchToProps = () => ({});

export default compose(connect(mapStateToProps, mapDispatchToProps))(Header);
