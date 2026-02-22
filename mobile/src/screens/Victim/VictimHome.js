import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { COLORS, SPACING } from '../../constants/theme';
import Layout from '../../components/Layout';
import { Bell, Shield, Plus, Activity, MapPin, Clock } from 'lucide-react-native';
import VictimBottomNav from '../../components/VictimBottomNav';

const VictimHome = ({ navigation }) => {
    return (
        <View style={styles.wrapper}>
            <Layout>
                <ScrollView style={styles.container} contentContainerStyle={styles.content}>
                    {/* Header */}
                    <View style={styles.header}>
                        <View>
                            <Text style={styles.logoText}>DisasterCred</Text>
                            <View style={styles.profileRow}>
                                <View style={styles.avatarPlaceholder} />
                                <View>
                                    <Text style={styles.welcomeText}>Welcome back,</Text>
                                    <Text style={styles.nameText}>Sarah Jenkins</Text>
                                </View>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.notificationBtn}>
                            <Bell color={COLORS.text} size={24} />
                            <View style={styles.onlineBadge} />
                        </TouchableOpacity>
                    </View>

                    {/* Status Cards */}
                    <View style={styles.statsRow}>
                        <View style={[styles.statCard, { backgroundColor: '#FEF3C7' }]}>
                            <Clock color="#D97706" size={20} />
                            <Text style={styles.statStatus}>Pending</Text>
                            <Text style={styles.statDesc}>Review in progress</Text>
                        </View>
                        <View style={[styles.statCard, { backgroundColor: COLORS.primary }]}>
                            <Shield color="#FFFFFF" size={20} />
                            <Text style={[styles.statStatus, { color: '#FFFFFF' }]}>Approved</Text>
                            <Text style={[styles.statValue, { color: '#FFFFFF' }]}>$0.00</Text>
                            <Text style={[styles.statDesc, { color: '#E2E8F0' }]}>Available balance</Text>
                        </View>
                    </View>

                    {/* Action Button */}
                    <TouchableOpacity style={styles.createBtn} onPress={() => navigation?.navigate('CreateClaim')}>
                        <Plus color="#FFFFFF" size={24} />
                        <Text style={styles.createBtnText}>Create New Claim</Text>
                    </TouchableOpacity>

                    {/* Recent Activity */}
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Recent Activity</Text>
                        <TouchableOpacity>
                            <Text style={styles.viewAll}>View All</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.activityList}>
                        {[
                            { id: 1, title: 'Claim #4032 Submitted', desc: 'Housing damage photos upload...', time: '10:00 AM', icon: Activity },
                            { id: 2, title: 'Identity Verified', desc: 'Automatic verification complete', time: 'Yesterday', icon: Shield },
                            { id: 3, title: 'Profile Updated', desc: 'Address details changed', time: '2 days ago', icon: MapPin },
                        ].map((item) => (
                            <TouchableOpacity key={item.id} style={styles.activityItem}>
                                <View style={styles.activityIcon}>
                                    <item.icon color={COLORS.primary} size={20} />
                                </View>
                                <View style={styles.activityContent}>
                                    <Text style={styles.activityTitle}>{item.title}</Text>
                                    <Text style={styles.activityDesc}>{item.desc}</Text>
                                </View>
                                <Text style={styles.activityTime}>{item.time}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Help Banner */}
                    <View style={styles.helpBanner}>
                        <Text style={styles.helpTitle}>Need immediate help?</Text>
                        <Text style={styles.helpText}>Emergency shelters are open near your location. Check the maps in profile tab.</Text>
                    </View>
                    <View style={{ height: 20 }} />
                </ScrollView>
            </Layout>
            <VictimBottomNav navigation={navigation} active="Home" />
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: { flex: 1, backgroundColor: COLORS.background },
    container: { flex: 1 },
    content: { padding: SPACING.lg },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 },
    logoText: { fontSize: 18, fontWeight: 'bold', color: COLORS.primary, marginBottom: 16 },
    profileRow: { flexDirection: 'row', alignItems: 'center' },
    avatarPlaceholder: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#E2E8F0', marginRight: 12 },
    welcomeText: { fontSize: 14, color: COLORS.textSecondary },
    nameText: { fontSize: 18, fontWeight: 'bold', color: COLORS.text },
    notificationBtn: { padding: 8, backgroundColor: '#FFFFFF', borderRadius: 12, borderWidth: 1, borderColor: COLORS.border },
    onlineBadge: { width: 10, height: 10, borderRadius: 5, backgroundColor: COLORS.success, position: 'absolute', top: 8, right: 8 },
    statsRow: { flexDirection: 'row', gap: SPACING.md, marginBottom: 24 },
    statCard: { flex: 1, padding: 16, borderRadius: 16 },
    statStatus: { fontSize: 16, fontWeight: 'bold', marginTop: 8 },
    statValue: { fontSize: 24, fontWeight: 'bold', marginVertical: 4 },
    statDesc: { fontSize: 12, color: COLORS.textSecondary },
    createBtn: { backgroundColor: '#0F172A', flexDirection: 'row', padding: 16, borderRadius: 12, alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 32 },
    createBtnText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
    sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.text },
    viewAll: { color: COLORS.primary, fontWeight: '600' },
    activityList: { gap: SPACING.md, marginBottom: 24 },
    activityItem: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#FFFFFF', borderRadius: 16, borderWidth: 1, borderColor: COLORS.border },
    activityIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.background, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
    activityContent: { flex: 1 },
    activityTitle: { fontSize: 14, fontWeight: 'bold', color: COLORS.text },
    activityDesc: { fontSize: 12, color: COLORS.textSecondary },
    activityTime: { fontSize: 12, color: COLORS.textSecondary },
    helpBanner: { backgroundColor: '#EFF6FF', padding: 20, borderRadius: 16, borderLeftWidth: 4, borderLeftColor: COLORS.primary },
    helpTitle: { fontSize: 16, fontWeight: 'bold', color: COLORS.primary, marginBottom: 4 },
    helpText: { fontSize: 14, color: '#1E40AF' },
});

export default VictimHome;
