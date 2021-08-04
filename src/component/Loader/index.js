import React, { useEffect, createRef } from 'react';
import lottie from 'lottie-web';
import animationData from './data/data.json';
import styles from './styles/Loader.module.scss';
import classNames from 'classnames';

const Loader = ({ wrapper }) => {
  const animationContainer = createRef();
  useEffect(() => {
    const animation = lottie.loadAnimation({
      container: animationContainer.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData,
    });
    return () => animation.destroy(); // optional clean up for unmounting
  }, []);

  lottie.loadAnimation({
    container: document.getElementById('container'), // the dom element that will contain the animation
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'data.json', // the path to the animation json
  });

  return (
    <div
      className={classNames({
        [styles.wrapper]: wrapper,
      })}
    >
      <div className={styles.animationContainer} ref={animationContainer} />
    </div>
  );
};

export default Loader;
