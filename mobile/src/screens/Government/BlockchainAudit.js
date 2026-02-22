import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../constants/theme';
import Layout from '../../components/Layout';
import { Shield, Search, Bell, ExternalLink, CircleCheck, Clock, TriangleAlert } from 'lucide-react-native';
import GovBottomNav from '../../components/GovBottomNav';

const DARK_COLORS = {
    bg: '#0F172A',
    card: '#1E293B',
    accent: '#3B82F6',
    text: '#FFFFFF',
    textDim: '#94A3B8',
    border: '#334155'
};

const BlockchainAudit = ({ navigation }) => {
    const transactions = [
        { id: '#CLM-99281', tx: '0x7f2c...d19f', status: 'Verified', color: COLORS.success, time: 'OCT 24, 14:12:01 UTC' },
        { id: '#CLM-99262', tx: '0x3a2b...c182', status: 'Pending', color: '#F59E0B', time: 'OCT 24, 14:26:22 UTC' },
        { id: '#CLM-99275', tx: '0x8f3c...9a2b', status: 'Verified', color: COLORS.success, time: 'OCT 23, 11:45:10 UTC' },
        { id: '#CLM-99240', tx: '0x0000...0000', status: 'Rejected', color: COLORS.alert, time: 'OCT 22, 10:12:30 UTC' },
    ];

    return (
        <View style={styles.container}>
            <Layout style={{ backgroundColor: DARK_COLORS.bg }}>
                <View style={styles.header}>
                    <View style={styles.headerTitleRow}>
                        <View style={styles.govBadge}>
                            <Shield color="#FFFFFF" size={14} />
                        </View>
                        <View>
                            <Text style={styles.headerLabel}>GOVERNMENT AUDITOR</Text>
                            <Text style={styles.headerTitle}>Blockchain Ledger</Text>
                        </View>
                    </View>
                    <TouchableOpacity><Bell color="#FFFFFF" size={24} /></TouchableOpacity>
                </View>

                <View style={styles.searchContainer}>
                    <View style={styles.searchBar}>
                        <Search color={DARK_COLORS.textDim} size={20} />
                        <TextInput placeholder="Search by Claim ID or Hash..." placeholderTextColor={DARK_COLORS.textDim} style={styles.searchInput} />
                    </View>
                </View>

                <View style={styles.filterBar}>
                    <TouchableOpacity style={[styles.filterBtn, styles.activeFilter]}>
                        <Text style={styles.activeFilterText}>All Records</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.filterBtn}>
                        <Text style={styles.filterText}>Verified</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.filterBtn}>
                        <Text style={styles.filterText}>Pending</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView contentContainerStyle={styles.listContent}>
                    <Text style={styles.sectionTitle}>RECENT TRANSACTIONS</Text>
                    {transactions.map((tx, idx) => (
                        <View key={idx} style={styles.txCard}>
                            <View style={[styles.statusLine, { backgroundColor: tx.color }]} />
                            <View style={styles.txBody}>
                                <View style={styles.txHeader}>
                                    <Text style={styles.claimId}>{tx.id}</Text>
                                    <View style={[styles.statusTag, { backgroundColor: tx.color + '20' }]}>
                                        <Text style={[styles.statusTagText, { color: tx.color }]}>{tx.status}</Text>
                                    </View>
                                </View>
                                <Text style={styles.timeText}>{tx.time}</Text>

                                <View style={styles.hashBox}>
                                    <ExternalLink color={DARK_COLORS.accent} size={14} />
                                    <Text style={styles.hashText}>{tx.tx}</Text>
                                </View>

                                {tx.status === 'Verified' ? (
                                    <View style={styles.auditNote}>
                                        <CircleCheck color={COLORS.success} size={12} />
                                        <Text style={styles.auditNoteText}>Recorded on Blockchain • Block #104219</Text>
                                    </View>
                                ) : tx.status === 'Pending' ? (
                                    <View style={styles.auditNote}>
                                        <Clock color="#F59E0B" size={12} />
                                        <Text style={[styles.auditNoteText, { color: '#F59E0B' }]}>Awaiting Validator Confirmation (2/12)</Text>
                                    </View>
                                ) : (
                                    <View style={styles.auditNote}>
                                        <TriangleAlert color={COLORS.alert} size={12} />
                                        <Text style={[styles.auditNoteText, { color: COLORS.alert }]}>Failed consensus: Invalid signature.</Text>
                                    </View>
                                )}
                            </View>
                        </View>
                    ))}
                </ScrollView>
            </Layout>
            <GovBottomNav navigation={navigation} active="Audit" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: DARK_COLORS.bg },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: SPACING.lg, borderBottomWidth: 1, borderBottomColor: DARK_COLORS.border },
    headerTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    govBadge: { width: 32, height: 32, backgroundColor: DARK_COLORS.accent, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
    headerLabel: { fontSize: 10, color: DARK_COLORS.textDim, fontWeight: 'bold', letterSpacing: 0.5 },
    headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#FFFFFF' },
    searchContainer: { padding: SPACING.lg },
    searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: DARK_COLORS.card, paddingHorizontal: 16, paddingVertical: 12, borderRadius: 12, gap: 12 },
    searchInput: { flex: 1, color: DARK_COLORS.text, fontSize: 14 },
    filterBar: { flexDirection: 'row', paddingHorizontal: SPACING.lg, gap: 10, marginBottom: 20 },
    filterBtn: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: DARK_COLORS.card, borderWidth: 1, borderColor: DARK_COLORS.border },
    activeFilter: { backgroundColor: DARK_COLORS.accent, borderColor: DARK_COLORS.accent },
    filterText: { fontSize: 12, color: DARK_COLORS.textDim, fontWeight: 'bold' },
    activeFilterText: { fontSize: 12, color: '#FFFFFF', fontWeight: 'bold' },
    listContent: { padding: SPACING.lg },
    sectionTitle: { fontSize: 11, color: DARK_COLORS.textDim, fontWeight: 'bold', letterSpacing: 1, marginBottom: 16 },
    txCard: { flexDirection: 'row', backgroundColor: DARK_COLORS.card, borderRadius: 16, overflow: 'hidden', borderWidth: 1, borderColor: DARK_COLORS.border, marginBottom: 16 },
    statusLine: { width: 4 },
    txBody: { flex: 1, padding: 16 },
    txHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
    claimId: { fontSize: 15, fontWeight: 'bold', color: '#FFF' },
    statusTag: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4 },
    statusTagText: { fontSize: 10, fontWeight: 'bold' },
    timeText: { fontSize: 11, color: DARK_COLORS.textDim, marginBottom: 16 },
    hashBox: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#0F172A', padding: 12, borderRadius: 12, marginBottom: 12 },
    hashText: { fontSize: 12, color: DARK_COLORS.accent, fontWeight: '500', fontFamily: 'monospace' },
    auditNote: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    auditNoteText: { fontSize: 11, color: COLORS.success, fontWeight: '600' },
});

export default BlockchainAudit;
