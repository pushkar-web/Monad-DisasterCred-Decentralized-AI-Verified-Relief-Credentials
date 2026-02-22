import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../constants/theme';
import Layout from '../../components/Layout';
import { ArrowLeft, CheckCircle2, XCircle, Shield, ChevronRight, MapPin, Eye, FileText } from 'lucide-react-native';
import NGOBottomNav from '../../components/NGOBottomNav';

const DARK_COLORS = {
    bg: '#0F172A',
    card: '#1E293B',
    accent: '#3B82F6',
    text: '#FFFFFF',
    textDim: '#94A3B8',
    border: '#334155'
};

const ClaimDetail = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Layout style={{ backgroundColor: DARK_COLORS.bg }}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation?.goBack()}>
                        <ArrowLeft color={DARK_COLORS.text} size={24} />
                    </TouchableOpacity>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.headerTitle}>Claim #8842-X</Text>
                        <View style={styles.verifiedRow}>
                            <Shield color={COLORS.success} size={12} fill={COLORS.success} />
                            <Text style={styles.verifiedText}>Verified • Private</Text>
                        </View>
                    </View>
                    <View style={{ width: 24 }} />
                </View>

                <ScrollView contentContainerStyle={styles.content}>
                    <View style={styles.consensusBar}>
                        <View style={styles.consensusHeader}>
                            <Text style={styles.consensusTitle}>Consensus Status</Text>
                            <Text style={styles.consensusValue}>3 of 5 Approvals</Text>
                        </View>
                        <View style={styles.progressBar}>
                            <View style={[styles.progressInner, { width: '60%' }]} />
                        </View>
                    </View>

                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Visual Evidence</Text>
                            <Text style={styles.photoCount}>4 Photos</Text>
                        </View>
                        <View style={styles.evidenceCard}>
                            <Image source={require('../../../assets/flood_damage.png')} style={styles.mainEvidence} resizeMode="cover" />
                            <View style={styles.evidenceOverlay}>
                                <Text style={styles.evidenceLabel}>Structural Damage: West Wall</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.aiAssessmentBox}>
                        <View style={styles.aiHeader}>
                            <View style={styles.aiBadge}>
                                <Shield color={DARK_COLORS.accent} size={16} />
                                <Text style={styles.aiBadgeText}>AI Assessment</Text>
                            </View>
                        </View>
                        <Text style={styles.aiSummary}>
                            <Text style={{ fontWeight: 'bold', color: DARK_COLORS.text }}>High Probability (87%)</Text> of severe flood damage matching regional reports. Structural cracks on the north wall appear consistent with seismic activity reported at 14:30 UTC.
                        </Text>
                        <View style={styles.aiFlagsRow}>
                            <View style={styles.aiFlag}><Text style={styles.aiFlagText}>Critical Damage</Text></View>
                            <View style={styles.aiFlag}><Text style={styles.aiFlagText}>Verified Geospatial</Text></View>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Metadata</Text>
                        <View style={styles.metadataGrid}>
                            {[
                                { label: 'TIMESTAMP', value: 'Oct 2, 2023 14:15 UTC' },
                                { label: 'DEVICE', value: 'Samsung S22 (Encrypted)' },
                                { label: 'COORDINATES', value: '34.0522, -118.2437' },
                                { label: 'DID HASH', value: '0x8f...3a2e' },
                            ].map((m) => (
                                <View key={m.label} style={styles.metaItem}>
                                    <Text style={styles.metaLabel}>{m.label}</Text>
                                    <Text style={styles.metaValue}>{m.value}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    <View style={{ height: 120 }} />
                </ScrollView>

                <View style={styles.footer}>
                    <TouchableOpacity style={styles.rejectBtn}>
                        <XCircle color="#FFFFFF" size={20} />
                        <Text style={styles.btnText}>Reject</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.approveBtn}>
                        <CheckCircle2 color="#FFFFFF" size={20} />
                        <Text style={styles.btnText}>Approve</Text>
                    </TouchableOpacity>
                </View>
            </Layout>
            <NGOBottomNav navigation={navigation} active="Claims" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: DARK_COLORS.bg },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: SPACING.lg, borderBottomWidth: 1, borderBottomColor: DARK_COLORS.border },
    headerTitle: { fontSize: 16, fontWeight: 'bold', color: DARK_COLORS.text },
    verifiedRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    verifiedText: { fontSize: 10, color: COLORS.success, fontWeight: 'bold' },
    content: { padding: SPACING.lg },
    consensusBar: { marginBottom: 32 },
    consensusHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
    consensusTitle: { fontSize: 12, color: DARK_COLORS.textDim, fontWeight: 'bold' },
    consensusValue: { fontSize: 12, color: DARK_COLORS.accent, fontWeight: 'bold' },
    progressBar: { height: 8, backgroundColor: DARK_COLORS.card, borderRadius: 4, overflow: 'hidden' },
    progressInner: { height: '100%', backgroundColor: DARK_COLORS.accent },
    section: { marginBottom: 32 },
    sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
    sectionTitle: { fontSize: 14, fontWeight: 'bold', color: DARK_COLORS.textDim, letterSpacing: 0.5 },
    photoCount: { fontSize: 12, color: DARK_COLORS.accent, fontWeight: '600' },
    evidenceCard: { borderRadius: 16, overflow: 'hidden', backgroundColor: DARK_COLORS.card, height: 200 },
    mainEvidence: { width: '100%', height: '100%' },
    evidenceOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 12, backgroundColor: 'rgba(0,0,0,0.6)' },
    evidenceLabel: { color: '#FFFFFF', fontSize: 12, fontWeight: '600' },
    aiAssessmentBox: { backgroundColor: '#1E1B4B', padding: 20, borderRadius: 16, borderWidth: 1, borderColor: '#312E81', marginBottom: 32 },
    aiHeader: { marginBottom: 12 },
    aiBadge: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    aiBadgeText: { fontSize: 12, color: DARK_COLORS.accent, fontWeight: 'bold' },
    aiSummary: { fontSize: 14, color: '#C7D2FE', lineHeight: 20 },
    aiFlagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 16 },
    aiFlag: { backgroundColor: 'rgba(59, 130, 246, 0.1)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6, borderWidth: 1, borderColor: 'rgba(59, 130, 246, 0.2)' },
    aiFlagText: { fontSize: 10, color: DARK_COLORS.accent, fontWeight: 'bold' },
    metadataGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 20 },
    metaItem: { width: '45%' },
    metaLabel: { fontSize: 10, color: DARK_COLORS.textDim, fontWeight: 'bold', marginBottom: 4 },
    metaValue: { fontSize: 13, color: DARK_COLORS.text, fontWeight: '500' },
    footer: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 20, backgroundColor: DARK_COLORS.bg, borderTopWidth: 1, borderTopColor: DARK_COLORS.border, flexDirection: 'row', gap: 16 },
    approveBtn: { flex: 1, backgroundColor: COLORS.success, padding: 16, borderRadius: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
    rejectBtn: { flex: 1, backgroundColor: COLORS.alert, padding: 16, borderRadius: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
    btnText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
});

export default ClaimDetail;
