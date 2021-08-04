import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  clearSelectedBlock,
  updateSelectedBlock,
} from '../../containers/App/actions';
import { Popover } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectBlockIcons,
  makeSelectFilters,
  makeSelectIsFilters,
  makeSelectIsTimeline,
  makeSelectOwnedBlocks,
  makeSelectOwners,
  makeSelectSelectedImage,
  makeSelectUser,
} from '../../containers/App/selectors';
import Grid from '@material-ui/core/Grid';
import union from '../../images/union.svg';
import arrowLink from '../../images/arrow_link.svg';
import GridImage from './assets/images/grid.png';
import styles from './styles/Block.module.scss';

//TODO: When isTimeline is true we should allow user go to Block details page (history entry)
const Block = ({
  block,
  ownedBlocks,
  owners,
  blockIcons,
  selectedImage,
  isFilters,
  filters,
  user,
  isTimeline,
  dispatchUpdateSelectedBlock,
  dispatchClearSelectedBlock,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    dispatchClearSelectedBlock();
  };

  const ownedBlock = ownedBlocks.find((ownedBlock) =>
    ownedBlock.blockIDs.includes(block.id),
  );
  const owner = ownedBlock
    ? owners.find((owner) => ownedBlock.ownerId === owner.id)
    : null;
  const icon = ownedBlock
    ? blockIcons.find((icon) => ownedBlock.iconId === icon.id)
    : null;

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const image = icon && icon.imageName ? icon.imageName : selectedImage;
  const title = icon ? icon.title : 'Original Block';
  const size = ownedBlock
    ? `${ownedBlock.size * 10}x${ownedBlock.size * 10}`
    : '50x50';
  const description = icon ? icon.description : 'Original Block for sale!';
  const website = icon ? icon.website : '';
  const ownerTitle = owner ? owner.name : 'NFT Inc.';
  const price = ownedBlock ? ownedBlock.price : block.price;
  const isMyLand = ownedBlock && user.id === ownedBlock.ownerId;

  const PopoverBlock = (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
    >
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.main}>
            <div className={styles.logo}>
              <img src={image} alt="Block" />
              {!ownedBlock && (
                <img className={styles.grid} src={GridImage} alt="Grid" />
              )}
            </div>
            <div className={styles.title}>
              <div className={styles.name}>{title}</div>
              <div className={styles.size}>
                <img src={union} alt="Size" />
                {size}
              </div>
            </div>
          </div>
          <div className={styles.description}>{description}</div>
          {owner && (
            <div className={styles.link}>
              <img src={arrowLink} alt="Link" />
              <a href={website} target="_blank" rel="noopener noreferrer">
                Visit Website
              </a>
            </div>
          )}
        </div>
        <div className={styles.info}>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Owner: </span>
            {ownerTitle}
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Price: </span>
            {price}
          </div>
        </div>
        {!isTimeline && (
          <div className={styles.buttons}>
            {isMyLand ? (
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Link
                    to={`/block/${block.id}`}
                    className={styles.buttonDetails}
                  >
                    Details
                  </Link>
                </Grid>
              </Grid>
            ) : (
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Link to={`/block/${block.id}`} className={styles.buttonBuy}>
                    Buy
                  </Link>
                </Grid>
                <Grid item xs={6}>
                  <Link
                    to={`/block/${block.id}`}
                    className={styles.buttonDetails}
                  >
                    Details
                  </Link>
                </Grid>
              </Grid>
            )}
          </div>
        )}
      </div>
    </Popover>
  );

  let isFirstBlock = false;
  if (ownedBlock) {
    isFirstBlock = ownedBlock.blockIDs[0] === block.id;
  }

  let isVisible = true;
  if (isFilters && ownedBlock) {
    const isMyLands = user.id === ownedBlock.ownerId;
    const isForSale = ownedBlock.availableForSale;
    const isUnavailable = !ownedBlock.availableForSale;

    if (isMyLands && !filters.myLands) {
      isVisible = false;
    }

    if (isForSale && !filters.forSale) {
      isVisible = false;
    }

    if (isUnavailable && !filters.unavailable) {
      isVisible = false;
    }
  }

  if (ownedBlock && isFirstBlock && isVisible) {
    return (
      <>
        <div
          className={styles.root}
          onClick={(event) => {
            dispatchUpdateSelectedBlock(block);
            handleClick(event);
          }}
        >
          <img
            className={`${styles.image} ${
              ownedBlock.size === 10 ? styles.image10 : styles.image5
            }`}
            src={icon.imageName}
            alt=""
          />
        </div>
        {PopoverBlock}
      </>
    );
  }

  return (
    <>
      <div
        className={styles.root}
        onClick={(event) => {
          dispatchUpdateSelectedBlock(block);
          handleClick(event);
        }}
      />
      {PopoverBlock}
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  selectedImage: makeSelectSelectedImage(),
  ownedBlocks: makeSelectOwnedBlocks(),
  owners: makeSelectOwners(),
  blockIcons: makeSelectBlockIcons(),
  isFilters: makeSelectIsFilters(),
  filters: makeSelectFilters(),
  user: makeSelectUser(),
  isTimeline: makeSelectIsTimeline(),
});

const mapDispatchToProps = (dispatch) => ({
  dispatchUpdateSelectedBlock: (block) =>
    dispatch(updateSelectedBlock.request(block)),
  dispatchClearSelectedBlock: () => dispatch(clearSelectedBlock.request()),
});

export default compose(connect(mapStateToProps, mapDispatchToProps))(Block);
