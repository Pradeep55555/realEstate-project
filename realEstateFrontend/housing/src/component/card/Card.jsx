// import React from 'react'
// import './card.css'
// import img1 from './img1.png'
// import img2 from './img2.png'
// import img3 from './img3.png'
// import img4 from './img4.png'
// import img5 from './img5.png'

// function Card() {
//     return (
//         <>
//             <div className="card-container">
//                 <div className='text-button-div'>
//                     <p><span>Insights & Tools </span><br />
//                         Go from browsing to buying</p>
//                     <button>View all Insights</button>
//                 </div>
//                 <div className="cards">
//                     <div className="card1">
//                         <div className="circle"><img src={img1} alt="" /></div>
//                         <p><span>Price Trends </span><br />
//                             Check property rates and prices</p>
//                     </div>
//                     <div className="card1">
//                         <div className="circle"><img src={img2} alt="" /></div>
//                         <p><span>Locality Insights </span><br />
//                             Know more about diffrent localities</p>
//                     </div>
//                     <div className="card1">
//                         <div className="circle"><img src={img3} alt="" /></div>
//                         <p><span>Genuine reviews by Residents</span><br />
//                             Know what residents are saying</p>
//                     </div>
//                     <div className="card1">
//                         <div className="circle"><img src={img4} alt="" /></div>
//                         <p><span>Transaction Prices</span><br />
//                             Check property transaction value</p>
//                     </div>
//                 </div>

//             </div>
//             <div className="text">
//                 <p>ALL PROPERTY NEEDS - ONE PORTAL <br />
//                     <span>Find Better Places to Live, Work </span><br />
//                     <span>and Wonder...</span>
//                 </p>
//             </div>
//         </>
//     )
// }

// export default Card







import React from 'react';
import './card.css';
import img1 from './img1.png';
import img2 from './img2.png';
import img3 from './img3.png';
import img4 from './img4.png';
import img5 from './img5.png'; // Note: img5 is unused

function Card() {
    return (
        <>
            <div className="card-container">
                <div className="text-button-div">
                    <p>
                        <span>Insights & Tools </span><br />
                        Go from browsing to buying
                    </p>
                    <button>View all Insights</button>
                </div>
                <div className="cards">
                    <div className="card1">
                        <div className="circle"><img src={img1} alt="" /></div>
                        <p><span>Price Trends </span><br /><br />
                            Check property rates and prices</p>
                    </div>
                    <div className="card1">
                        <div className="circle"><img src={img2} alt="" /></div>
                        <p><span>Locality Insights </span><br /><br />
                            Know more about diffrent localities</p>
                    </div>
                    <div className="card1">
                        <div className="circle"><img src={img3} alt="" /></div>
                        <p><span>Genuine reviews by Residents</span><br /><br />
                            Know what residents are saying</p>
                    </div>
                    <div className="card1">
                        <div className="circle"><img src={img4} alt="" /></div>
                        <p><span>Transaction Prices</span><br /><br />
                            Check property transaction value</p>
                    </div>
                    <div className="card1">
                        <div className="circle"><img src={img1} alt="" /></div>
                        <p><span>Price Trends </span><br /><br />
                            Check property rates and prices</p>
                    </div>
                </div>
            </div>

            <div className="text">
                <p>
                    <p>ALL PROPERTY NEEDS - ONE PORTAL</p> 
                    <p><span>Find Better Places to Live, Work </span><br />
                    <span>and Wonder...</span></p>
                </p>
            </div>
        </>
    );
}

export default Card;
