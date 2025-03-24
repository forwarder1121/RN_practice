import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Profile, Channel, ChannelList } from "../screens";
import { MaterialIcons } from "@expo/vector-icons";
import { ThemeContext } from "styled-components/native";
const Tab = createBottomTabNavigator();

const TabBarIcon = ({ focused, name }) => {
    const theme = useContext(ThemeContext);
    return (
        <MaterialIcons
            name={name}
            size={26}
            color={focused ? theme.tabActiveColor : theme.tabInactiveColor}
        />
    );
};

const MainTab = () => {
    const theme = useContext(ThemeContext);
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: theme.tabActiveColor,
                tabBarInactiveTintColor: theme.tabInactiveColor,
            }}>
            <Tab.Screen
                name="Channel List"
                options={{
                    tabBarIcon: ({ focused }) =>
                        TabBarIcon({
                            focused,
                            name: focused
                                ? "chat-bubble"
                                : "chat-bubble-outline",
                        }),
                }}
                component={ChannelList}
            />
            <Tab.Screen
                name="Profile"
                options={{
                    tabBarIcon: ({ focused }) =>
                        TabBarIcon({
                            focused,
                            name: focused ? "person" : "person-outline",
                        }),
                }}
                component={Profile}
            />
        </Tab.Navigator>
    );
};

export default MainTab;
