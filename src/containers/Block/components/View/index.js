import React from 'react';
import twitter from '../../../../images/twitter.svg';
import facebook from '../../../../images/facebook.svg';
import instagram from '../../../../images/instagram.svg';
import Grid from '@material-ui/core/Grid';
import FieldView from '../../../../component/FieldView';
import OfferModal from '../OfferModal';
import TextField from '../../../../component/TextField';
import GridImage from '../assets/images/grid.png';
import styles from './styles/View.module.scss';

const BlockView = ({ block, onEdit, isMyLand, isOwned, onPurchase, isNew }) => {
  const [offer, setOffer] = React.useState(false);
  const [modal, setModal] = React.useState(false);

  const closeModal = () => {
    setModal(false);
    setOffer(false);
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.title}>NFT Property Details</div>
        <div className={styles.content}>
          <div className={styles.main}>
            <div className={styles.logo}>
              <img src={block.image} alt="Logo" />
              {(!isOwned || isNew) && (
                <img className={styles.grid} src={GridImage} alt="Grid" />
              )}
            </div>
            <div className={styles.date}>{block.date}</div>
            {isOwned && (
              <div className={styles.social}>
                <div className={styles.socialText}>Share:</div>
                <div className={styles.socialItems}>
                  <img src={twitter} alt="Twitter" />
                  <img src={facebook} alt="Facebook" />
                  <img src={instagram} alt="Instagram" />
                </div>
              </div>
            )}
            {!isOwned && (
              <div className={styles.buttonOffer} onClick={onPurchase}>
                Buy NFT Now
              </div>
            )}
            {isOwned && offer && (
              <>
                <div className={styles.inputPrice}>
                  <TextField label={'Your Price'} />
                </div>
                <div
                  className={styles.buttonOffer}
                  onClick={() => setModal(true)}
                >
                  Make Offer
                </div>
              </>
            )}
          </div>
          <div className={styles.info}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <Grid container spacing={3}>
                  <Grid item md={6} xs={12}>
                    <FieldView title="Title" subtitle={block.title} />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <FieldView title="Owner" subtitle={block.owner} />
                  </Grid>
                  {isOwned && (
                    <Grid item md={12} xs={12}>
                      <FieldView
                        title="Link"
                        subtitle={block.website}
                        type="link"
                      />
                    </Grid>
                  )}
                  <Grid item md={12} xs={12}>
                    <FieldView
                      title="Description"
                      subtitle={block.description}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <FieldView
                      title="Size"
                      subtitle={`${block.size * 10}x${block.size * 10}`}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <FieldView
                      title="Price"
                      subtitle={
                        block.availableForSale || !isOwned
                          ? block.price
                          : 'Not currently for sale'
                      }
                    />
                  </Grid>
                </Grid>
              </Grid>
              {isOwned && isMyLand && (
                <Grid item>
                  <div className={styles.buttonEdit} onClick={onEdit}>
                    Edit
                  </div>
                </Grid>
              )}
            </Grid>
          </div>
        </div>
      </div>
      <OfferModal open={modal} onClose={closeModal} />
    </>
  );
};

export default BlockView;
