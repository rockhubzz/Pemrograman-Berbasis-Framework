import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { Roboto } from "next/font/google";

const Navbar = dynamic(() => import("../navbar"), {
  ssr: false,
  loading: () => <div style={{ height: "70px", background: "#f0f0f0" }} />,
});

const Footer = dynamic(() => import("../footer"), {
  ssr: false,
  loading: () => <div style={{ height: "200px", background: "#f0f0f0" }} />,
});

const roboto = Roboto({
    subsets: ['latin'],
    weight: ['400', '500', '700']
});

const disableNavbar = ['/auth/login', '/auth/register', '/404'];

type AppShellProps = {
    children: React.ReactNode;
}

const AppShell = (props: AppShellProps) => {
    const { children } = props;
    const { pathname } = useRouter();

    return (
        <main className={roboto.className}>
            {!disableNavbar.includes(pathname) && <Navbar />}
            {children}
        </main>
    );
};

export default AppShell;