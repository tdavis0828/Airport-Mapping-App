import React from 'react';
import styled from 'styled-components';

const Rate = styled.div`
border: 1px solid black;
width: 80px;
`

const Rating = () => {


return (
<Rate>
    <i class="fa fa-star"></i>
    <i class="fa fa-star"></i>
    <i class="fa fa-star"></i>
    <i class="fa fa-star"></i>
    <i class="fa fa-star"></i>
</Rate>
);
};

export default Rating;