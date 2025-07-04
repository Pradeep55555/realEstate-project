
import React from 'react';
import './cardimg.css';
import img1 from './img1.webp';
import img2 from './img2.webp';
import img3 from './img3.webp';
import img4 from './img4.webp';
import img5 from './img5.webp';
import img6 from './img6.webp';

function Cardimg() {
    return (
        <div className="main">
            <p>GET STARTED WITH EXPLORING REAL ESTATE OPTIONS</p>
            <div className="images-scroll">
                <div className="image">
                    <img src={img1} alt="" />
                    <p>Buying a home</p>
                </div>
                <div className="image">
                    <img src={img2} alt="" />
                    <p>Renting a home</p>
                </div>
                <div className="image">
                    <img src={img3} alt="" />
                    <p>Invest in Real Estate</p>
                </div>
                <div className="image">
                    <img src={img4} alt="" />
                    <p>Sell/Rent your property</p>
                </div>
                <div className="image">
                    <img src={img5} alt="" />
                    <p>Plots/Land</p>
                </div>
                <div className="image">
                    <img src={img6} alt="" />
                    <p>Buying commercial spaces</p>
                </div>
            </div>
        </div>
    );
}

export default Cardimg;
