import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../constants/theme';
import Layout from '../../components/Layout';
import { Shield, Bell, Settings, QrCode, ChevronRight, Bookmark, CircleCheckBig, Landmark, Utensils, HeartPulse } from 'lucide-react-native';
import VictimBottomNav from '../../components/VictimBottomNav';

const VictimWallet = ({ navigation }) => {
    const credentials = [
        { title: 'Shelter Grant AR1', desc: 'Exp: Oct 24, 2024', icon: Landmark, color: '#EFF6FF' },
        { title: 'Food Ration Card', desc: 'Daily Limit: 3 Meals', icon: Utensils, color: '#F0FDF4' },
        { title: 'Medical Clearance', desc: 'Tetanus Booster: Sept', icon: HeartPulse, color: '#FEF2F2' },
    ];

    return (
        <Layout>
            <View style={styles.appBar}>
                <View style={styles.appBarTitleRow}>
                    <Shield color={COLORS.primary} size={20} />
                    <Text style={styles.appBarTitle}>DisasterCred</Text>
                </View>
                <View style={styles.appBarActions}>
                    <View style={styles.onlineBadge}>
                        <View style={styles.dot} />
                        <Text style={styles.onlineText}>ONLINE</Text>
                    </View>
                    <TouchableOpacity style={styles.actionCircle}>
                        <Settings color={COLORS.text} size={20} />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView style={styles.container} contentContainerStyle={styles.content}>
                <Text style={styles.sectionTitle}>Verified Identity Wallet</Text>

                {/* Identity Card */}
                <View style={styles.idCard}>
                    <View style={styles.idHeader}>
                        <Image source={{ uri: 'https://i.pravatar.cc/100?img=5' }} style={styles.idAvatar} />
                        <View>
                            <Text style={styles.idName}>Jane Doe</Text>
                            <View style={styles.idBadge}>
                                <CircleCheckBig color={COLORS.success} size={14} />
                                <Text style={styles.idBadgeText}>Verified Victim</Text>
                            </View>
                        </View>
                        <QrCode color={COLORS.primary} size={24} style={{ marginLeft: 'auto' }} />
                    </View>

                    <View style={styles.idQrHolder}>
                        <Image source={require('../../../assets/qr_code.png')} style={styles.qrImage} resizeMode="contain" />
                        <Text style={styles.qrHint}>Scan for verification by relief officer</Text>
                    </View>

                    <View style={styles.blockChainSecured}>
                        <Shield color="#64748B" size={16} />
                        <Text style={styles.securedText}>BLOCKCHAIN SECURED</Text>
                        <Text style={styles.didText}>ID: DC-2023-002</Text>
                    </View>
                </View>

                {/* Active Grants & Credentials */}
                <View style={styles.grantHeader}>
                    <Text style={styles.grantSectionTitle}>Active Grants & Credentials</Text>
                    <TouchableOpacity>
                        <Text style={styles.viewHistory}>View History</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.grantList}>
                    {credentials.map((item, idx) => (
                        <TouchableOpacity key={idx} style={styles.grantItem}>
                            <View style={[styles.grantIcon, { backgroundColor: item.color }]}>
                                <item.icon color={COLORS.text} size={20} />
                            </View>
                            <View style={styles.grantContent}>
                                <Text style={styles.grantTitle}>{item.title}</Text>
                                <Text style={styles.grantDesc}>{item.desc}</Text>
                            </View>
                            <ChevronRight color={COLORS.border} size={20} />
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>

            <VictimBottomNav navigation={navigation} active="Wallet" />
        </Layout>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    content: { padding: SPACING.lg },
    appBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: SPACING.lg, paddingVertical: SPACING.md, backgroundColor: '#FFFFFF' },
    appBarTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    appBarTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.primary },
    appBarActions: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    onlineBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F0FDF4', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, gap: 4 },
    dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: COLORS.success },
    onlineText: { fontSize: 10, fontWeight: 'bold', color: COLORS.success },
    actionCircle: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#F8FAFC', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: COLORS.border },
    sectionTitle: { fontSize: 14, color: COLORS.textSecondary, marginBottom: 20, textAlign: 'center' },
    idCard: { backgroundColor: '#FFFFFF', borderRadius: 24, padding: 24, borderWidth: 1, borderColor: COLORS.border, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 12, elevation: 2 },
    idHeader: { flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 32 },
    idAvatar: { width: 56, height: 56, borderRadius: 28 },
    idName: { fontSize: 20, fontWeight: 'bold', color: COLORS.text },
    idBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
    idBadgeText: { fontSize: 12, color: COLORS.success, fontWeight: '600' },
    idQrHolder: { alignItems: 'center', marginBottom: 32 },
    qrImage: { width: 180, height: 180, marginBottom: 16 },
    qrHint: { fontSize: 12, color: COLORS.textSecondary, textAlign: 'center' },
    blockChainSecured: { borderTopWidth: 1, borderTopColor: COLORS.border, paddingTop: 16, flexDirection: 'row', alignItems: 'center', gap: 8 },
    securedText: { fontSize: 11, fontWeight: 'bold', color: '#64748B', letterSpacing: 0.5 },
    didText: { fontSize: 11, color: COLORS.textSecondary, marginLeft: 'auto' },
    grantHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 40, marginBottom: 16 },
    grantSectionTitle: { fontSize: 16, fontWeight: 'bold', color: COLORS.text },
    viewHistory: { fontSize: 12, color: COLORS.primary, fontWeight: '600' },
    grantList: { gap: 12, marginBottom: 40 },
    grantItem: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#FFFFFF', borderRadius: 16, borderWidth: 1, borderColor: COLORS.border },
    grantIcon: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
    grantContent: { flex: 1 },
    grantTitle: { fontSize: 14, fontWeight: 'bold', color: COLORS.text },
    grantDesc: { fontSize: 11, color: COLORS.textSecondary, marginTop: 2 },
    bottomNav: { flexDirection: 'row', height: 80, backgroundColor: '#FFFFFF', borderTopWidth: 1, borderTopColor: COLORS.border, paddingHorizontal: 20, paddingBottom: 10 },
    navItem: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 4 },
    navText: { fontSize: 10, color: COLORS.textSecondary, fontWeight: '500' },
    scanFab: { width: 64, height: 64, borderRadius: 32, backgroundColor: COLORS.primary, marginTop: -32, alignItems: 'center', justifyContent: 'center', shadowColor: COLORS.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 8, borderWidth: 4, borderColor: '#FFFFFF' },
});

export default VictimWallet;
