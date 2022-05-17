import React from 'react';
import { useNavigate } from 'react-router-dom';
import Map from '../components/Map'
import Header from "../components/Header";
import Footer from "../components/Footer";

const Home = () => {
    return (
        <main>
            <Header />
            <Map />
            <Footer />

        </main>
    );
};

export default Home;