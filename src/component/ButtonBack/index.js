import styles from './styles/ButtonBack.module.scss';
import arrowLeft from '../../images/arrow_left.svg';
import { Link } from 'react-router-dom';

const ButtonBack = ({ link }) => (
  <Link to={link} className={styles.wrapper}>
    <div className={styles.arrowLeft}>
      <img src={arrowLeft} alt="Arrow left" />
    </div>
    <div className={styles.text}>Back</div>
  </Link>
);

export default ButtonBack;
