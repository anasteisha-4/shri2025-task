import { Event } from '../Event/Event';
import s from './HeroDashboard.module.css';

export const HeroDashboard = () => (
  <div className={s.dashboard}>
    <div className={s.primary}>
      <h3 className={s.title}>Привет, Геннадий!</h3>
      <p className={s.subtitle}>Двери и окна закрыты, сигнализация включена.</p>
      <ul className={s.info}>
        <li className={s.item}>
          <div className={s['item-title']}>Дома</div>
          <div className={s['item-details']}>
            +23
            <span className={s['a11y-hidden']}>°</span>
          </div>
        </li>
        <li className={s.item}>
          <div className={s['item-title']}>За окном</div>
          <div className={s['item-details']}>
            +19
            <span className={s['a11y-hidden']}>°</span>
            <div
              className={`${s.icon} ${s['icon_rain']}`}
              role="img"
              aria-label="Дождь"
            ></div>
          </div>
        </li>
      </ul>
    </div>
    <ul className={s.schedule}>
      <Event
        icon="temp"
        iconLabel="Температура"
        title="Philips Cooler"
        subtitle="Начнет охлаждать в 16:30"
      />
      <Event
        icon="light"
        iconLabel="Освещение"
        title="Xiaomi Yeelight LED Smart Bulb"
        subtitle="Включится в 17:00"
      />
      <Event
        icon="light"
        iconLabel="Освещение"
        title="Xiaomi Yeelight LED Smart Bulb"
        subtitle="Включится в 17:00"
      />
    </ul>
  </div>
);
