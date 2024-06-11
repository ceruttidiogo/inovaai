"use client";

import styles from "./page.module.css";
import headerItems from "./api/homeHeader/homeHeader.json";
import logo from "./images/logo.jpeg";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <img src={logo.src} className={styles.logo} />
        {headerItems.options.map((r, i) => (
          <div
            style={{
              fontSize: "24px",
            }}
            key={i}
          >
            {r}
          </div>
        ))}
      </div>
    </main>
  );
}
