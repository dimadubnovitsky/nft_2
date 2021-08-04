import styles from './styles/FieldView.module.scss';

const FieldView = ({ title, subtitle = null, type }) => {
  const renderSubtitle = () => {
    if (subtitle === null || subtitle === '') {
      return 'Not set';
    }
    if (type === 'link') {
      return (
        <a
          href={subtitle}
          className={styles.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          {subtitle}
        </a>
      );
    }
    return subtitle;
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>{title}</div>
      <div className={styles.subtitle}>{renderSubtitle()}</div>
    </div>
  );
};

export default FieldView;
