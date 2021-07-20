import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { AppContext } from '../Context/AppContext';
import { useParams } from 'react-router-dom';

const StatsDiv = styled.div`
    width: 100vw;
    height: 100vh;
    background: ${props => props.theme.bodyBackground};
`;

export const Stats = () => {
    const { currentTheme, toggleTheme, theme } = React.useContext(AppContext)
    const [data, setData] = React.useState(null);
    const { code } = useParams();

    React.useEffect( () => {
        axios.get(`https://url-shortner-shortify.herokuapp.com/stats/${code}`)
        .then( res => setData(res.data) )
    } )
    return (
        <StatsDiv theme={theme}>
            {
                data && <div className='wrapper'>
                    <p>Total views - {data.views}</p>
                    {/* {data.userData.map( item =>  )} */}
                    {JSON.stringify(data)}
                </div> 
            } 
        </StatsDiv>
    )
}
