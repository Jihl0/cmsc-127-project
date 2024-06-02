import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ModifyEstab() {
    const [name, setName] = useState('');
    const [averageRating, setAverageRating] = useState('');
    const [address, setAddress] = useState('');
    const [establishments, setEstablishments] = useState([]);
    const [selectedEstablishment, setSelectedEstablishment] = useState(null);

    useEffect(() => {
        async function fetchEstablishments() {
            try {
                const response = await axios.get('http://localhost:5000/estabs');
                setEstablishments(response.data);
            } catch (error) {
                console.error('Error fetching establishments:', error);
            }
        }

        fetchEstablishments();
    }, []);

    const handleAddEstablishment = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/add-establishment', {
                name,
                averageRating,
                address
            });
            alert('Establishment added');
            setName('');
            setAverageRating('');
            setAddress('');
            location.reload()   
        } catch (error) {
            console.error('Error adding establishment:', error);
            alert('Error adding establishment');
        }
    };

    const handleUpdateEstablishment = async (e) => {
        e.preventDefault();
        if (!selectedEstablishment) {
            alert('Please select an establishment to update');
            return;
        }

        try {
            await axios.put(`http://localhost:5000/update-establishment/${selectedEstablishment.EstablishmentID}`, {
                name,
                averageRating,
                address
            });
            alert('Establishment updated');
            setName('');
            setAverageRating('');
            setAddress('');
            location.reload()
        } catch (error) {
            console.error('Error updating establishment:', error);
            alert('Error updating establishment');
        }
    };

    const handleDeleteEstablishment = async (e) => {
        e.preventDefault();
        if (!selectedEstablishment) {
            alert('Please select an establishment to delete');
            return;
        }

        try {
            await axios.delete(`http://localhost:5000/delete-establishment/${selectedEstablishment.EstablishmentID}`);
            alert('Establishment deleted');
            location.reload()
            setSelectedEstablishment(null);
        } catch (error) {
            console.error('Error deleting establishment:', error);
            alert('Error deleting establishment');
        }
    };

    const handleEstablishmentSelect = (e) => {
        const establishmentId = e.target.value;
        const establishment = establishments.find(est => est.EstablishmentID == establishmentId);
        setSelectedEstablishment(establishment);
        setName(establishment?.Name || '');
        setAverageRating(establishment?.AverageRating || '');
        setAddress(establishment?.Address || '');
    };

    return (
        <div className='page-container'>
            <h1>Modify Establishments</h1>

            <form onSubmit={handleAddEstablishment}>
                <h2>Add Establishment</h2>
                <input
                    type='text'
                    placeholder='Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type='number'
                    placeholder='Average Rating'
                    value={averageRating}
                    onChange={(e) => setAverageRating(e.target.value)}
                    required
                />
                <input
                    type='text'
                    placeholder='Address'
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                />
                <button type='submit'>Add</button>
            </form>

            <form onSubmit={handleUpdateEstablishment}>
                <h2>Update Establishment</h2>
                <select onChange={handleEstablishmentSelect} value={selectedEstablishment?.EstablishmentID || ''}>
                    <option value='' disabled>Select an establishment to update</option>
                    {establishments.map((establishment) => (
                        <option key={establishment.EstablishmentID} value={establishment.EstablishmentID}>
                            {establishment.Name}
                        </option>
                    ))}
                </select>
                {selectedEstablishment && (
                    <>
                        <input
                            type='text'
                            placeholder='Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <input
                            type='number'
                            placeholder='Average Rating'
                            value={averageRating}
                            onChange={(e) => setAverageRating(e.target.value)}
                            required
                        />
                        <input
                            type='text'
                            placeholder='Address'
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                        <button type='submit'>Update</button>
                    </>
                )}
            </form>

            <form onSubmit={handleDeleteEstablishment}>
                <h2>Delete Establishment</h2>
                <select onChange={handleEstablishmentSelect} value={selectedEstablishment?.EstablishmentID || ''}>
                    <option value='' disabled>Select an establishment to delete</option>
                    {establishments.map((establishment) => (
                        <option key={establishment.EstablishmentID} value={establishment.EstablishmentID}>
                            {establishment.Name}
                        </option>
                    ))}
                </select>
                {selectedEstablishment && (
                    <button type='submit'>Delete</button>
                )}
            </form>

                

        </div>
    );
}

export default ModifyEstab;
