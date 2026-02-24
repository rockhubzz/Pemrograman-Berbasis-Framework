import Footer from "../footer";
import Navbar from "../navbar";

type AppShellProps = {
    children: React.ReactNode;
}

const AppShell = (props: AppShellProps) => {
    const { children } = props;

    return (
        <main>
            <Navbar />
            {children}
            <Footer />
        </main>
    );
};

export default AppShell;