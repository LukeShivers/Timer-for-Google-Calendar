import { React } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/Home.jsx'
import Timer from './pages/Timer.jsx'
import { useLoadContext } from './contexts/LoadedContext.jsx'


export default function App() {
    
    const { calLoaded, updateCalLoad } = useLoadContext();

    return (
        <main className='absolute w-full h-[150vh] bg-dark overflow-hidden'>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={!calLoaded ? <Home /> : <Navigate to="/timer" />} />
                    <Route path="/timer" element={calLoaded ? <Timer /> : <Navigate to="/" />} />
                </Routes>
            </BrowserRouter> 
        </main>
    )
}