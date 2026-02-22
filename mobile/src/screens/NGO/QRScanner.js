import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { COLORS, SPACING } from '../../constants/theme';
import { ArrowLeft, Shield, CircleCheckBig, Info } from 'lucide-react-native';
import NGOBottomNav from '../../components/NGOBottomNav';

const DARK_COLORS = {
    bg: '#0F172A',
    card: '#1E293B',
    accent: '#3B82F6',
    text: '#FFFFFF',
    textDim: '#94A3B8',
    border: '#334155'
};

const QRScanner = ({ navigation }) => {
    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation?.goBack()}>
                    <ArrowLeft color={DARK_COLORS.text} size={24} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Scan QR Code</Text>
                <TouchableOpacity>
                    <Info color={DARK_COLORS.text} size={24} />
                </TouchableOpacity>
            </View>

            <Text style={styles.hint}>Align code within frame</Text>

            {/* Camera Mock - fixed height */}
            <View style={styles.camMock}>
                <View style={styles.scanTarget}>
                    <View style={[styles.corner, styles.tl]} />
                    <View style={[styles.corner, styles.tr]} />
                    <View style={[styles.corner, styles.bl]} />
                    <View style={[styles.corner, styles.br]} />
                </View>
            </View>

            {/* Scrollable result section */}
            <ScrollView style={styles.resultScroll} contentContainerStyle={{ padding: 20 }}>
                <View style={styles.resultCard}>
                    <View style={styles.statusRow}>
                        <CircleCheckBig color={COLORS.success} size={24} />
                        <View>
                            <Text style={styles.resultTitle}>Claim Valid</Text>
                            <Text style={styles.resultSubtitle}>Beneficiary #8829-A</Text>
                        </View>
                    </View>

                    <View style={styles.blockchainBadge}>
                        <Shield color={DARK_COLORS.accent} size={14} />
                        <Text style={styles.blockchainBadgeText}>BLOCKCHAIN VERIFIED</Text>
                    </View>

                    <View style={styles.reliefInfo}>
                        <View style={styles.reliefIcon}>
                            <Shield color="#FFFFFF" size={20} />
                        </View>
                        <View>
                            <Text style={styles.reliefLabel}>ALLOCATED RELIEF</Text>
                            <Text style={styles.reliefValue}>Family Food & Medical Kit</Text>
                        </View>
                    </View>

                    <Text style={styles.lastScanTime}>Last scanned: None • ID: D-TX-2023-002</Text>

                    <View style={styles.actionRow}>
                        <TouchableOpacity style={styles.reportBtn}>
                            <Text style={styles.reportText}>Report Issue</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.confirmBtn}>
                            <Text style={styles.confirmText}>Confirm Distribution</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ height: 20 }} />
            </ScrollView>

            <NGOBottomNav navigation={navigation} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: DARK_COLORS.bg },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: SPACING.lg },
    headerTitle: { fontSize: 16, fontWeight: 'bold', color: DARK_COLORS.text },
    hint: { color: DARK_COLORS.textDim, textAlign: 'center', fontSize: 14, marginBottom: 16 },
    camMock: { height: 260, backgroundColor: '#334155', alignItems: 'center', justifyContent: 'center', marginHorizontal: 20, borderRadius: 20, overflow: 'hidden' },
    scanTarget: { width: 220, height: 220, position: 'relative' },
    corner: { position: 'absolute', width: 40, height: 40, borderColor: DARK_COLORS.accent, borderWidth: 4 },
    tl: { top: 0, left: 0, borderRightWidth: 0, borderBottomWidth: 0 },
    tr: { top: 0, right: 0, borderLeftWidth: 0, borderBottomWidth: 0 },
    bl: { bottom: 0, left: 0, borderRightWidth: 0, borderTopWidth: 0 },
    br: { bottom: 0, right: 0, borderLeftWidth: 0, borderTopWidth: 0 },
    resultScroll: { flex: 1 },
    resultCard: { backgroundColor: DARK_COLORS.card, padding: 24, borderRadius: 24, borderWidth: 1, borderColor: DARK_COLORS.border },
    statusRow: { flexDirection: 'row', gap: 16, alignItems: 'center', marginBottom: 12 },
    resultTitle: { fontSize: 20, fontWeight: 'bold', color: DARK_COLORS.text },
    resultSubtitle: { fontSize: 14, color: DARK_COLORS.textDim },
    blockchainBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 24 },
    blockchainBadgeText: { fontSize: 10, color: DARK_COLORS.accent, fontWeight: 'bold' },
    reliefInfo: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: '#0F172A', padding: 16, borderRadius: 16, marginBottom: 20 },
    reliefIcon: { width: 40, height: 40, borderRadius: 12, backgroundColor: DARK_COLORS.accent, alignItems: 'center', justifyContent: 'center' },
    reliefLabel: { fontSize: 10, color: DARK_COLORS.textDim, fontWeight: 'bold', letterSpacing: 1 },
    reliefValue: { fontSize: 15, fontWeight: 'bold', color: DARK_COLORS.text },
    lastScanTime: { fontSize: 10, color: DARK_COLORS.textDim, textAlign: 'center', marginBottom: 24 },
    actionRow: { flexDirection: 'row', gap: 12 },
    reportBtn: { flex: 1, padding: 14, backgroundColor: '#1E293B', borderRadius: 12, alignItems: 'center' },
    reportText: { color: DARK_COLORS.textDim, fontSize: 14, fontWeight: 'bold' },
    confirmBtn: { flex: 2, backgroundColor: DARK_COLORS.accent, padding: 14, borderRadius: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
    confirmText: { color: '#FFFFFF', fontSize: 14, fontWeight: 'bold' },
});

export default QRScanner;
