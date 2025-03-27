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
            headerRight: () =>
                index === 0 && (
                    <MaterialIcons
                        name="add"
                        size={26}
                        style={{ margin: 10 }}
                        onPress={() => navigation.navigate("Channel Creation")}
                    />
                ),
        });
    }, [route]);

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
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
