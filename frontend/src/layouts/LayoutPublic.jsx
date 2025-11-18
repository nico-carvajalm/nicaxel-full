import React from 'react';
import { Outlet } from 'react-router-dom';
import BannerNavbar from '../components/BannerNavbar';
import Footer from '../components/Footer';

export default function LayoutPublic() {
    return (
        <>
        <BannerNavbar />
        <main>
            <Outlet /> {}
        </main>
        <Footer />
        </>
    );
}
