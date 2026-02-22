import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import VictimHome from '../screens/Victim/VictimHome';
import CreateClaim from '../screens/Victim/CreateClaim';
import AIResult from '../screens/Victim/AIResult';
import ClaimStatus from '../screens/Victim/ClaimStatus';
import VictimOnboarding from '../screens/Victim/VictimOnboarding';
import VictimWallet from '../screens/Victim/VictimWallet';

const Stack = createStackNavigator();

const VictimNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Onboarding">
            <Stack.Screen name="Onboarding" component={VictimOnboarding} />
            <Stack.Screen name="Home" component={VictimHome} />
            <Stack.Screen name="CreateClaim" component={CreateClaim} />
            <Stack.Screen name="AIResult" component={AIResult} />
            <Stack.Screen name="ClaimStatus" component={ClaimStatus} />
            <Stack.Screen name="Wallet" component={VictimWallet} />
        </Stack.Navigator>
    );
};

export default VictimNavigator;
