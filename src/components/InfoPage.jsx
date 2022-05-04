import React from 'react';
import { useNavigate } from 'react-router-dom';

const InfoPage = () => {
    const navigate = useNavigate();
    return(
        <main>
        <p>test</p>
        <button type="button" onClick={() => navigate('/')}>Back</button>
       </main>
    );
};

export default InfoPage;