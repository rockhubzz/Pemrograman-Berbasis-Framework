import styles from './navbar.module.css';
import { signIn, signOut, useSession } from "next-auth/react"
import Image from 'next/image'
import Script from 'next/script';

const Navbar = () => {
  const { data }: any = useSession()
  // const { data: session } = useSession()
  // console.log("session", session)
  return (
    <div className={styles.navbar}>
      {/* <div className={styles.navbar__brand}>
        MyApp
      </div> */}

      <div className={styles.navbar__brand} id='title'></div>
      <Script id='title-script' strategy='lazyOnload'>
        {`document.getElementById('title').innerHTML = 'MyApp';`}
      </Script>

      <div className={styles.navbar__right}>
        {data ? (
          <>
            <div className={styles.navbar__user}>
              Welcome, {data.user?.fullname}
              {data.user?.image && (
                <div className={styles.navbar__user__image_wrapper}>
                  <Image
                    src={data.user.image}
                    alt="User Image"
                    width={42}
                    height={42}
                    priority={false}
                  />
                </div>
              )}
            </div>
            <button
              className={`${styles.navbar__button} ${styles["navbar__button--danger"]}`}
              onClick={() => signOut()}
            >
              Sign Out
            </button>
          </>
        ) : (
          <button
            className={`${styles.navbar__button} ${styles["navbar__button--primary"]}`}
            onClick={() => signIn()}
          >
            Sign In
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;