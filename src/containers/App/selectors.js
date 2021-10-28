import { createSelector } from 'reselect';

/**
 * Root selectors
 */
const selectRoot = (state) => state.global;

const makeSelectSelectedBlock = () =>
  createSelector(selectRoot, (subState) => subState.selectedBlock);

const makeSelectSelectedImage = () =>
  createSelector(selectRoot, (subState) => subState.selectedImage);

const makeSelectOwnedBlock = () =>
  createSelector(selectRoot, (subState) => {
    if (!subState.selectedBlock) {
      return null;
    }
    if (subState.isTimeline) {
      return subState.history[subState.timeline].ownedBlocks.find((owned) =>
        owned.blockIDs.includes(subState.selectedBlock.id),
      );
    }
    return subState.ownedBlocks.find((owned) =>
      owned.blockIDs.includes(subState.selectedBlock.id),
    );
  });

const makeSelectOwners = () =>
  createSelector(selectRoot, (subState) => subState.owners);

const makeSelectBlockIcons = () =>
  createSelector(selectRoot, (subState) => subState.blockIcons);

const makeSelectBlocks = () =>
  createSelector(selectRoot, (subState) => {
    if (subState.isTimeline) {
      return subState.history[subState.timeline].blocks;
    }

    return subState.blocks;
  });

const makeSelectAllBlocks = () =>
  createSelector(selectRoot, (subState) => subState.history[12].blocks);

const makeSelectBlock = () =>
  createSelector(selectRoot, (subState) => {
    const block = subState.block;

    const ownedBlock = subState.ownedBlocks.find((ownedBlock) =>
      ownedBlock.blockIDs.includes(block.id),
    );
    const owner = ownedBlock
      ? subState.owners.find((owner) => ownedBlock.ownerId === owner.id)
      : null;
    const icon = ownedBlock
      ? subState.blockIcons.find((icon) => ownedBlock.iconId === icon.id)
      : null;

    return {
      ...block,
      ...ownedBlock,
      owner,
      icon,
    };
  });

const makeSelectOwnedBlocks = () =>
  createSelector(selectRoot, (subState) => {
    if (subState.isTimeline) {
      return subState.history[subState.timeline].ownedBlocks;
    }

    return subState.ownedBlocks;
  });

const makeSelectAllOwnedBlocks = () =>
  createSelector(selectRoot, (subState) => subState.history[12].ownedBlocks);

const makeSelectHistory = () =>
  createSelector(selectRoot, (subState) => subState.history);

const makeSelectLoading = () =>
  createSelector(selectRoot, (subState) => subState.loading);

const makeSelectIsAuthorized = () =>
  createSelector(selectRoot, (subState) => subState.isAuthorized);

const makeSelectUser = () =>
  createSelector(selectRoot, (subState) => subState.user);

const makeSelectIsFilters = () =>
  createSelector(selectRoot, (subState) => subState.isFilters);

const makeSelectFilters = () =>
  createSelector(selectRoot, (subState) => subState.filters);

const makeSelectIsTimeline = () =>
  createSelector(selectRoot, (subState) => subState.isTimeline);

const makeSelectTimeline = () =>
  createSelector(selectRoot, (subState) => subState.timeline);

const makeSelectIsHeatMap = () =>
  createSelector(selectRoot, (subState) => subState.isHeatMap);

const makeSelectIsShowAllBlocks = () =>
  createSelector(selectRoot, (subState) => subState.isShowAllBlocks);

const makeSelectHeatMap = () =>
  createSelector(selectRoot, (subState) => {
    if (subState.isTimeline) {
      return subState.history[subState.timeline].heatMap;
    }

    return subState.heatMap;
  });

const selectRouter = (state) => state.router;

const makeSelectLocation = () =>
  createSelector(selectRouter, (subState) => subState.location);

export {
  makeSelectSelectedBlock,
  makeSelectSelectedImage,
  makeSelectOwnedBlock,
  makeSelectOwners,
  makeSelectBlockIcons,
  makeSelectBlocks,
  makeSelectAllBlocks,
  makeSelectBlock,
  makeSelectOwnedBlocks,
  makeSelectAllOwnedBlocks,
  makeSelectHistory,
  makeSelectLoading,
  makeSelectLocation,
  makeSelectIsAuthorized,
  makeSelectUser,
  makeSelectIsFilters,
  makeSelectFilters,
  makeSelectIsTimeline,
  makeSelectTimeline,
  makeSelectIsHeatMap,
  makeSelectHeatMap,
  makeSelectIsShowAllBlocks,
};
