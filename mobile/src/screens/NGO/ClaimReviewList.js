import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../constants/theme';
import Layout from '../../components/Layout';
import { Shield, Search, Filter, ChevronRight, TriangleAlert, Bell } from 'lucide-react-native';
import NGOBottomNav from '../../components/NGOBottomNav';

const DARK_COLORS = {
    bg: '#0F172A',
    card: '#1E293B',
    accent: '#3B82F6',
    text: '#FFFFFF',
    textDim: '#94A3B8',
    border: '#334155'
};

const ClaimList = ({ navigation }) => {
    const filters = ['All Risks', 'High Risk', 'Medium Risk', 'Low Risk'];
    const claims = [
        { id: '#CLM-8842', location: 'North River Valley', severity: 'Severe', match: '98% match', color: COLORS.alert, time: '2m ago' },
        { id: '#CLM-9103', location: 'East Lake District', severity: 'Moderate', match: '84% match', color: '#F59E0B', time: '5h ago' },
        { id: '#CLM-8921', location: 'Central Sector 4', severity: 'Minor', match: '92% match', color: COLORS.success, time: 'Yesterday' },
        { id: '#CLM-7732', location: 'South Harbor', severity: 'Critical', match: '96% match', color: COLORS.alert, time: '1h ago' },
        { id: '#CLM-9005', location: 'Uptown District', severity: 'Structural', match: '78% match', color: '#6366F1', time: 'Synced' },
    ];

    return (
        <View style={styles.container}>
            <Layout style={{ backgroundColor: DARK_COLORS.bg }}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation?.goBack()}>
                        <Shield color={DARK_COLORS.text} size={24} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Claim Review</Text>
                    <TouchableOpacity>
                        <Bell color={DARK_COLORS.text} size={24} />
                    </TouchableOpacity>
                </View>

                <View style={styles.searchContainer}>
                    <View style={styles.searchBar}>
                        <Search color={DARK_COLORS.textDim} size={20} />
                        <TextInput
                            placeholder="Search by ID or District..."
                            placeholderTextColor={DARK_COLORS.textDim}
                            style={styles.searchInput}
                        />
                    </View>
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterBar} contentContainerStyle={styles.filterContent}>
                    {filters.map((f, i) => (
                        <TouchableOpacity key={f} style={[styles.filterChip, i === 0 && styles.activeChip]}>
                            <Text style={[styles.filterText, i === 0 && styles.activeFilterText]}>{f}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                <ScrollView style={styles.list} contentContainerStyle={styles.listContent}>
                    {claims.map((claim) => (
                        <TouchableOpacity
                            key={claim.id}
                            style={styles.claimCard}
                            onPress={() => navigation?.navigate('ClaimDetail')}
                        >
                            <View style={[styles.severityBar, { backgroundColor: claim.color }]} />
                            <View style={styles.cardMain}>
                                <View style={styles.cardHeader}>
                                    <Text style={styles.claimId}>{claim.id}</Text>
                                    <Text style={styles.timeText}>{claim.time}</Text>
                                </View>
                                <Text style={styles.locationText}>{claim.location} • <Text style={{ color: claim.color }}>{claim.severity}</Text></Text>
                                <View style={styles.matchRow}>
                                    <Shield color={DARK_COLORS.accent} size={14} />
                                    <Text style={styles.matchText}>{claim.match}</Text>
                                </View>
                            </View>
                            <ChevronRight color={DARK_COLORS.border} size={20} />
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </Layout>
            <NGOBottomNav navigation={navigation} active="Claims" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: DARK_COLORS.bg },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: SPACING.lg, borderBottomWidth: 1, borderBottomColor: DARK_COLORS.border },
    headerTitle: { fontSize: 18, fontWeight: 'bold', color: DARK_COLORS.text },
    searchContainer: { padding: SPACING.lg },
    searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: DARK_COLORS.card, paddingHorizontal: 16, paddingVertical: 12, borderRadius: 12, gap: 12 },
    searchInput: { flex: 1, color: DARK_COLORS.text, fontSize: 14 },
    filterBar: { maxHeight: 50 },
    filterContent: { paddingHorizontal: SPACING.lg, gap: 8 },
    filterChip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: DARK_COLORS.card, borderWidth: 1, borderColor: DARK_COLORS.border },
    activeChip: { backgroundColor: DARK_COLORS.accent, borderColor: DARK_COLORS.accent },
    filterText: { fontSize: 12, color: DARK_COLORS.textDim, fontWeight: 'bold' },
    activeFilterText: { color: '#FFFFFF' },
    list: { flex: 1 },
    listContent: { padding: SPACING.lg, gap: 12 },
    claimCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: DARK_COLORS.card, borderRadius: 16, overflow: 'hidden', borderWidth: 1, borderColor: DARK_COLORS.border, paddingRight: 12 },
    severityBar: { width: 6, height: '100%' },
    cardMain: { flex: 1, padding: 16 },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
    claimId: { fontSize: 15, fontWeight: 'bold', color: DARK_COLORS.text },
    timeText: { fontSize: 11, color: DARK_COLORS.textDim },
    locationText: { fontSize: 13, color: DARK_COLORS.textDim, marginBottom: 8 },
    matchRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    matchText: { fontSize: 11, color: DARK_COLORS.accent, fontWeight: 'bold' },
});

export default ClaimList;
