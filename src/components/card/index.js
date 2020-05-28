import React from 'react';
import { ContainerCard, CardTitle, CardText } from './style.js';

export default function card(props) {
    return (
        <ContainerCard backgroundColor={props.backgroundColor}>
            <CardTitle>{props.title}</CardTitle>
            <CardText>{props.text}</CardText>
        </ContainerCard >
    );
}


