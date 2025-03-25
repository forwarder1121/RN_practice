import React, { useContext, useEffect } from "react";
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

const MainTab = ({ navigation, route }) => {
    const theme = useContext(ThemeContext);

    useEffect(() => {
        const titles = route.state?.routeNames || ["Channels"];
        const index = route.state?.index || 0;
        navigation.setOptions({
            headerTitle: titles[index],
            headerShown: false,
        });
    }, [route]);

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: theme.tabActiveColor,
                tabBarInactiveTintColor: theme.tabInactiveColor,
            }}>
            <Tab.Screen
                name="Channels"
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
