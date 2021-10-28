import { createRoutine } from 'redux-saga-routines';

const loadData = createRoutine('APP/LOAD_DATA', {
  success: (data) => ({ data }),
  failure: (error) => ({ error }),
});

const authorize = createRoutine('APP/AUTHORIZE', {
  success: (data) => ({ data }),
  failure: (error) => ({ error }),
});

const getBlock = createRoutine('APP/GET_BLOCK', {
  request: (id) => ({
    id,
  }),
  success: (block) => ({
    block,
  }),
  failure: (error) => ({ error }),
});

const updateBlock = createRoutine('APP/UPDATE_BLOCK', {
  request: (block, resolve) => ({
    block,
    resolve,
  }),
  success: (data) => ({
    data,
  }),
  failure: (error) => ({ error }),
});

const clearBlock = createRoutine('APP/CLEAR_BLOCK');

const purchaseBlock = createRoutine('APP/PURCHASE_BLOCK', {
  request: (block) => ({
    block,
  }),
  success: (block) => ({
    block,
  }),
});

const updateSelectedBlock = createRoutine('APP/UPDATE_SELECTED_BLOCK', {
  request: (selectedBlock) => ({ selectedBlock }),
  success: (selectedBlock) => ({ selectedBlock }),
});

const clearSelectedBlock = createRoutine('APP/CLEAR_SELECTED_BLOCK');

const updateSelectedImage = createRoutine('APP/UPDATE_SELECTED_IMAGE', {
  request: (selectedImage) => ({ selectedImage }),
  success: (selectedImage) => ({ selectedImage }),
});

const refresh = createRoutine('APP/REFRESH');

const updateIsFilters = createRoutine('APP/UPDATE_IS_FILTERS', {
  request: (isFilters) => ({
    isFilters,
  }),
  success: (isFilters) => ({
    isFilters,
  }),
});

const updateFilters = createRoutine('APP/UPDATE_FILTERS', {
  request: (filters) => ({
    filters,
  }),
  success: (filters) => ({
    filters,
  }),
});

const updateIsTimeline = createRoutine('APP/UPDATE_IS_TIMELINE', {
  request: (isTimeline) => ({
    isTimeline,
  }),
  success: (isTimeline) => ({
    isTimeline,
  }),
});

const updateTimeline = createRoutine('APP/UPDATE_TIMELINE', {
  request: (timeline) => ({
    timeline,
  }),
  success: (timeline) => ({
    timeline,
  }),
});

const updateIsHeatMap = createRoutine('APP/UPDATE_IS_HEAT_MAP', {
  request: (isHeatMap) => ({
    isHeatMap,
  }),
  success: (isHeatMap) => ({
    isHeatMap,
  }),
});

const updateHeatMap = createRoutine('APP/UPDATE_HEAT_MAP', {
  request: (heatMap) => ({
    heatMap,
  }),
  success: (heatMap) => ({
    heatMap,
  }),
});

const updateIsShowAllBlocks = createRoutine('APP/UPDATE_IS_SHOW_ALL_BLOCKS', {
  request: (isShowAllBlocks) => ({
    isShowAllBlocks,
  }),
  success: (isShowAllBlocks) => ({
    isShowAllBlocks,
  }),
});

export {
  loadData,
  authorize,
  getBlock,
  updateBlock,
  clearBlock,
  purchaseBlock,
  updateSelectedBlock,
  clearSelectedBlock,
  updateSelectedImage,
  refresh,
  updateIsFilters,
  updateFilters,
  updateIsTimeline,
  updateTimeline,
  updateIsHeatMap,
  updateHeatMap,
  updateIsShowAllBlocks,
};
