import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../constants/theme';
import Layout from '../../components/Layout';
import { Bell, Shield, Search, Filter, ChevronRight, Activity, Calendar, History, QrCode } from 'lucide-react-native';
import NGOBottomNav from '../../components/NGOBottomNav';

const DARK_COLORS = {
    bg: '#0F172A',
    card: '#1E293B',
    accent: '#3B82F6',
    text: '#FFFFFF',
    textDim: '#94A3B8',
    border: '#334155'
};

const NGODashboard = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Layout style={{ backgroundColor: DARK_COLORS.bg }}>
                <ScrollView contentContainerStyle={styles.content}>
                    <View style={styles.header}>
                        <View>
                            <View style={styles.syncBadge}>
                                <View style={styles.syncDot} />
                                <Text style={styles.syncText}>SYSTEM ONLINE • SYNCED 2M AGO</Text>
                            </View>
                            <Text style={styles.welcomeText}>Welcome back,</Text>
                            <Text style={styles.nameText}>Officer Sarah</Text>
                        </View>
                        <TouchableOpacity style={styles.notificationBtn}>
                            <Bell color={DARK_COLORS.text} size={24} />
                            <View style={styles.badge} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.mainCard}>
                        <View>
                            <Text style={styles.mainLabel}>PENDING CLAIMS</Text>
                            <Text style={styles.mainValue}>42</Text>
                            <View style={styles.alertNote}>
                                <Shield color="#60A5FA" size={14} />
                                <Text style={styles.alertText}>1 Requires immediate review</Text>
                            </View>
                        </View>
                        <View style={styles.mainIconCircle}>
                            <Activity color="#FFFFFF" size={24} />
                        </View>
                    </View>

                    <View style={styles.statsRow}>
                        <View style={styles.statCard}>
                            <View style={styles.statHeader}>
                                <Text style={[styles.statValue, { color: COLORS.success }]}>15</Text>
                                <View style={styles.trendRow}>
                                    <Text style={styles.trendText}>+12%</Text>
                                </View>
                            </View>
                            <Text style={styles.statLabel}>APPROVED TODAY</Text>
                        </View>
                        <View style={styles.statCard}>
                            <View style={styles.statHeader}>
                                <Text style={[styles.statValue, { color: COLORS.alert }]}>3</Text>
                                <View style={styles.alertBadge}>
                                    <Text style={styles.alertBadgeText}>Alert</Text>
                                </View>
                            </View>
                            <Text style={styles.statLabel}>HIGH RISK CLAIMS</Text>
                        </View>
                    </View>

                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Recent Activity</Text>
                        <TouchableOpacity>
                            <Text style={styles.viewAll}>View All</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.activityList}>
                        {[
                            { title: 'Claim #4022 - Food Supply', user: 'Submitted by Volunteer 1', status: 'Pending', color: '#F59E0B', time: '10m ago' },
                            { title: 'Claim #4021 - Medical Kit', user: 'Review completed', status: 'Approved', color: COLORS.success, time: '1h ago' },
                            { title: 'New Beneficiary Reg.', user: 'Registered at Camp Alpha', status: 'Synced', color: '#6366F1', time: '2h ago' },
                        ].map((item, idx) => (
                            <TouchableOpacity key={idx} style={styles.activityItem}>
                                <View style={[styles.activityIcon, { backgroundColor: item.color + '20' }]}>
                                    <Shield color={item.color} size={20} />
                                </View>
                                <View style={styles.activityContent}>
                                    <Text style={styles.activityTitle}>{item.title}</Text>
                                    <Text style={styles.activityUser}>{item.user}</Text>
                                </View>
                                <View style={styles.activityMeta}>
                                    <Text style={styles.activityTime}>{item.time}</Text>
                                    <View style={[styles.statusTag, { backgroundColor: item.color + '20' }]}>
                                        <Text style={[styles.statusTagText, { color: item.color }]}>{item.status}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <TouchableOpacity style={styles.reportBtn}>
                        <Activity color={DARK_COLORS.text} size={20} />
                        <Text style={styles.reportBtnText}>Create New Report</Text>
                    </TouchableOpacity>

                    <View style={{ height: 100 }} />
                </ScrollView>
            </Layout>
            <NGOBottomNav navigation={navigation} active="Home" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: DARK_COLORS.bg },
    content: { padding: SPACING.lg },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 },
    syncBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 12 },
    syncDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: COLORS.success },
    syncText: { fontSize: 10, color: COLORS.success, fontWeight: 'bold' },
    welcomeText: { fontSize: 14, color: DARK_COLORS.textDim },
    nameText: { fontSize: 24, fontWeight: 'bold', color: DARK_COLORS.text },
    notificationBtn: { padding: 12, backgroundColor: DARK_COLORS.card, borderRadius: 24, borderWidth: 1, borderColor: DARK_COLORS.border },
    badge: { width: 10, height: 10, borderRadius: 5, backgroundColor: DARK_COLORS.accent, position: 'absolute', top: 12, right: 12 },
    mainCard: { backgroundColor: '#2563EB', padding: 24, borderRadius: 24, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
    mainLabel: { fontSize: 12, color: 'rgba(255,255,255,0.7)', fontWeight: 'bold', letterSpacing: 1 },
    mainValue: { fontSize: 48, fontWeight: 'bold', color: '#FFFFFF', marginVertical: 4 },
    alertNote: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 },
    alertText: { fontSize: 12, color: 'rgba(255,255,255,0.9)', fontWeight: '500' },
    mainIconCircle: { width: 56, height: 56, borderRadius: 28, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },
    statsRow: { flexDirection: 'row', gap: 16, marginBottom: 40 },
    statCard: { flex: 1, backgroundColor: DARK_COLORS.card, padding: 16, borderRadius: 20, borderWidth: 1, borderColor: DARK_COLORS.border },
    statHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 },
    statValue: { fontSize: 24, fontWeight: 'bold' },
    trendRow: { backgroundColor: 'rgba(16, 185, 129, 0.1)', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
    trendText: { fontSize: 10, color: COLORS.success, fontWeight: 'bold' },
    alertBadge: { backgroundColor: 'rgba(220, 38, 38, 0.1)', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
    alertBadgeText: { fontSize: 10, color: COLORS.alert, fontWeight: 'bold' },
    statLabel: { fontSize: 10, color: DARK_COLORS.textDim, fontWeight: 'bold', letterSpacing: 0.5 },
    sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', color: DARK_COLORS.text },
    viewAll: { fontSize: 12, color: DARK_COLORS.accent, fontWeight: 'bold' },
    activityList: { gap: 12, marginBottom: 32 },
    activityItem: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: DARK_COLORS.card, borderRadius: 20, borderWidth: 1, borderColor: DARK_COLORS.border },
    activityIcon: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
    activityContent: { flex: 1 },
    activityTitle: { fontSize: 14, fontWeight: 'bold', color: DARK_COLORS.text },
    activityUser: { fontSize: 12, color: DARK_COLORS.textDim, marginTop: 2 },
    activityMeta: { alignItems: 'flex-end', gap: 6 },
    activityTime: { fontSize: 10, color: DARK_COLORS.textDim },
    statusTag: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
    statusTagText: { fontSize: 10, fontWeight: 'bold' },
    reportBtn: { flexDirection: 'row', padding: 16, borderRadius: 16, borderWidth: 1, borderColor: DARK_COLORS.border, alignItems: 'center', justifyContent: 'center', gap: 12, backgroundColor: DARK_COLORS.card },
    reportBtnText: { color: DARK_COLORS.text, fontWeight: 'bold' },
    bottomNav: { flexDirection: 'row', height: 90, backgroundColor: DARK_COLORS.bg, borderTopWidth: 1, borderTopColor: DARK_COLORS.border, paddingHorizontal: 20, paddingBottom: 20, alignItems: 'center' },
    navItem: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 6 },
    navText: { fontSize: 11, color: DARK_COLORS.textDim, fontWeight: '500' },
    scanFab: { width: 64, height: 64, borderRadius: 32, backgroundColor: DARK_COLORS.accent, marginTop: -40, alignItems: 'center', justifyContent: 'center', shadowColor: DARK_COLORS.accent, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 8, borderWidth: 4, borderColor: DARK_COLORS.bg, gap: 2 },
    scanText: { fontSize: 10, fontWeight: 'bold', color: '#FFFFFF' },
});

export default NGODashboard;
