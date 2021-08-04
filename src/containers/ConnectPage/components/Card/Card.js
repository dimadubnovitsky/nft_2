import styles from './Card.module.scss';
import classNames from 'classnames';

const Card = ({ logo, description, active }) => (
  <div
    className={classNames({
      [styles.wrapper]: true,
      [styles.active]: active,
    })}
  >
    <div className={styles.logo}>
      <img src={logo} alt="Logo" />
    </div>
    <div className={styles.description}>{description}</div>
  </div>
);

export default Card;
