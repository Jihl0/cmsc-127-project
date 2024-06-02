import '../style/default.css';

export default function Card_FoodReview() {


  // sort and filter functions here


  return(
    <div className='food-reviews-container'>

      <div className='drop-down-container'>
          <p className='food-reviews-heading'><b>Food Reviews</b></p>
          <label className='sort-attribute' htmlFor="sort-attribute-menu"><b>Sort by:</b></label>
          <select id="sort-attribute-menu" onChange={handleSortAttributeChange}>
            <option className='option' value="name">Name (A-Z)</option>
            <option className='option' value="type">Name (Z-A)</option>
            <option className='option' value="price">Price</option>
          </select>

          <label className='filter-reviews' htmlFor="filter-reviews-menu"><b>Filter</b></label>
          <select id="filter-reviews-menu" onChange={handleSortOrderChange}>
            <option className='option' value="food-type">Food Type</option>
            <option className='option' value="atleast-3"> At least 3 stars </option>
            <option className='option' value="under-3"> Under 3 stars </option>
          </select>
      </div>  

      <div className='food-reviews'>
        <div className='food-review-card'>
        {/* map the food reviews fields here */}
        </div> 
      </div>

    </div>
  )
}
