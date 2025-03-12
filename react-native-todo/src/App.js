import React, { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import { Dimensions, StatusBar } from "react-native";
import Input from "./components/Input";
import { images } from "./images";
import Task from "./components/Task";
import { object } from "prop-types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync(); // 스플래시 화면 유지

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

const List = styled.ScrollView`
    flex: 1;
    width: ${({ width }) => width - 40}px;
`;

export default function App() {
    const [newTask, setNewTask] = useState("");
    const [tasks, setTasks] = useState({});
    const [isReady, setIsReady] = useState(false);
    const width = Dimensions.get("window").width;

    useEffect(() => {
        async function loadApp() {
            try {
                const loadedTasks = await AsyncStorage.getItem("tasks");
                setTasks(loadedTasks ? JSON.parse(loadedTasks) : {});
            } catch (e) {
                console.error(e);
            } finally {
                setIsReady(true);
                await SplashScreen.hideAsync(); // 로딩 완료 후 스플래시 화면 숨김
            }
        }
        loadApp();
    }, []);

    const _saveTasks = async (tasks) => {
        try {
            await AsyncStorage.setItem("tasks", JSON.stringify(tasks));
            setTasks(tasks);
        } catch (e) {
            console.error(e);
        }
    };

    const _addTask = () => {
        const ID = Date.now().toString();
        const newTaskObject = {
            [ID]: { id: ID, text: newTask, completed: false },
        };
        setNewTask("");
        _saveTasks({ ...tasks, ...newTaskObject });
    };

    const _deleteTask = (id) => {
        const currentTasks = { ...tasks };
        delete currentTasks[id];
        _saveTasks(currentTasks);
    };

    const _toggleTask = (id) => {
        const currentTasks = { ...tasks };
        currentTasks[id]["completed"] = !currentTasks[id]["completed"];
        _saveTasks(currentTasks);
    };

    const _updateTask = (item) => {
        const currentTasks = { ...tasks };
        currentTasks[item.id] = item;
        _saveTasks(currentTasks);
    };

    const _handleTextChange = (text) => {
        setNewTask(text);
    };

    const _onBlur = () => {
        setNewTask("");
    };

    if (!isReady) {
        return null; // 로딩 중에는 아무것도 렌더링하지 않음
    }

    return (
        <ThemeProvider theme={theme}>
            <Container>
                <StatusBar
                    barStyle="light-content"
                    backgroundColor={theme.background}
                />
                <Title>TODO List</Title>
                <Input
                    placeholder="+ ADD a Task"
                    value={newTask}
                    onChangeText={_handleTextChange}
                    onSubmitEditing={_addTask}
                    onBlur={_onBlur}
                />
                <List width={width}>
                    {Object.values(tasks)
                        .reverse()
                        .map((item) => (
                            <Task
                                key={item.id}
                                item={item}
                                deleteTask={_deleteTask}
                                toggleTask={_toggleTask}
                                updateTask={_updateTask}
                            />
                        ))}
                </List>
            </Container>
        </ThemeProvider>
    );
}
