import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LayoutGrid, Map, Database, Settings, LogOut } from 'lucide-react-native';
import { useAuth } from '../context/AuthContext';

const DARK_COLORS = {
    bg: '#0F172A',
    accent: '#3B82F6',
    text: '#FFFFFF',
    textDim: '#94A3B8',
    border: '#334155',
};

const GovBottomNav = ({ navigation, active }) => {
    const { logout } = useAuth();
    const tabs = [
        { name: 'Overview', icon: LayoutGrid, route: 'Overview' },
        { name: 'Analytics', icon: Map, route: 'Analytics' },
        { name: 'Audit', icon: Database, route: 'AuditLedger' },
        { name: 'Settings', icon: Settings, route: null },
    ];
    return (
        <View style={styles.bottomNav}>
            {tabs.map((tab) => (
                <TouchableOpacity key={tab.name} style={styles.navItem} onPress={() => tab.route && navigation?.navigate(tab.route)}>
                    <tab.icon color={active === tab.name ? DARK_COLORS.accent : DARK_COLORS.textDim} size={20} />
                    <Text style={[styles.navText, active === tab.name && styles.navActive]}>{tab.name}</Text>
                </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.navItem} onPress={logout}>
                <LogOut color="#EF4444" size={20} />
                <Text style={[styles.navText, { color: '#EF4444' }]}>Exit</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    bottomNav: { flexDirection: 'row', height: 80, backgroundColor: DARK_COLORS.bg, borderTopWidth: 1, borderTopColor: DARK_COLORS.border, paddingHorizontal: 10, paddingBottom: 10, alignItems: 'center' },
    navItem: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 6 },
    navText: { fontSize: 10, color: DARK_COLORS.textDim, fontWeight: '500' },
    navActive: { color: DARK_COLORS.accent },
});

export default GovBottomNav;
