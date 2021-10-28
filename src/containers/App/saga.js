import { all, fork } from 'redux-saga/effects';
import watchLoadData from './sagaWatchers/loadData';
import watchUpdateSelectedBlock from './sagaWatchers/updateSelectedBlock';
import watchUpdateSelectedImage from './sagaWatchers/updateSelectedImage';
import watchClearSelectedBlock from './sagaWatchers/clearSelectedBlock';
import watchAuthorize from './sagaWatchers/authorize';
import watchGetBlock from './sagaWatchers/getBlock';
import watchUpdateBlock from './sagaWatchers/updateBlock';
import watchUpdateIsFilters from './sagaWatchers/updateIsFilters';
import watchUpdateFilters from './sagaWatchers/updateFilters';
import watchUpdateIsTimeline from './sagaWatchers/updateIsTimeline';
import watchUpdateTimeline from './sagaWatchers/updateTimeline';
import watchUpdateIsHeatMap from './sagaWatchers/updateIsHeatMap';
import watchUpdateHeatMap from './sagaWatchers/updateHeatMap';
import watchClearBlock from './sagaWatchers/clearBlock';
import watchRefresh from './sagaWatchers/refresh';
import watchPurchaseBlock from './sagaWatchers/purchaseBlock';
import watchUpdateIsShowAllBlocks from './sagaWatchers/updateIsShowAllBlocks';

export default function* rootSaga() {
  yield all([
    fork(watchLoadData),
    fork(watchUpdateSelectedBlock),
    fork(watchClearSelectedBlock),
    fork(watchUpdateSelectedImage),
    fork(watchAuthorize),
    fork(watchGetBlock),
    fork(watchUpdateBlock),
    fork(watchPurchaseBlock),
    fork(watchUpdateIsFilters),
    fork(watchUpdateFilters),
    fork(watchUpdateIsTimeline),
    fork(watchUpdateTimeline),
    fork(watchUpdateIsHeatMap),
    fork(watchUpdateHeatMap),
    fork(watchUpdateIsShowAllBlocks),
    fork(watchClearBlock),
    fork(watchRefresh),
  ]);
}
