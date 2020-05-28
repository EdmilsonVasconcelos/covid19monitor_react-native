import styled from "styled-components";

export const ContainerCard = styled.SafeAreaView`
    alignItems: center;
    justifyContent: center;
    margin-right: 10px;
    border-radius: 5px;
    height: 120px;
    width: 160px;
    shadowOpacity: 0.75;
    shadowRadius: 5px;
    shadowColor: black;
    background-color: ${props => props.backgroundColor};
`;

export const CardTitle = styled.Text`
    color: #fff;
    font-size: 30px;
    font-weight: bold;
`;

export const CardText = styled.Text`
    color: #fff;
    font-size: 20px;
    font-weight: bold;
`;