import { useCallback, useEffect, useRef, useState } from 'react';
import { Event } from '../Event/Event';
import { EventGrid } from '../EventGrid/EventGrid';
import { HeroDashboard } from '../HeroDashboard/HeroDashboard';
import s from './Main.module.css';

const TABS = {
  all: {
    title: 'Все',
    items: [
      {
        icon: 'light2',
        iconLabel: 'Освещение',
        title: 'Xiaomi Yeelight LED Smart Bulb',
        subtitle: 'Включено'
      },
      {
        icon: 'light',
        iconLabel: 'Освещение',
        title: 'D-Link Omna 180 Cam',
        subtitle: 'Включится в 17:00'
      },
      {
        icon: 'temp',
        iconLabel: 'Температура',
        title: 'Elgato Eve Degree Connected',
        subtitle: 'Выключено до 17:00'
      },
      {
        icon: 'light',
        iconLabel: 'Освещение',
        title: 'LIFX Mini Day & Dusk A60 E27',
        subtitle: 'Включится в 17:00'
      },
      {
        icon: 'light2',
        iconLabel: 'Освещение',
        title: 'Xiaomi Mi Air Purifier 2S',
        subtitle: 'Включено'
      },
      {
        icon: 'light',
        iconLabel: 'Освещение',
        title: 'Philips Zhirui',
        subtitle: 'Включено'
      },
      {
        icon: 'light',
        iconLabel: 'Освещение',
        title: 'Philips Zhirui',
        subtitle: 'Включено'
      },
      {
        icon: 'light2',
        iconLabel: 'Освещение',
        title: 'Xiaomi Mi Air Purifier 2S',
        subtitle: 'Включено'
      }
    ]
  },
  kitchen: {
    title: 'Кухня',
    items: [
      {
        icon: 'light2',
        iconLabel: 'Освещение',
        title: 'Xiaomi Yeelight LED Smart Bulb',
        subtitle: 'Включено'
      },
      {
        icon: 'temp',
        iconLabel: 'Температура',
        title: 'Elgato Eve Degree Connected',
        subtitle: 'Выключено до 17:00'
      }
    ]
  },
  hall: {
    title: 'Зал',
    items: [
      {
        icon: 'light',
        iconLabel: 'Освещение',
        title: 'Philips Zhirui',
        subtitle: 'Выключено'
      },
      {
        icon: 'light2',
        iconLabel: 'Освещение',
        title: 'Xiaomi Mi Air Purifier 2S',
        subtitle: 'Выключено'
      }
    ]
  },
  lights: {
    title: 'Лампочки',
    items: [
      {
        icon: 'light',
        iconLabel: 'Освещение',
        title: 'D-Link Omna 180 Cam',
        subtitle: 'Включится в 17:00'
      },
      {
        icon: 'light',
        iconLabel: 'Освещение',
        title: 'LIFX Mini Day & Dusk A60 E27',
        subtitle: 'Включится в 17:00'
      },
      {
        icon: 'light2',
        iconLabel: 'Освещение',
        title: 'Xiaomi Mi Air Purifier 2S',
        subtitle: 'Включено'
      },
      {
        icon: 'light',
        iconLabel: 'Освещение',
        title: 'Philips Zhirui',
        subtitle: 'Включено'
      }
    ]
  },
  cameras: {
    title: 'Камеры',
    items: [
      {
        icon: 'light2',
        iconLabel: 'Освещение',
        title: 'Xiaomi Mi Air Purifier 2S',
        subtitle: 'Включено'
      }
    ]
  }
};
for (let i = 0; i < 6; ++i) {
  TABS.all.items = [...TABS.all.items, ...TABS.all.items];
}
const TABS_KEYS = Object.keys(TABS);

export const Main = () => {
  const ref = useRef(null);
  const initedRef = useRef(false);
  const sizesRef = useRef([]);
  const [activeTab, setActiveTab] = useState('all');
  const [hasRightScroll, setHasRightScroll] = useState(false);

  useEffect(() => {
    if (!initedRef.current) {
      initedRef.current = true;
      const tabFromUrl = new URLSearchParams(window.location.search).get('tab');
      setActiveTab(tabFromUrl || 'all');
    }
  }, []);

  useEffect(() => {
    sizesRef.current = [];
  }, [activeTab]);

  const onSize = useCallback(
    (size) => {
      sizesRef.current.push(size);
      if (sizesRef.current.length === TABS[activeTab].items.length) {
        const sumWidth = sizesRef.current.reduce(
          (acc, item) => acc + item.width,
          0
        );
        const wrapperWidth = ref.current?.offsetWidth || 0;
        setHasRightScroll(sumWidth > wrapperWidth);
      }
    },
    [activeTab]
  );

  const onArrowCLick = () => {
    if (!ref.current) return;
    const panels = Array.from(ref.current.children);
    const scroller = panels.find(
      (el) =>
        el.classList.contains(s['section__panel']) &&
        !el.classList.contains(s['section__panel_hidden'])
    );
    if (scroller) {
      scroller.scrollTo({
        left: scroller.scrollLeft + 400,
        behavior: 'smooth'
      });
    }
  };

  return (
    <main className={s.main}>
      <section className={`section ${s.general}`}>
        <h2
          className={`${s['section__title']} ${s['section__title-header']} ${s['section__main-title']}`}
        >
          Главное
        </h2>
        <HeroDashboard />
      </section>

      <section className={`${s.section} ${s.scripts}`}>
        <h2 className={`${s['section__title']} ${s['section__title-header']}`}>
          Избранные сценарии
        </h2>

        <EventGrid />
      </section>

      <section className={`${s.section} ${s.devices}`}>
        <div className={s['section__title']}>
          <h2 className={s['section__title-header']}>Избранные устройства</h2>

          <select
            className={s['section__select']}
            defaultValue="all"
            onChange={(e) => setActiveTab(e.target.value)}
          >
            {TABS_KEYS.map((key) => (
              <option key={key} value={key}>
                {TABS[key].title}
              </option>
            ))}
          </select>

          <ul role="tablist" className={s['section__tabs']}>
            {TABS_KEYS.map((key) => (
              <li
                key={key}
                role="tab"
                aria-selected={key === activeTab ? 'true' : 'false'}
                tabIndex={key === activeTab ? '0' : undefined}
                className={
                  s['section__tab'] +
                  (key === activeTab ? ` ${s['section__tab_active']}` : '')
                }
                id={`tab_${key}`}
                aria-controls={`panel_${key}`}
                onClick={() => setActiveTab(key)}
              >
                {TABS[key].title}
              </li>
            ))}
          </ul>
        </div>

        <div className={s['section__panel-wrapper']} ref={ref}>
          {TABS_KEYS.map((key) => (
            <div
              key={key}
              role="tabpanel"
              className={
                s['section__panel'] +
                (key === activeTab ? '' : ` ${s['section__panel_hidden']}`)
              }
              aria-hidden={key === activeTab ? 'false' : 'true'}
              id={`panel_${key}`}
              aria-labelledby={`tab_${key}`}
            >
              <ul className={s['section__panel-list']}>
                {TABS[key].items.map((item, index) => (
                  <Event key={index} {...item} onSize={onSize} />
                ))}
              </ul>
            </div>
          ))}
          {hasRightScroll && (
            <div className={s['section__arrow']} onClick={onArrowCLick}></div>
          )}
        </div>
      </section>
    </main>
  );
};
