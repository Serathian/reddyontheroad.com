'use client';

import Link from 'next/link';
import styles from './Header.module.css';

interface HeaderProps {
  className?: string;
}

export default function Header({ className }: HeaderProps) {
  return (
    <header className={`${styles.header} ${className || ''}`}>
      <div className={styles.container}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          reddy on the road
        </Link>
      </div>
    </header>
  );
}
