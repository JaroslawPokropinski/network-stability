import { useEffect, useState } from 'react';
import { PingChart } from '../../components/PingChart';
import { ping } from '../../util/ping';
import styles from './MainView.module.scss';

export function MainView() {
  const [pings, setPings] = useState<number[]>([]);
  useEffect(() => {
    const interv = setInterval(() => {
      const start = Date.now();
      ping()
        .then(() =>
          setPings((oldPings) => [...oldPings, Date.now() - start].slice(-100))
        )
        .catch(() => setPings((oldPings) => [...oldPings, 1000].slice(0, 100)));
    }, 1000);
    return () => clearInterval(interv);
  }, []);

  return (
    <div className={styles.mainView}>
      <PingChart timings={pings} />
    </div>
  );
}
