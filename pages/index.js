import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>twitter</title>
        <link rel="icon" href="favicon.ico" />
      </Head>
    </div>
  );
}
