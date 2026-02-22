import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import NGODashboard from '../screens/NGO/NGODashboard';
import ClaimList from '../screens/NGO/ClaimReviewList';
import ClaimDetail from '../screens/NGO/ClaimDetail';
import QRScanner from '../screens/NGO/QRScanner';

const Stack = createStackNavigator();

const NGONavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Dashboard" component={NGODashboard} />
            <Stack.Screen name="ClaimList" component={ClaimList} />
            <Stack.Screen name="ClaimDetail" component={ClaimDetail} />
            <Stack.Screen name="QRScanner" component={QRScanner} />
        </Stack.Navigator>
    );
};

export default NGONavigator;
