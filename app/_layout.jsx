import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router';
import TabBar from '../components/navigation/TabBar';

const _layout = () => {
    return (
        <Tabs
            tabBar={props => <TabBar {...props} />}
        >
            <Tabs.Screen
                name='index'
                options={{
                    title: 'Home',
                    headerTitleAlign: 'center'
                }}
            />
            <Tabs.Screen
                name='create'
                options={{
                    title: 'Create',
                    headerTitleAlign: 'center'
                }}
            />
            <Tabs.Screen
                name='explore'
                options={{
                    title: 'Explore',
                    headerTitleAlign: 'center'
                }}
            />
            <Tabs.Screen
                name='profile'
                options={{
                    title: 'Profile',
                    headerTitleAlign: 'center'
                }}
            />
        </Tabs>
    )
}

export default _layout