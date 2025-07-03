import { useCallback, useEffect, useRef, useState } from 'react';
import { Event } from '../Event/Event';
import { EventGrid } from '../EventGrid/EventGrid';
import { HeroDashboard } from '../HeroDashboard/HeroDashboard';
import './Main.css';

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
  const sizesRef = useRef([]);
  const [activeTab, setActiveTab] = useState(() => {
    return new URLSearchParams(window.location.search).get('tab') || 'all';
  });
  const [hasRightScroll, setHasRightScroll] = useState(false);

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

  const onArrowClick = useCallback(() => {
    if (!ref.current) return;
    const scroller = Array.from(ref.current.children).find(
      (el) =>
        el.classList.contains('section__panel') &&
        !el.classList.contains('section__panel_hidden')
    );
    if (scroller) {
      scroller.scrollTo({
        left: scroller.scrollLeft + 400,
        behavior: 'smooth'
      });
    }
  }, []);

  const onSelectInput = useCallback((event) => {
    setActiveTab(event.target.value);
  }, []);

  return (
    <main className="main">
      <section className="section main__general">
        <h2 className="section__title section__title-header section__main-title">
          Главное
        </h2>
        <HeroDashboard />
      </section>

      <section className="section main__scripts">
        <h2 className="section__title section__title-header">
          Избранные сценарии
        </h2>

        <EventGrid />
      </section>

      <section className="section main__devices">
        <div className="section__title">
          <h2 className="section__title-header">Избранные устройства</h2>

          <select
            className="section__select"
            defaultValue="all"
            onInput={onSelectInput}
          >
            {TABS_KEYS.map((key) => (
              <option key={key} value={key}>
                {TABS[key].title}
              </option>
            ))}
          </select>

          <ul role="tablist" className="section__tabs">
            {TABS_KEYS.map((key) => (
              <li
                key={key}
                role="tab"
                aria-selected={key === activeTab ? 'true' : 'false'}
                tabIndex={key === activeTab ? '0' : undefined}
                className={
                  'section__tab' +
                  (key === activeTab ? ' section__tab_active' : '')
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

        <div className="section__panel-wrapper" ref={ref}>
          {TABS_KEYS.map((key) => (
            <div
              key={key}
              role="tabpanel"
              className={
                'section__panel' +
                (key === activeTab ? '' : ' section__panel_hidden')
              }
              aria-hidden={key === activeTab ? 'false' : 'true'}
              id={`panel_${key}`}
              aria-labelledby={`tab_${key}`}
            >
              <ul className="section__panel-list">
                {TABS[key].items.map((item, index) => (
                  <Event key={index} {...item} onSize={onSize} />
                ))}
              </ul>
            </div>
          ))}
          {hasRightScroll && (
            <div className="section__arrow" onClick={onArrowClick}></div>
          )}
        </div>
      </section>
    </main>
  );
};
