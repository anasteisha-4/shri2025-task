import { useEffect, useRef } from 'react';
import s from './Event.module.css';

export const Event = (props) => {
  const ref = useRef();

  const { onSize } = props;

  useEffect(() => {
    const width = ref.current.offsetWidth;
    const height = ref.current.offsetHeight;
    if (onSize) {
      onSize({ width, height });
    }
  }, [onSize]);

  return (
    <li ref={ref} className={props.slim ? s.slim : ''}>
      <button className={s.button}>
        <span
          className={`${s.icon} ${s[`icon_${props.icon}`]}`}
          role="img"
          aria-label={props.iconLabel}
        ></span>
        <h4 className={s.title}>{props.title}</h4>
        {props.subtitle && <span className={s.subtitle}>{props.subtitle}</span>}
      </button>
    </li>
  );
};
