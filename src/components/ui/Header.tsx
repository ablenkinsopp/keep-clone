import Avatar from "./Avatar";
import { Logo } from "./Brand";

const Header = () => {
    return (
        <header className="flex items-center justify-between bg-slate-100 dark:bg-slate-900 text-slate-950 dark:text-slate-50 border-b border-b-slate-200 dark:border-b-slate-800 px-2 lg:px-4 h-10 lg:h-12 ">
            <Logo className="h-3.5 md:h-4 lg:h-5" />
            <Avatar inHeader={true} />
        </header>
    );
};

export default Header;
