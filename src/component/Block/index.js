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
import { Transition, animated } from 'react-spring';
import {
  usePopupState,
  bindTrigger,
  bindPopover,
} from 'material-ui-popup-state/hooks';
import {
  makeSelectAllOwnedBlocks,
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
import Hidden from '@material-ui/core/Hidden';

//TODO: When isTimeline is true we should allow user go to Block details page (history entry)
const Block = ({
  block,
  ownedBlocks,
  allOwnedBlocks,
  mobile,
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
  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'demoPopover',
  });

  let ownedBlock = {};

  if (mobile) {
    ownedBlock = allOwnedBlocks.find((ownedBlock) =>
      ownedBlock.blockIDs.includes(block.id),
    );
  } else {
    ownedBlock = ownedBlocks.find((ownedBlock) =>
      ownedBlock.blockIDs.includes(block.id),
    );
  }

  const owner = ownedBlock
    ? owners.find((owner) => ownedBlock.ownerId === owner.id)
    : null;
  const icon = ownedBlock
    ? blockIcons.find((icon) => ownedBlock.iconId === icon.id)
    : null;

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
      {...bindPopover(popupState)}
      onClose={() => {
        dispatchClearSelectedBlock();
        popupState.close();
      }}
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

  return (
    <>
      <Hidden smUp>
        <a
          {...bindTrigger(popupState)}
          className={styles.root}
          href={website}
          target="_blank"
          rel="nofollow noopener"
          style={{ pointerEvents: website ? 'auto' : 'none' }}
        >
          <Transition
            items={ownedBlock}
            from={{ opacity: 0 }}
            enter={{ opacity: 1 }}
            leave={{ opacity: 0 }}
          >
            {(style, springOwnedBlock, state) => {
              const springIcon = springOwnedBlock
                ? blockIcons.find((icon) => springOwnedBlock.iconId === icon.id)
                : null;

              let isFirstBlock = false;
              if (springOwnedBlock) {
                isFirstBlock = springOwnedBlock.blockIDs[0] === block.id;
              }

              let isVisible = true;
              if (isFilters && springOwnedBlock) {
                const isMyLands = user.id === springOwnedBlock.ownerId;
                const isForSale = springOwnedBlock.availableForSale;
                const isUnavailable = !springOwnedBlock.availableForSale;

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

              return (
                springOwnedBlock &&
                isFirstBlock && (
                  <Transition
                    items={isVisible}
                    from={{ opacity: 0 }}
                    enter={{ opacity: 1 }}
                    leave={{ opacity: 0 }}
                  >
                    {(visibleStyle, springIsVisible) =>
                      springIsVisible && (
                        <animated.img
                          className={`${styles.image} ${
                            springOwnedBlock.size === 10
                              ? styles.image10
                              : styles.image5
                          }`}
                          src={springIcon.imageName}
                          alt=""
                          style={
                            state.phase === 'mount' ||
                            (state.phase === 'enter' && !ownedBlock)
                              ? style
                              : visibleStyle
                          }
                        />
                      )
                    }
                  </Transition>
                )
              );
            }}
          </Transition>
        </a>
      </Hidden>
      <Hidden xsDown>
        <>
          <div
            {...bindTrigger(popupState)}
            className={styles.root}
            onClick={(event) => {
              dispatchUpdateSelectedBlock(block);
              popupState.toggle(event);
            }}
          >
            <Transition
              items={ownedBlock}
              from={{ opacity: 0 }}
              enter={{ opacity: 1 }}
              leave={{ opacity: 0 }}
            >
              {(style, springOwnedBlock, state) => {
                const springIcon = springOwnedBlock
                  ? blockIcons.find(
                      (icon) => springOwnedBlock.iconId === icon.id,
                    )
                  : null;

                let isFirstBlock = false;
                if (springOwnedBlock) {
                  isFirstBlock = springOwnedBlock.blockIDs[0] === block.id;
                }

                let isVisible = true;
                if (isFilters && springOwnedBlock) {
                  const isMyLands = user.id === springOwnedBlock.ownerId;
                  const isForSale = springOwnedBlock.availableForSale;
                  const isUnavailable = !springOwnedBlock.availableForSale;

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

                return (
                  springOwnedBlock &&
                  isFirstBlock && (
                    <Transition
                      items={isVisible}
                      from={{ opacity: 0 }}
                      enter={{ opacity: 1 }}
                      leave={{ opacity: 0 }}
                    >
                      {(visibleStyle, springIsVisible) =>
                        springIsVisible && (
                          <animated.img
                            className={`${styles.image} ${
                              springOwnedBlock.size === 10
                                ? styles.image10
                                : styles.image5
                            }`}
                            src={springIcon.imageName}
                            alt=""
                            style={
                              state.phase === 'mount' ||
                              (state.phase === 'enter' && !ownedBlock)
                                ? style
                                : visibleStyle
                            }
                          />
                        )
                      }
                    </Transition>
                  )
                );
              }}
            </Transition>
          </div>
          {PopoverBlock}
        </>
      </Hidden>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  selectedImage: makeSelectSelectedImage(),
  ownedBlocks: makeSelectOwnedBlocks(),
  allOwnedBlocks: makeSelectAllOwnedBlocks(),
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
