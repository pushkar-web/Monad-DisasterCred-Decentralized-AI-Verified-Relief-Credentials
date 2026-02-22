import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth, AuthProvider } from '../context/AuthContext';

// Navigators
import VictimNavigator from './VictimNavigator';
import NGONavigator from './NGONavigator';
import GovernmentNavigator from './GovernmentNavigator';

// Screens
import RoleSelectionScreen from '../screens/RoleSelectionScreen';
import SplashScreen from '../screens/SplashScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
    const { userRole, isLoading } = useAuth();

    if (isLoading) return null;

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    cardStyleInterpolator: ({ current, layouts }) => ({
                        cardStyle: {
                            opacity: current.progress,
                            transform: [
                                {
                                    translateY: current.progress.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [40, 0],
                                    }),
                                },
                            ],
                        },
                    }),
                }}
            >
                {!userRole ? (
                    // Show Splash → RoleSelection flow when not logged in
                    <>
                        <Stack.Screen name="Splash" component={SplashScreen} />
                        <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />
                    </>
                ) : userRole === 'Victim' ? (
                    <Stack.Screen name="VictimApp" component={VictimNavigator} />
                ) : userRole === 'NGO' ? (
                    <Stack.Screen name="NGOApp" component={NGONavigator} />
                ) : (
                    <Stack.Screen name="GovernmentApp" component={GovernmentNavigator} />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
