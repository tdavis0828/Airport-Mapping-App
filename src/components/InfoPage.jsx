import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { getAirports } from '../utils/API';
import styled, {createGlobalStyle} from 'styled-components';
import plane from './IMGs/plane.jpg';
import airport from './IMGs/airport.jpg';

const Body  = createGlobalStyle`
    body{
        background-color: #D9D1CE;
        font-family: 'Courier Prime';
        margin-left: 0px;
        margin-right: 0px;
    }
`;

const Wrapper = styled.section`
        p {
            color: #555;
            font-size: 13px;
        }
        h1::first-line {
            text-transform: capitalize;
        }
        p::first-line {
            text-transform: capitalize;
        }

        div {
            background-color: white;
            max-width: 80%;
            padding: 2%;
            display: flex;
            flex-direction: column;
            align-items: center;
            box-shadow: 12px 0 15px -4px rgba(31, 73, 125, 0.8), -12px 0 8px -4px rgba(31, 73, 125, 0.8); 
            
            img {
                width: 100%;
                height: 350px;
                margin: 2%;
            }
                div {
                   margin-left: 35%;
                   border: solid red 1px;
                    
                }
                h1 {
                    font-size: 35px;
                }
        
                h2 {
                    text-transform: capitalize;
                }
                ul{
                    
                    text-transform: lowercase;
                    color: #555;
                    padding-left: 0px;
                    font-size: 13px;
                    line-height: 3;
                        li::first-line {
                            text-transform: capitalize;
                        }
                }
        }
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: lowercase;
    text-align: center;
    background-image: url(${plane});
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: center;
    background-size: 100% 100%;
    min-height: 800px;
    max-width: 70%;
    margin-top: 5rem;
    margin-left: 16%;
    box-shadow: 20px 15px 50px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

const Button = styled.button`
    padding: 5px;
    border-radius: 4px;
    border: solid 1px;
`;

const Text = styled.section`
    text-align: center;;
        ul {
            list-style-type: none;
        }
        
`



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
                    <img src={airport} alt="airport picture" />
                    <Text>
                    <h1>{facility_name}</h1>
                    <p>{facility_name} is located in {city}, {state_full} {county} </p>
                    <h2>Our Facilty Info:</h2>
                    <ul>
                        <li>manager: {manager} manager </li>
                        <li>phone: {manager_phone}</li>
                        <li>status of our facility: {status}</li>
                        <li>military landing availability: {military_landing}</li>
                        <li>control tower status: {control_tower}</li>
                        
                    </ul>
                    </Text>
                    {/* <Button type="button" onClick={() => navigate('/')}>Back <i class="fa fa-plane"></i></Button> */}
                </div>
            </Wrapper>
       </main>
    );
};

export default InfoPage;
