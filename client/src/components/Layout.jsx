import { Outlet } from "react-router-dom"

const Layout = () => {
    return (
        <main className='absolute w-full h-[150vh] bg-dark overflow-hidden'>
            <Outlet />
        </main>
    )
};

export default Layout