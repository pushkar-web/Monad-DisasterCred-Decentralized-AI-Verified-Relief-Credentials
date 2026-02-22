import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Activity, Shield, QrCode, History, LogOut } from 'lucide-react-native';
import { useAuth } from '../context/AuthContext';

const DARK_COLORS = {
    bg: '#0F172A',
    accent: '#3B82F6',
    text: '#FFFFFF',
    textDim: '#94A3B8',
    border: '#334155',
};

const NGOBottomNav = ({ navigation, active }) => {
    const { logout } = useAuth();
    return (
        <View style={styles.bottomNav}>
            <TouchableOpacity style={styles.navItem} onPress={() => navigation?.navigate('Dashboard')}>
                <Activity color={active === 'Home' ? DARK_COLORS.accent : DARK_COLORS.textDim} size={20} />
                <Text style={[styles.navText, active === 'Home' && styles.navActive]}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem} onPress={() => navigation?.navigate('ClaimList')}>
                <Shield color={active === 'Claims' ? DARK_COLORS.accent : DARK_COLORS.textDim} size={20} />
                <Text style={[styles.navText, active === 'Claims' && styles.navActive]}>Claims</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.scanFab} onPress={() => navigation?.navigate('QRScanner')}>
                <QrCode color="#FFFFFF" size={24} />
                <Text style={styles.scanText}>Scan</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem}>
                <History color={DARK_COLORS.textDim} size={20} />
                <Text style={styles.navText}>History</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem} onPress={logout}>
                <LogOut color="#EF4444" size={20} />
                <Text style={[styles.navText, { color: '#EF4444' }]}>Exit</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    bottomNav: { flexDirection: 'row', height: 90, backgroundColor: DARK_COLORS.bg, borderTopWidth: 1, borderTopColor: DARK_COLORS.border, paddingHorizontal: 12, paddingBottom: 20, alignItems: 'center' },
    navItem: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 6 },
    navText: { fontSize: 10, color: DARK_COLORS.textDim, fontWeight: '500' },
    navActive: { color: DARK_COLORS.accent },
    scanFab: { width: 64, height: 64, borderRadius: 32, backgroundColor: DARK_COLORS.accent, marginTop: -40, alignItems: 'center', justifyContent: 'center', shadowColor: DARK_COLORS.accent, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 8, borderWidth: 4, borderColor: DARK_COLORS.bg, gap: 2 },
    scanText: { fontSize: 10, fontWeight: 'bold', color: '#FFFFFF' },
});

export default NGOBottomNav;
