import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import { StatusBar } from "react-native";
import Input from "./components/Input";

const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${({ theme }) => theme.background};
    align-items: center;
    justify-content: flex-start;
`;

const Title = styled.Text`
    font-size: 40px;
    font-weight: 600;
    color: ${({ theme }) => theme.main};
    align-self: flex-start;
    margin: 20px;
`;

export default function App() {
    const [newTask, setNewTask] = useState("");

    const _addTask = () => {
        alert(`Add: ${newTask}`);
        setNewTask("");
    };

    const _handleTextChange = (text) => {
        setNewTask(text);
    };
    return (
        <ThemeProvider theme={theme}>
            <Container>
                <StatusBar
                    barStyle="light-content"
                    backgroundColor={theme.backgroundColor}
                />
                <Title>TODO List</Title>
                <Input
                    placeholder="+ ADD a Task"
                    value={newTask}
                    onChangeText={_handleTextChange}
                    onSubmitEditing={_addTask}
                />
            </Container>
        </ThemeProvider>
    );
}
