import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../constants/theme';
import Layout from '../../components/Layout';
import { ArrowLeft, CheckCircle2, Shield, Info, Brain, TriangleAlert } from 'lucide-react-native';

const AIResult = ({ navigation }) => {
    return (
        <Layout>
            <View style={styles.appBar}>
                <TouchableOpacity onPress={() => navigation?.goBack()} style={styles.backBtn}>
                    <ArrowLeft color={COLORS.text} size={24} />
                </TouchableOpacity>
                <Text style={styles.appBarTitle}>Assessment Result</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView style={styles.container} contentContainerStyle={styles.content}>
                <View style={styles.badgeRow}>
                    <View style={styles.successBadge}>
                        <CheckCircle2 color={COLORS.success} size={14} />
                        <Text style={styles.successBadgeText}>Analysis Complete</Text>
                    </View>
                </View>

                <View style={styles.resultHeader}>
                    <Text style={styles.resultTitle}>Eligible for Relief</Text>
                    <Text style={styles.resultSubtitle}>Based on AI analysis of your submitted evidence.</Text>
                </View>

                <View style={styles.grantCard}>
                    <Text style={styles.grantLabel}>RECOMMENDED GRANT</Text>
                    <Text style={styles.grantAmount}>$2,500.00</Text>

                    <View style={styles.divider} />

                    <View style={styles.metricsRow}>
                        <View style={styles.metricItem}>
                            <Text style={styles.metricLabel}>Eligibility Score</Text>
                            <View style={styles.metricValueRow}>
                                <Text style={styles.metricValue}>85</Text>
                                <Text style={styles.metricMax}>/ 100</Text>
                            </View>
                        </View>
                        <View style={styles.vDivider} />
                        <View style={styles.metricItem}>
                            <Text style={styles.metricLabel}>Damage Level</Text>
                            <View style={styles.damageBadge}>
                                <Text style={styles.damageText}>High</Text>
                                <TriangleAlert color={COLORS.alert} size={16} fill={COLORS.alert} />
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.insightsSection}>
                    <Text style={styles.sectionTitle}>Verification Insights</Text>

                    <View style={styles.insightItem}>
                        <View style={styles.insightIcon}>
                            <CheckCircle2 color={COLORS.success} size={18} />
                        </View>
                        <View style={styles.insightContent}>
                            <Text style={styles.insightTitle}>Structural Damage Detected</Text>
                            <Text style={styles.insightText}>AI analysis confirms significant roof damage consistent with Category 5 storm impact.</Text>
                        </View>
                    </View>

                    <View style={styles.insightItem}>
                        <View style={styles.insightIcon}>
                            <CheckCircle2 color={COLORS.success} size={18} />
                        </View>
                        <View style={styles.insightContent}>
                            <Text style={styles.insightTitle}>Geo-Location Verified</Text>
                            <Text style={styles.insightText}>Metadata from uploaded photos matches the declared disaster zone coordinates.</Text>
                        </View>
                    </View>

                    <View style={styles.insightItem}>
                        <View style={styles.insightIcon}>
                            <CheckCircle2 color={COLORS.success} size={18} />
                        </View>
                        <View style={styles.insightContent}>
                            <Text style={styles.insightTitle}>Policy Limit Check</Text>
                            <Text style={styles.insightText}>Claim amount is within the standard relief cap for this region.</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.disclaimer}>
                    <Text style={styles.disclaimerText}>
                        *Final approval is subject to human auditor review. Funds are typically disbursed within 2-3 business days.
                    </Text>
                </View>

                <View style={{ height: 160 }} />
            </ScrollView>

            {/* Footer Buttons */}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.submitBtn} onPress={() => navigation?.navigate('ClaimStatus')}>
                    <Text style={styles.submitBtnText}>Submit Claim for Approval</Text>
                    <ArrowLeft style={{ transform: [{ rotate: '180deg' }] }} color="#FFFFFF" size={20} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.editBtn} onPress={() => navigation.goBack()}>
                    <Text style={styles.editBtnText}>Edit Information</Text>
                </TouchableOpacity>
            </View>
        </Layout>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    content: { padding: SPACING.lg },
    appBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: SPACING.lg, paddingVertical: SPACING.md },
    appBarTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.text },
    badgeRow: { alignItems: 'center', marginVertical: 16 },
    successBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F0FDF4', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, gap: 6, borderWidth: 1, borderColor: '#DCFCE7' },
    successBadgeText: { fontSize: 13, color: COLORS.success, fontWeight: 'bold' },
    resultHeader: { alignItems: 'center', marginBottom: 32 },
    resultTitle: { fontSize: 28, fontWeight: 'bold', color: COLORS.text, marginBottom: 8 },
    resultSubtitle: { fontSize: 15, color: COLORS.textSecondary, textAlign: 'center', paddingHorizontal: 20 },
    grantCard: { backgroundColor: '#FFFFFF', padding: 24, borderRadius: 24, borderWidth: 1, borderColor: COLORS.border, elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8 },
    grantLabel: { fontSize: 11, fontWeight: 'bold', color: COLORS.textSecondary, textAlign: 'center', marginBottom: 12, letterSpacing: 1 },
    grantAmount: { fontSize: 42, fontWeight: 'bold', color: COLORS.primary, textAlign: 'center', marginBottom: 24 },
    divider: { h: 1, backgroundColor: COLORS.border, height: 1, marginBottom: 20 },
    metricsRow: { flexDirection: 'row', alignItems: 'center' },
    metricItem: { flex: 1, alignItems: 'center' },
    metricLabel: { fontSize: 12, color: COLORS.textSecondary, marginBottom: 4 },
    metricValueRow: { flexDirection: 'row', alignItems: 'baseline' },
    metricValue: { fontSize: 20, fontWeight: 'bold', color: COLORS.text },
    metricMax: { fontSize: 14, color: COLORS.textSecondary },
    vDivider: { width: 1, height: 40, backgroundColor: COLORS.border },
    damageBadge: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    damageText: { fontSize: 20, fontWeight: 'bold', color: COLORS.text },
    insightsSection: { marginTop: 40 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.text, marginBottom: 20 },
    insightItem: { flexDirection: 'row', gap: 16, marginBottom: 24 },
    insightIcon: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#F0FDF4', alignItems: 'center', justifyContent: 'center' },
    insightContent: { flex: 1 },
    insightTitle: { fontSize: 15, fontWeight: 'bold', color: COLORS.text, marginBottom: 4 },
    insightText: { fontSize: 13, color: COLORS.textSecondary, lineHeight: 18 },
    disclaimer: { marginTop: 20, padding: 16, borderStyle: 'solid', borderTopWidth: 1, borderTopColor: COLORS.border },
    disclaimerText: { fontSize: 12, color: COLORS.textSecondary, fontStyle: 'italic', textAlign: 'center' },
    footer: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 20, backgroundColor: '#FFFFFF' },
    submitBtn: { backgroundColor: '#1E3A8A', flexDirection: 'row', padding: 16, borderRadius: 12, alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 12 },
    submitBtnText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
    editBtn: { padding: 16, alignItems: 'center' },
    editBtnText: { color: COLORS.textSecondary, fontSize: 14, fontWeight: '600' },
});

export default AIResult;
