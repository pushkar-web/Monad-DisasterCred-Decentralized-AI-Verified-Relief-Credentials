import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants/theme';
import { Home, FileCheck, Plus, Wallet, LogOut } from 'lucide-react-native';
import { useAuth } from '../context/AuthContext';

const VictimBottomNav = ({ navigation, active }) => {
    const { logout } = useAuth();
    const items = [
        { name: 'Home', icon: Home, route: 'Home' },
        { name: 'Status', icon: FileCheck, route: 'ClaimStatus' },
        { name: 'Wallet', icon: Wallet, route: 'Wallet' },
        { name: 'Exit', icon: LogOut, route: null, isLogout: true },
    ];
    return (
        <View style={styles.bottomNav}>
            {items.slice(0, 2).map((item) => (
                <TouchableOpacity
                    key={item.name}
                    style={styles.navItem}
                    onPress={() => item.isLogout ? logout() : (item.route && navigation?.navigate(item.route))}
                >
                    <item.icon color={active === item.name ? COLORS.primary : COLORS.textSecondary} size={20} />
                    <Text style={[styles.navText, active === item.name && styles.navTextActive]}>{item.name}</Text>
                </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.navFab} onPress={() => navigation?.navigate('CreateClaim')}>
                <Plus color="#FFFFFF" size={26} />
            </TouchableOpacity>
            {items.slice(2).map((item) => (
                <TouchableOpacity
                    key={item.name}
                    style={styles.navItem}
                    onPress={() => item.isLogout ? logout() : (item.route && navigation?.navigate(item.route))}
                >
                    <item.icon color={item.isLogout ? '#EF4444' : (active === item.name ? COLORS.primary : COLORS.textSecondary)} size={20} />
                    <Text style={[styles.navText, item.isLogout ? { color: '#EF4444' } : (active === item.name && styles.navTextActive)]}>{item.name}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    bottomNav: { flexDirection: 'row', height: 80, backgroundColor: '#FFFFFF', borderTopWidth: 1, borderTopColor: COLORS.border, paddingHorizontal: 16, paddingBottom: 12, alignItems: 'center' },
    navItem: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 4 },
    navText: { fontSize: 11, color: COLORS.textSecondary, fontWeight: '500' },
    navTextActive: { color: COLORS.primary },
    navFab: { width: 56, height: 56, borderRadius: 28, backgroundColor: COLORS.primary, marginTop: -28, alignItems: 'center', justifyContent: 'center', shadowColor: COLORS.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 8, borderWidth: 3, borderColor: COLORS.background },
});

export default VictimBottomNav;
