import styles from './styles/ButtonBack.module.scss';
import arrowLeft from '../../images/arrow_left.svg';
import { Link } from 'react-router-dom';

const ButtonBack = ({ link }) => (
  <div className={styles.wrapper}>
    <div className={styles.arrowLeft}>
      <img src={arrowLeft} alt="Arrow left" />
    </div>
    <Link to={link}>
      <div className={styles.text}>Back</div>
    </Link>
  </div>
);

export default ButtonBack;
