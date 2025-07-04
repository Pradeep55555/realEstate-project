import React from 'react'
import Navbar from '../navbar/Navbar';
import SearchDiv from '../searchDiv/SearchDiv'
import Cardimg from "../cardimg/Cardimg";
import Card from "../card/Card";
import Explore from "../explore/Explore";
import PropertyCard from '../propertyCard/PropertyCard';
import Explore2 from "../explore2/Explore2";
import Explore3 from "../explore3/Explore3";
import Explore4 from "../explore4/Explore4";
import Explore5 from "../explore5/Explore5";
import Footer from '../footer/Footer';

function Home() {
    return (
        <>
            <Navbar />
            <SearchDiv />
            <Cardimg />
            <Card />
            <Explore />
            <PropertyCard />
            <Explore2 />
            <Explore3 />
            <Explore4 />
            <Explore5 />
            <Footer/>
        </>
    )
}

export default Home