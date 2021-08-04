import { handleActions } from 'redux-actions';
import produce from 'immer';
import {
  clearSelectedBlock,
  loadData,
  updateSelectedBlock,
  updateSelectedImage,
  authorize,
  getBlock,
  updateBlock,
  updateIsFilters,
  updateFilters,
  updateIsTimeline,
  updateTimeline,
  updateIsHeatMap,
  updateHeatMap,
  clearBlock,
  purchaseBlock,
  refresh,
} from './actions';
import StaticData from './assets/json/staticData.json';
import Data1 from './assets/json/data01.json';
import Data2 from './assets/json/data02.json';
import Data3 from './assets/json/data03.json';
import Data4 from './assets/json/data04.json';
import Data5 from './assets/json/data05.json';
import Data6 from './assets/json/data06.json';
import Data7 from './assets/json/data07.json';
import Data8 from './assets/json/data08.json';
import Data9 from './assets/json/data09.json';
import Data10 from './assets/json/data10.json';
import Data11 from './assets/json/data11.json';
import Data12 from './assets/json/data12.json';
import Data13 from './assets/json/data13.json';
import HeatMap1 from './assets/images/input_01.png';
import HeatMap2 from './assets/images/input_02.png';
import HeatMap3 from './assets/images/input_03.png';
import HeatMap4 from './assets/images/input_04.png';
import HeatMap5 from './assets/images/input_05.png';
import HeatMap6 from './assets/images/input_06.png';
import HeatMap7 from './assets/images/input_07.png';
import HeatMap8 from './assets/images/input_08.png';
import HeatMap9 from './assets/images/input_09.png';
import HeatMap10 from './assets/images/input_10.png';
import HeatMap11 from './assets/images/input_11.png';
import HeatMap12 from './assets/images/input_12.png';
import HeatMap13 from './assets/images/input_13.png';

const initialState = {
  /**
   * Utils
   */
  loading: false,
  selectedBlock: null,
  selectedImage: null,
  isAuthorized: false,
  user: StaticData.owners[0],
  /**
   * Block page
   */
  block: {},
  /**
   * Controls
   */
  isFilters: false,
  filters: {
    myLands: true,
    forSale: true,
    unavailable: true,
  },
  isTimeline: false,
  timeline: 0,
  isHeatMap: false,
  heatMap: HeatMap1,
  /**
   * Static
   */
  owners: StaticData.owners,
  blockIcons: StaticData.blockIcons,
  /**
   * Data
   */
  blocks: Data1.blocks,
  ownedBlocks: Data1.ownedBlocks,
  history: [
    {
      date: 'Aug 1, 2021',
      heatMap: HeatMap1,
      blocks: Data1.blocks,
      ownedBlocks: Data1.ownedBlocks,
    },
    {
      date: 'Sep 1, 2021',
      heatMap: HeatMap2,
      blocks: Data2.blocks,
      ownedBlocks: Data2.ownedBlocks,
    },
    {
      date: 'Oct 1, 2021',
      heatMap: HeatMap3,
      blocks: Data3.blocks,
      ownedBlocks: Data3.ownedBlocks,
    },
    {
      date: 'Nov 1, 2021',
      heatMap: HeatMap4,
      blocks: Data4.blocks,
      ownedBlocks: Data4.ownedBlocks,
    },
    {
      date: 'Dec 1, 2021',
      heatMap: HeatMap5,
      blocks: Data5.blocks,
      ownedBlocks: Data5.ownedBlocks,
    },
    {
      date: 'Jan 1, 2022',
      heatMap: HeatMap6,
      blocks: Data6.blocks,
      ownedBlocks: Data6.ownedBlocks,
    },
    {
      date: 'Feb 1, 2022',
      heatMap: HeatMap7,
      blocks: Data7.blocks,
      ownedBlocks: Data7.ownedBlocks,
    },
    {
      date: 'Mar 1, 2022',
      heatMap: HeatMap8,
      blocks: Data8.blocks,
      ownedBlocks: Data8.ownedBlocks,
    },
    {
      date: 'Apr 1, 2022',
      heatMap: HeatMap9,
      blocks: Data9.blocks,
      ownedBlocks: Data9.ownedBlocks,
    },
    {
      date: 'May 1, 2022',
      heatMap: HeatMap10,
      blocks: Data10.blocks,
      ownedBlocks: Data10.ownedBlocks,
    },
    {
      date: 'Jun 1, 2022',
      heatMap: HeatMap11,
      blocks: Data11.blocks,
      ownedBlocks: Data11.ownedBlocks,
    },
    {
      date: 'Jul 1, 2022',
      heatMap: HeatMap12,
      blocks: Data12.blocks,
      ownedBlocks: Data12.ownedBlocks,
    },
    {
      date: 'Aug 1, 2022',
      heatMap: HeatMap13,
      blocks: Data13.blocks,
      ownedBlocks: Data13.ownedBlocks,
    },
  ],
};

const globalReducer = handleActions(
  {
    [loadData.REQUEST]: produce((draft) => {
      draft.loading = true;
    }),
    [loadData.SUCCESS]: produce((draft, { payload: { data } }) => {
      draft.loading = false;
    }),
    [loadData.FAILURE]: produce((draft, { payload: { error } }) => {
      draft.loading = false;
    }),
    [updateSelectedBlock.SUCCESS]: produce(
      (draft, { payload: { selectedBlock } }) => {
        draft.selectedBlock = selectedBlock;
      },
    ),
    [clearSelectedBlock.SUCCESS]: produce((draft) => {
      draft.selectedBlock = null;
    }),
    [updateSelectedImage.SUCCESS]: produce(
      (draft, { payload: { selectedImage } }) => {
        draft.selectedImage = selectedImage;
      },
    ),
    [authorize.REQUEST]: produce((draft) => {
      draft.loading = true;
    }),
    [authorize.SUCCESS]: produce((draft, { payload: { data } }) => {
      draft.loading = false;
      draft.isAuthorized = true;
    }),
    [authorize.FAILURE]: produce((draft, { payload: { error } }) => {
      draft.loading = false;
    }),
    [getBlock.REQUEST]: produce((draft) => {
      draft.loading = true;
    }),
    [getBlock.SUCCESS]: produce((draft, { payload: { block } }) => {
      draft.loading = false;
      draft.block = block;
    }),
    [getBlock.FAILURE]: produce((draft, { payload: { error } }) => {
      draft.loading = false;
    }),
    [updateBlock.REQUEST]: produce((draft) => {
      draft.loading = true;
    }),
    [updateBlock.SUCCESS]: produce((draft, { payload: { data } }) => {
      draft.loading = false;
      draft.owners = draft.owners.map((owner) => {
        if (owner.id === data.ownerId) {
          return {
            ...owner,
            name: data.owner,
          };
        }
        return owner;
      });
      draft.blockIcons = draft.blockIcons.map((block) => {
        if (block.id === data.iconId) {
          return {
            ...block,
            title: data.title,
            description: data.description,
            website: data.website,
            ...(data.image && { imageName: data.image }),
          };
        }
        return block;
      });
      draft.ownedBlocks = draft.ownedBlocks.map((block) => {
        if (block.ownerId === data.ownerId) {
          return {
            ...block,
            price: data.price,
            availableForSale: data.availableForSale,
          };
        }
        return block;
      });
    }),
    [updateBlock.FAILURE]: produce((draft, { payload: { error } }) => {
      draft.loading = false;
    }),
    [purchaseBlock.SUCCESS]: produce((draft, { payload: { block } }) => {
      draft.ownedBlocks.push({
        size: 5,
        ownerId: draft.user.id,
        iconId: draft.blockIcons.length,
        price: block.price,
        availableForSale: true,
        blockIDs: [block.id],
      });
      draft.blockIcons.push({
        id: draft.blockIcons.length,
        imageName: null,
        title: 'Title of your new block',
        description: 'Description of your new block',
        website: '',
      });
    }),
    /**
     * Controls
     */
    [updateIsFilters.SUCCESS]: produce((draft, { payload: { isFilters } }) => {
      draft.isFilters = isFilters;
    }),
    [updateFilters.SUCCESS]: produce((draft, { payload: { filters } }) => {
      draft.filters = filters;
    }),
    [updateIsTimeline.SUCCESS]: produce(
      (draft, { payload: { isTimeline } }) => {
        draft.isTimeline = isTimeline;
      },
    ),
    [updateTimeline.SUCCESS]: produce((draft, { payload: { timeline } }) => {
      draft.timeline = timeline;
    }),
    [updateIsHeatMap.SUCCESS]: produce((draft, { payload: { isHeatMap } }) => {
      draft.isHeatMap = isHeatMap;
    }),
    [updateHeatMap.SUCCESS]: produce((draft, { payload: { heatMap } }) => {
      draft.heatMap = heatMap;
    }),
    [clearBlock.SUCCESS]: produce((draft) => {
      draft.block = {};
    }),
    [refresh.SUCCESS]: produce(() => initialState),
  },
  initialState,
);

export default globalReducer;
