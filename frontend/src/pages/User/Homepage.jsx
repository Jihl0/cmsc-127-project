import { Routes, Route, Link, Navigate } from 'react-router-dom';
import ViewTab from '../components/viewTab';
import ModifyEstab from '../components/modifyEstab';
import SearchTab from '../components/searchTab';
import ModifyFood from '../components/modifyFood';
import ModifyEstabReview from '../components/modifyEstabRev.jsx';
import ModifyFoodReview from '../components/modifyFoodRev.jsx';

import '../../style/User/homepage.css';

export default function Homepage() {
  return (
    <div className="homepage-container">
      <nav>
        <ul>
          <li>
            <Link to="view">View</Link>
          </li>
          <li>
            <Link to="modifyestab">Modify Establishment</Link>
          </li>
          <li>
            <Link to="modifyfood">Modify Food</Link>
          </li>
          <li>
            <Link to="modifyestabrev">Modify Establishment Reviews</Link>
          </li>
          <li>
            <Link to="modifyfoodrev">Modify Food Reviews</Link>
          </li>
          <li>
            <Link to="search">Search</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Navigate to="view" />} />
        <Route path="view" element={<ViewTab />} />
        <Route path="modifyestab" element={<ModifyEstab />} />
        <Route path="modifyfood" element={<ModifyFood />} />
        <Route path="modifyestabrev" element={<ModifyEstabReview />} />
        <Route path="modifyfoodrev" element={<ModifyFoodReview />} />
        <Route path="search" element={<SearchTab />} />
      </Routes>
    </div>
  );
}
