import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userRole, setUserRole] = useState(null); // 'Victim', 'NGO', 'Government'
    const [userDid, setUserDid] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Load saved session
        const loadSession = async () => {
            try {
                const role = await AsyncStorage.getItem('userRole');
                const did = await AsyncStorage.getItem('userDid');
                if (role) setUserRole(role);
                if (did) setUserDid(did);
            } catch (e) {
                console.error('Failed to load session');
            } finally {
                setIsLoading(false);
            }
        };
        loadSession();
    }, []);

    const login = async (role, did) => {
        setUserRole(role);
        setUserDid(did);
        await AsyncStorage.setItem('userRole', role);
        if (did) await AsyncStorage.setItem('userDid', did);
    };

    const logout = async () => {
        setUserRole(null);
        setUserDid(null);
        await AsyncStorage.removeItem('userRole');
        await AsyncStorage.removeItem('userDid');
    };

    return (
        <AuthContext.Provider value={{ userRole, userDid, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
