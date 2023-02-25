import { FC } from 'react';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { IProviders } from '../../types';

import styles from './login.module.css';

interface ILoginProps {
  providers: IProviders;
}

const Login: FC<ILoginProps> = ({ providers }) => {
  return (
    <div className={styles.login}>
      <Image src='https://rb.gy/ogau5a' width={150} height={150} objectFit='contain' alt='' />
      <div>
        {Object.values(providers).map((provider) => (
          <div key={provider.name} className={styles.login__provider}>
            {/* https://devdojo.com/tailwindcss/buttons#_ */}
            <button
              className={`${styles.login__button} group`}
              onClick={() => signIn(provider.id, { callbackUrl: '/' })}
            >
              <span
                className={`
                ${styles.login__button_background}
                group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0
              `}
              ></span>

              <span
                className={`
                ${styles.login__button_text}
                group-hover:text-white
              `}
              >
                Sign in with {provider.name}
              </span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Login;
