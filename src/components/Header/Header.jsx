import { useState } from 'react';
import s from './Header.module.css';

export const Header = () => {
  let [expanded, setExpanded] = useState(false);
  let [toggled, setToggled] = useState(false);

  const onClick = () => {
    if (!toggled) {
      setToggled(true);
    }

    setExpanded(!expanded);
  };

  return (
    <header className={s.header}>
      <a href="/" className={s.logo} aria-label="Яндекс.Дом" />
      <button
        className={s.menu}
        aria-expanded={expanded ? 'true' : 'false'}
        onClick={onClick}
      >
        <span className={`${s['menu-text']} ${s['a11y-hidden']}`}>
          {expanded ? 'Закрыть меню' : 'Открыть меню'}
        </span>
      </button>
      <ul
        className={
          s.links +
          (expanded ? ` ${s['links_opened']}` : '') +
          (toggled ? ` ${s['links-toggled']}` : '')
        }
      >
        <li className={s['item']}>
          <a
            className={`${s.link} ${s['link_current']}`}
            href="/"
            aria-current="page"
          >
            Сводка
          </a>
        </li>
        <li className={s.item}>
          <a className={s.link} href="/devices">
            Устройства
          </a>
        </li>
        <li className={s.item}>
          <a className={s.link} href="/scripts">
            Сценарии
          </a>
        </li>
      </ul>
    </header>
  );
};
