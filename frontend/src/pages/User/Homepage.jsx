import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import ViewTab from '../components/viewTab'
import ModifyEstab from '../components/modifyEstab';
import SearchTab from '../components/searchTab';
import ModifyFood from '../components/modifyFood';

function Homepage() {
    return (
        <div className='page-container'>
            <nav>
                <ul>
                    <li><Link to="view">View</Link></li>
                    <li><Link to="modifyestab">Modify Establishment</Link></li>
                    <li><Link to="modifyfood">Modify Food</Link></li>
                    <li><Link to="search">Search</Link></li>
                </ul>
            </nav>
            <Routes>
                <Route path="/" element={<Navigate to="view" />} />
                <Route path="view" element={<ViewTab />} />
                <Route path="modifyestab" element={<ModifyEstab />} />
                <Route path="modifyfood" element={<ModifyFood />} />
                <Route path="search" element={<SearchTab />} />
            </Routes>
        </div>
    );
}

export default Homepage;
