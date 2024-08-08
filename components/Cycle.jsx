"use client";
import { useState, useEffect } from 'react';
import classNames from 'classnames';
import styles from './Cycle.module.css';

const Cycle = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentIndex((currentIndex + items.length - 1) % items.length);
    }, 3000);
    return () => clearInterval(timerId);
  }, [currentIndex, items.length]);

  return (
    <div className={styles['cycle-container']}>
      {items.map((item, index) => {
        const classes = classNames(styles['cycle-item'], {
          [styles['cycle-item--active']]: index === currentIndex,
          [styles['cycle-item--next']]: index === (currentIndex + 1) % items.length,
          [styles['cycle-item--prev']]: index === (currentIndex + items.length - 1) % items.length,
        });
        return (
          <div className={`${classes} cont bg-red-600`} key={index} style={{ backgroundImage: `url(${item.img})` }}>
          </div>
        );
      })}
    </div>
  );
};

export default Cycle;
