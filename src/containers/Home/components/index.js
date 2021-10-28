import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid } from '@material-ui/core';
import ImageGrid from '../../../component/ImageGrid';
import GridImage from '../../../component/ImageGrid/assets/img/grid.png';
import Block from '../../../component/Block';
import Header from '../../../component/Header';
import Controls from './Controls';
import HeatMap from '../../../component/HeatMap';
import TimeLine from './Timeline';
import styles from './styles/Home.module.scss';
import Hidden from '@material-ui/core/Hidden';

class Home extends React.PureComponent {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
  };

  render() {
    const { blocks, allBlocks, onRefresh, isShowAllBlocks } = this.props;

    return (
      <div className={styles.root}>
        <Hidden smUp>
          <div className={styles.wrapper}>
            <div className={styles.header}>
              <Header onRefresh={onRefresh} />
            </div>
            <div className={styles.container}>
              <ImageGrid />
              <HeatMap />
              <div className={styles.grid}>
                <img src={GridImage} alt="" />
              </div>
              <div className={styles.blocks}>
                {allBlocks.map((block) => (
                  <Block block={block} mobile={true} key={block.id} />
                ))}
              </div>
            </div>
          </div>
        </Hidden>
        <Hidden xsDown>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Header onRefresh={onRefresh} />
            </Grid>
            <Grid item xs={12} className={styles.content}>
              <Box paddingX={2}>
                <Grid container spacing={1}>
                  <Grid item xs={2}>
                    <TimeLine />
                  </Grid>
                  <Grid item xs={8}>
                    <div className={styles.container}>
                      <ImageGrid />
                      <HeatMap />
                      <div className={styles.grid}>
                        <img src={GridImage} alt="" />
                      </div>
                      <div className={styles.blocks}>
                        {blocks.map((block) => (
                          <Block
                            block={block}
                            key={block.id}
                            isShowAllBlocks={isShowAllBlocks}
                          />
                        ))}
                      </div>
                      <div className={styles.patentText}>Patent pending</div>
                    </div>
                  </Grid>
                  <Grid item xs={2}>
                    <Controls />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Hidden>
      </div>
    );
  }
}

export default Home;
