import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../constants/theme';
import Layout from '../../components/Layout';
import { Bell, Shield, Search, TrendingUp, Info, History, Map, Database, LayoutGrid, TriangleAlert, Settings, ChevronRight } from 'lucide-react-native';
import GovBottomNav from '../../components/GovBottomNav';

const DARK_COLORS = {
    bg: '#0F172A',
    card: '#1E293B',
    accent: '#3B82F6',
    text: '#FFFFFF',
    textDim: '#94A3B8',
    border: '#334155'
};

const NationalOverview = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Layout style={{ backgroundColor: DARK_COLORS.bg }}>
                <ScrollView contentContainerStyle={styles.content}>
                    <View style={styles.header}>
                        <View>
                            <View style={styles.userRow}>
                                <Image source={{ uri: 'https://i.pravatar.cc/40?img=15' }} style={styles.avatar} />
                                <Text style={styles.userName}>Welcome back, Auditor Mitchell</Text>
                            </View>
                            <Text style={styles.title}>National Relief</Text>
                            <Text style={styles.lastUpdate}>Last updated: Today, 08:41 AM</Text>
                        </View>
                        <TouchableOpacity style={styles.iconBtn}>
                            <Bell color="#FFFFFF" size={24} />
                            <View style={styles.alertDot} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.mainStats}>
                        <View style={styles.statCardFull}>
                            <View style={styles.statHeader}>
                                <View style={styles.statIconBox}><Database color={DARK_COLORS.accent} size={20} /></View>
                                <Text style={styles.statLabel}>TOTAL CLAIMS</Text>
                            </View>
                            <Text style={styles.statValue}>14,203</Text>
                            <View style={styles.trendUp}>
                                <TrendingUp color={COLORS.success} size={14} />
                                <Text style={styles.trendText}>+12% vs last mo</Text>
                            </View>
                        </View>

                        <View style={styles.statCardFull}>
                            <View style={styles.statHeader}>
                                <View style={styles.statIconBox}><Shield color={DARK_COLORS.accent} size={20} /></View>
                                <Text style={styles.statLabel}>FUNDS RELEASED</Text>
                            </View>
                            <Text style={styles.statValue}>$45.2M</Text>
                            <View style={styles.onTrackBadge}>
                                <Text style={styles.onTrackText}>ON TRACK</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.miniStatsRow}>
                        <View style={styles.miniStatCard}>
                            <Text style={styles.miniStatLabel}>PENDING</Text>
                            <Text style={styles.miniStatValue}>1,240</Text>
                            <ChevronRight color={DARK_COLORS.border} size={16} />
                        </View>
                        <View style={styles.miniStatCard}>
                            <Text style={[styles.miniStatLabel, { color: COLORS.alert }]}>FRAUD ALERTS</Text>
                            <Text style={[styles.miniStatValue, { color: COLORS.alert }]}>12</Text>
                            <Text style={styles.actionNeeded}>ACTION REQ.</Text>
                        </View>
                    </View>

                    <View style={styles.chartSection}>
                        <Text style={styles.sectionTitle}>Relief Distribution</Text>
                        <Text style={styles.sectionSubtitle}>Last 30 Days</Text>

                        <View style={styles.chartMock}>
                            {/* Mock Bar Chart */}
                            {[40, 60, 30, 80, 50, 90, 70].map((h, i) => (
                                <View key={i} style={[styles.bar, { height: h }]} />
                            ))}
                        </View>
                        <View style={styles.chartLabels}>
                            <Text style={styles.chartLabelText}>NOV 1</Text>
                            <Text style={styles.chartLabelText}>NOV 15</Text>
                            <Text style={styles.chartLabelText}>NOV 30</Text>
                        </View>
                    </View>

                    <View style={styles.alertsHeader}>
                        <Text style={styles.sectionTitle}>Recent Alerts</Text>
                        <TouchableOpacity><Text style={styles.viewAll}>View All</Text></TouchableOpacity>
                    </View>

                    <View style={styles.alertList}>
                        <View style={styles.alertItem}>
                            <View style={[styles.alertIcon, { backgroundColor: COLORS.alert + '20' }]}>
                                <TriangleAlert color={COLORS.alert} size={18} />
                            </View>
                            <View style={styles.alertBody}>
                                <Text style={styles.alertTitle}>Fraud Detected: Case #4821</Text>
                                <Text style={styles.alertText}>Duplicate identities flagged in Sector 4.</Text>
                            </View>
                            <Text style={styles.alertTime}>2m ago</Text>
                        </View>
                        <View style={styles.alertItem}>
                            <View style={[styles.alertIcon, { backgroundColor: '#F59E0B' + '20' }]}>
                                <TrendingUp color="#F59E0B" size={18} />
                            </View>
                            <View style={styles.alertBody}>
                                <Text style={styles.alertTitle}>Abnormal Claim Spike</Text>
                                <Text style={styles.alertText}>Region: Sector 9 +45% in 2 hours.</Text>
                            </View>
                            <Text style={styles.alertTime}>1h ago</Text>
                        </View>
                    </View>

                    <View style={{ height: 100 }} />
                </ScrollView>
            </Layout>
            <GovBottomNav navigation={navigation} active="Overview" />
        </View>
    );
};

// ... Reuse styles from NGODashboard with tweaks ...
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: DARK_COLORS.bg },
    content: { padding: SPACING.lg },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 },
    userRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
    avatar: { width: 40, height: 40, borderRadius: 20 },
    userName: { fontSize: 13, color: DARK_COLORS.textDim, fontWeight: '500' },
    title: { fontSize: 24, fontWeight: 'bold', color: DARK_COLORS.text },
    lastUpdate: { fontSize: 11, color: DARK_COLORS.textDim, marginTop: 4 },
    iconBtn: { padding: 12, backgroundColor: DARK_COLORS.card, borderRadius: 24, borderWidth: 1, borderColor: DARK_COLORS.border },
    alertDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.alert, position: 'absolute', top: 12, right: 12 },
    mainStats: { flexDirection: 'row', gap: 16, marginBottom: 16 },
    statCardFull: { flex: 1, backgroundColor: DARK_COLORS.card, padding: 20, borderRadius: 24, borderWidth: 1, borderColor: DARK_COLORS.border },
    statHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
    statIconBox: { width: 32, height: 32, borderRadius: 8, backgroundColor: '#1E293B', alignItems: 'center', justifyContent: 'center' },
    statLabel: { fontSize: 10, fontWeight: 'bold', color: DARK_COLORS.textDim, letterSpacing: 0.5 },
    statValue: { fontSize: 28, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 8 },
    trendUp: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    trendText: { fontSize: 10, color: COLORS.success, fontWeight: 'bold' },
    onTrackBadge: { alignSelf: 'flex-start', backgroundColor: '#064E3B', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4 },
    onTrackText: { fontSize: 10, color: COLORS.success, fontWeight: 'bold' },
    miniStatsRow: { flexDirection: 'row', gap: 16, marginBottom: 32 },
    miniStatCard: { flex: 1, backgroundColor: DARK_COLORS.card, padding: 16, borderRadius: 20, borderWidth: 1, borderColor: DARK_COLORS.border, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    miniStatLabel: { fontSize: 10, fontWeight: 'bold', color: DARK_COLORS.textDim },
    miniStatValue: { fontSize: 18, fontWeight: 'bold', color: '#FFFFFF' },
    actionNeeded: { fontSize: 9, color: '#FFFFFF', backgroundColor: COLORS.alert, paddingHorizontal: 4, paddingVertical: 1, borderRadius: 2 },
    chartSection: { backgroundColor: DARK_COLORS.card, padding: 24, borderRadius: 24, borderWidth: 1, borderColor: DARK_COLORS.border, marginBottom: 32 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', color: DARK_COLORS.text },
    sectionSubtitle: { fontSize: 12, color: DARK_COLORS.textDim, marginBottom: 24 },
    chartMock: { flexDirection: 'row', alignItems: 'bottom', justifyContent: 'space-between', height: 100, marginBottom: 12 },
    bar: { width: 24, backgroundColor: DARK_COLORS.accent, borderRadius: 4 },
    chartLabels: { flexDirection: 'row', justifyContent: 'space-between' },
    chartLabelText: { fontSize: 10, color: DARK_COLORS.textDim, fontWeight: 'bold' },
    alertsHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
    viewAll: { fontSize: 12, color: DARK_COLORS.accent, fontWeight: 'bold' },
    alertList: { gap: 12 },
    alertItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: DARK_COLORS.card, padding: 16, borderRadius: 20, borderWidth: 1, borderColor: DARK_COLORS.border },
    alertIcon: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
    alertBody: { flex: 1 },
    alertTitle: { fontSize: 14, fontWeight: 'bold', color: DARK_COLORS.text },
    alertText: { fontSize: 12, color: DARK_COLORS.textDim, marginTop: 2 },
    alertTime: { fontSize: 10, color: DARK_COLORS.textDim },
    bottomNav: { flexDirection: 'row', height: 80, backgroundColor: DARK_COLORS.bg, borderTopWidth: 1, borderTopColor: DARK_COLORS.border, paddingHorizontal: 20, paddingBottom: 10, alignItems: 'center' },
    navItem: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 6 },
    navText: { fontSize: 11, color: DARK_COLORS.textDim, fontWeight: '500' },
});

export default NationalOverview;
