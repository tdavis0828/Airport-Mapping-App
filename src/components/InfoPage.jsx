import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { getAirports } from '../utils/API';
import styled, {createGlobalStyle} from 'styled-components';
import plane from './IMGs/plane.jpg'


const Body  = createGlobalStyle`
    body{
        background-color: #D9D1CE;
    }
`;

const Wrapper = styled.section`
    text-transform: lowercase;
        h1::first-line {
            text-transform: capitalize;
        }
        p::first-line {
            text-transform: capitalize;
        }
        div{
            
            display: flex;
            background-color: white;
            min-height: 800px;
            max-width: 75%;
            margin-left: 7%;
            flex-direction: column;
            justify-content: center;
            align-items: center;
                h3{
                    text-trasform: uppercase;
                    border: solid 1px red;
                }
                ul{
                    text-transform: lowercase;
                        li::first-line {
                            text-transform: capitalize;
                        }
                }
        }
    text-align: center;
    background-image: url(${plane});
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: center;
    background-size: 100% auto;
    min-height: 800px;
    max-width: 70%;
    margin-top: 2%;
    margin-left: 16%;
    box-shadow: 20px 15px 50px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

const Button =styled.button`
    height: 30px;
    padding: 5px;
    border-radius: 4px;
    border: solid 1px;
`;




const InfoPage = () => {
    const navigate = useNavigate();
    const [cards, setCards] = useState([]);
    const { siteNum } = useParams();

    useEffect(() => {
        getAirports(siteNum)
          .then(({ data: card }) => setCards(card))
          .catch((err) => console.log(err));
    }, [getAirports, siteNum]);
   

    const { state_full, city, county, manager, manager_phone, military_landing, control_tower, status, facility_name, faa_ident  } = cards[siteNum] ? cards[siteNum][0] : '';
    
    return(
        <main>
            <Body />
            <Wrapper>
                <div>
                  
                    <h1>{facility_name}</h1>
                    <h3>{faa_ident}</h3>
                    <p>{facility_name} is located in {city}, {state_full} {county} </p>
                    <ul>
                         <h2>Our Facilty Info:</h2>
                        <li>manager: {manager} manager phone: {manager_phone}</li>
                        <li>status of our facility: {status}</li>
                        <li>military landing availability: {military_landing}</li>
                        <li>control tower status: {control_tower}</li>
                        
                    </ul>
                    
                    <Button type="button" onClick={() => navigate('/')}>Back <i class="fa fa-plane"></i></Button>
                </div>
            </Wrapper>
       </main>
    );
};

export default InfoPage;
