import styles from './styles/OfferModal.module.scss';
import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import check from '../../../../images/check.png';

const OfferModal = ({ open, onClose }) => (
  <Dialog open={open} onClose={onClose}>
    <div className={styles.wrapper}>
      <div className={styles.image}>
        <img src={check} alt="" />
      </div>
      <div className={styles.content}>
        <div className={styles.title}>Your Offer</div>
        <div className={styles.subtitle}>The offer is sent to the owner</div>
        <div className={styles.buttonDone} onClick={onClose}>
          Done
        </div>
      </div>
    </div>
  </Dialog>
);
export default OfferModal;
