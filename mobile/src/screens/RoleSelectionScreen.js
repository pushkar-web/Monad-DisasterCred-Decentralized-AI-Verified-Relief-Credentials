import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { COLORS, SPACING, TYPOGRAPHY } from '../constants/theme';
import { Shield, Users, Landmark, ChevronRight } from 'lucide-react-native';

const RoleSelectionScreen = () => {
    const { login } = useAuth();

    const roles = [
        { title: 'Disaster Victim', desc: 'Report damage and request aid', icon: Shield, role: 'Victim' },
        { title: 'NGO Officer', desc: 'Verify claims and distribute aid', icon: Users, role: 'NGO' },
        { title: 'Government Auditor', desc: 'Review reports and ensure compliance', icon: Landmark, role: 'Government' },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.logoPlaceholder}>
                    <Shield color={COLORS.primary} size={32} />
                    <Text style={styles.logoText}>DisasterCred</Text>
                </View>
                <Text style={styles.title}>Who are you?</Text>
                <Text style={styles.subtitle}>Select your role to access the correct tools.</Text>
            </View>

            <View style={styles.rolesContainer}>
                {roles.map((item) => (
                    <TouchableOpacity
                        key={item.role}
                        style={styles.roleCard}
                        onPress={() => login(item.role)}
                    >
                        <View style={styles.roleIconContainer}>
                            <item.icon color={COLORS.primary} size={24} />
                        </View>
                        <View style={styles.roleTextContainer}>
                            <Text style={styles.roleTitle}>{item.title}</Text>
                            <Text style={styles.roleDesc}>{item.desc}</Text>
                        </View>
                        <ChevronRight color={COLORS.border} size={20} />
                    </TouchableOpacity>
                ))}
            </View>

            <View style={styles.footer}>
                <TouchableOpacity>
                    <Text style={styles.footerLink}>Trouble signing in? Contact Support</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background, padding: SPACING.lg },
    header: { alignItems: 'center', marginTop: 40, marginBottom: 40 },
    logoPlaceholder: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
    logoText: { fontSize: 24, fontWeight: 'bold', color: COLORS.primary, marginLeft: 10 },
    title: { ...TYPOGRAPHY.h1, color: COLORS.text, marginBottom: 8 },
    subtitle: { ...TYPOGRAPHY.body, color: COLORS.textSecondary, textAlign: 'center' },
    rolesContainer: { gap: SPACING.md },
    roleCard: {
        backgroundColor: COLORS.card,
        padding: SPACING.md,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    roleIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: COLORS.background,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    roleTextContainer: { flex: 1 },
    roleTitle: { ...TYPOGRAPHY.h2, color: COLORS.text },
    roleDesc: { ...TYPOGRAPHY.caption, color: COLORS.textSecondary },
    footer: { marginTop: 'auto', alignItems: 'center', paddingBottom: 20 },
    footerLink: { color: COLORS.textSecondary, fontSize: 14 },
});

export default RoleSelectionScreen;
