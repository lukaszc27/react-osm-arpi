import React, {useState} from 'react';
import styled from 'styled-components';
// import {map, setPosition} from './Map';
// import {OSMResponse} from './SearchBar';

const Wrapper = styled.span`
    background-color: white;
    border-radius: 6px;
    font-size: .9em;
    color: black;
    padding: .4em .8em;
    margin: .5em;
    transition: all .3s;
    display: flex;
    position: relative;

    &:hover { box-shadow: 0px 0px 12px #4a4a4a; }
`;

const Text = styled.p`
    margin: 0;
    padding: 0;
`;

const Button = styled.button`
    background: transparent;
    margin: 0;
    padding: 0;
    border: none;
    margin-left: .6em;
`;

interface LabelProps {
    onClick: any
}

const Label : React.FC<LabelProps> = (props) => {
    const [visible, setVisible] = useState<boolean>(true);

    const closeButtonHandle = (event: React.MouseEvent<HTMLButtonElement>) => {
        setVisible(false);
    }

    // const labelClickHandle = (item : OSMResponse) => {
    // }

    return (
        <>
        {visible && 
        <Wrapper>
            <Text onClick={props.onClick}>{props.children}</Text>
            <Button onClick={closeButtonHandle}>[X]</Button>
        </Wrapper>
        }
        </>
    )
}
export default Label;