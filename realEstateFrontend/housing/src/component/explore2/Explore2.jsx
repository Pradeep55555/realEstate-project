
import React,{useState} from 'react'
import '../explore/explore.css'  // by default infort through another component

import img1 from './img1.webp'
import img2 from './img2.jpg'
import img3 from './img3.jpg'
import img4 from './img4.jpg'
import img5 from './img5.jpg'

const categories = {
    News: [
        { img: img2, title: 'Real estate trends in Q4 of FY 2024-25', date: 'Mar 06, 2025' },
        { img: img3, title: 'Bihar govt disburs 1,200 cr under PM', date: 'Mar 06, 2025' },
        { img: img4, title: 'Committee for Noida Sports City cases', date: 'Mar 06, 2025' },
        { img: img5, title: 'HC cancels land ac for NMI Airport', date: 'Mar 06, 2025' },
        { img: img2, title: 'Extra Article 1', date: 'Mar 07, 2025' },
        { img: img3, title: 'Extra Article 2', date: 'Mar 08, 2025' },
        { img: img4, title: 'Extra Article 3', date: 'Mar 09, 2025' },
    ],
    'Tax & Legal': [
        { img: img3, title: 'Tax benefits on home loan EMIs', date: 'Feb 20, 2025' },
        { img: img5, title: 'RERA compliance for new buyers', date: 'Feb 12, 2025' },
        { img: img4, title: 'Legal checklist for land purchase', date: 'Feb 10, 2025' },
        { img: img2, title: 'Stamp duty explained', date: 'Feb 02, 2025' },
        { img: img3, title: 'GST on Under-construction Projects', date: 'Feb 03, 2025' },
        { img: img5, title: 'Title verification process', date: 'Feb 04, 2025' },
    ],
    Investment: [
        { img: img4, title: 'Best cities for property ROI in 2025', date: 'Jan 14, 2025' },
        { img: img2, title: 'Investing in Tier-2 cities', date: 'Jan 10, 2025' },
        { img: img5, title: 'Tips for first-time property investors', date: 'Jan 05, 2025' },
        { img: img3, title: 'Rental yield vs appreciation', date: 'Jan 01, 2025' },
        { img: img4, title: 'Best cities for property ROI in 2025', date: 'Jan 14, 2025' },
        { img: img2, title: 'Investing in Tier-2 cities', date: 'Jan 10, 2025' },
    ],
    'Help Guides': [
        { img: img5, title: 'Complete Home Buying Guide', date: 'Dec 25, 2024' },
        { img: img1, title: 'Loan Approval Tips', date: 'Dec 20, 2024' },
        { img: img3, title: 'Mistakes to Avoid When Buying', date: 'Dec 15, 2024' },
        { img: img4, title: 'Documents You Need to Buy Property', date: 'Dec 10, 2024' },
        { img: img5, title: 'Complete Home Buying Guide', date: 'Dec 25, 2024' },
        { img: img1, title: 'Loan Approval Tips', date: 'Dec 20, 2024' },
    ],
};

function Explore2() {
    const [selectedCategory, setSelectedCategory] = useState('News');
    const [visibleStart, setVisibleStart] = useState(0);
    const itemsPerPage = 6;

    const handleNext = () => {
        const total = categories[selectedCategory].length;
        if (visibleStart + itemsPerPage < total) {
            setVisibleStart(visibleStart + itemsPerPage);
        }
    };

    const handlePrev = () => {
        if (visibleStart - itemsPerPage >= 0) {
            setVisibleStart(visibleStart - itemsPerPage);
        }
    };

    return (
        <div className="explore-wrapper">
            <div className="explore1">
                <div className="image-explore">
                    <img src={img1} alt="explore-img" />
                </div>
                <div className="content">
                    <p className='content-paragraph1'>Rent A HOME</p>
                    <span>Rental Homes for Everyone</span>
                    <p className='content-paragraph2'>Explore from Apartments, builder floors, villas and more</p>
                    <button>Explore Renting</button>
                </div>
            </div>

            <div className="explore2">
                <div className="explore2-left">
                    <div className='5'>
                        <span>Best Renting Advice by Our Top Editors</span>
                        <p>Read from Beginners check-list to Pro Tips</p>
                    </div>
                     <div className="tab">
                        {Object.keys(categories).map(cat => (
                            <span
                                key={cat}
                                onClick={() => {
                                    setSelectedCategory(cat);
                                    setVisibleStart(0);
                                }}
                                className={selectedCategory === cat ? 'active-tab' : ''}
                            >
                                {cat}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="explore2-right">
                    <div className="explore2-right-bottom scrollable">
                        {categories[selectedCategory].map((item, index) => (
                            <div className="article-card" key={index}>
                                <img src={item.img} alt="" />
                                <div>
                                    <span className='ex-span1'>{item.title}</span>
                                    <span className='ex-span2'>{item.date}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <p className="scroll-footer">Read realty news, guides & articles --</p>
                </div>
            </div>
        </div>
    );
}

export default Explore2;