import React from 'react';

function Homepage() {
return (
    <div className='page-container'> 
    <h1> HOMEPAGE </h1>
    
        <div className='floating-container'> 

            <div className='food-establishtments'> 
            <h2> Food Establishments </h2>
                <FoodEstablishmentCards />
            </div>

            <div className='food-reviews'> 
            <h2> Food Reviews </h2>
                <FoodReviewCards />
            </div>

        </div>
    </div>

  )
}

export default Homepage;