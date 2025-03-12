import React from "react";
import styled from "styled-components/native";
import { Text } from "react-native";
const Container = styled.View`
    flex: 1;
    background-color: #fff;
    justify-content: center;
    align-items: center;
`;

const App = () => {
    return (
        <Container>
            <Text>Hello</Text>
        </Container>
    );
};

export default App;
