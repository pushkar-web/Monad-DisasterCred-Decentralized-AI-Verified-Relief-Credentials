import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import NationalOverview from '../screens/Government/NationalOverview';
import DistrictAnalytics from '../screens/Government/DistrictAnalytics';
import BlockchainAudit from '../screens/Government/BlockchainAudit';

const Stack = createStackNavigator();

const GovernmentNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Overview" component={NationalOverview} />
            <Stack.Screen name="Analytics" component={DistrictAnalytics} />
            <Stack.Screen name="AuditLedger" component={BlockchainAudit} />
        </Stack.Navigator>
    );
};

export default GovernmentNavigator;
