import React from 'react';
import ButtonBack from '../../../component/ButtonBack';
import BlockEdit from './Edit';
import BlockView from './View';
import styles from './styles/Block.module.scss';
import Loader from '../../../component/Loader';

class Block extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
    };
  }

  componentDidMount() {
    this.props.onInitialLoad();
  }

  componentWillUnmount() {
    this.props.onUnmount();
  }

  render() {
    const { block, onSubmit, selectedImage, user, onPurchase, loading } =
      this.props;
    const image =
      block.icon && block.icon.imageName ? block.icon.imageName : selectedImage;
    const title = block.icon ? block.icon.title : 'Original Block';
    const website = block.icon ? block.icon.website : '';
    const owner = block.owner ? block.owner.name : 'NFT Inc.';
    const description = block.icon
      ? block.icon.description
      : 'Original Block for sale!';
    const size = block.size ? block.size : '5';
    const price = block.price ? block.price : '';
    const availableForSale = block.availableForSale
      ? block.availableForSale
      : null;
    const ownerId = block.ownerId;
    const iconId = block.iconId;
    const isMyLand = user.id === ownerId;
    const isOwned = typeof block.ownerId !== 'undefined';
    const isNew = block.icon && block.icon.imageName === null;

    const initialValues = {
      image: image,
      title: title,
      owner: owner,
      website: website,
      description: description,
      size: size,
      availableForSale: availableForSale,
      price: price,
      date: 'August 1, 2030',
      ownerId: ownerId,
      iconId: iconId,
    };

    return (
      <>
        <div className={styles.wrapper}>
          <div className={styles.buttonBack}>
            <ButtonBack link="/" />
          </div>
          {this.state.edit ? (
            <BlockEdit
              onCancel={() => this.setState({ edit: false })}
              onSubmit={onSubmit}
              initialValues={initialValues}
              isOwned={isOwned}
            />
          ) : (
            <BlockView
              block={initialValues}
              onEdit={() => this.setState({ edit: true })}
              isMyLand={isMyLand}
              isOwned={isOwned}
              isNew={isNew}
              onPurchase={() => onPurchase(block)}
            />
          )}
        </div>
        {loading && <Loader wrapper={true} />}
      </>
    );
  }
}

export default Block;
