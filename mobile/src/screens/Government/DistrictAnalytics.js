import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Switch } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../constants/theme';
import Layout from '../../components/Layout';
import { Map as MapIcon, ChevronRight, Share2, Search, Filter, TriangleAlert } from 'lucide-react-native';
import GovBottomNav from '../../components/GovBottomNav';

const DARK_COLORS = {
    bg: '#0F172A',
    card: '#1E293B',
    accent: '#3B82F6',
    text: '#FFFFFF',
    textDim: '#94A3B8',
    border: '#334155'
};

const DistrictAnalytics = ({ navigation }) => {
    const types = ['Flood', 'Earthquake', 'Wildfire'];

    return (
        <View style={styles.container}>
            <Layout style={{ backgroundColor: DARK_COLORS.bg }}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>District Analytics</Text>
                        <TouchableOpacity><Share2 color="#FFFFFF" size={24} /></TouchableOpacity>
                    </View>

                    <View style={styles.mapContainer}>
                        <View style={styles.mapMock}>
                            {/* Map Layout Mock */}
                            <View style={styles.mapDotLarge}><Text style={styles.dotText}>156</Text></View>
                            <View style={styles.mapDotSmall}><Text style={styles.dotText}>42</Text></View>
                            {/* Radius Circle */}
                            <View style={styles.radiusCircle} />
                        </View>

                        <TouchableOpacity style={styles.searchFab}>
                            <Search color="#FFFFFF" size={20} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.detailsPanel}>
                        <View style={styles.statsRow}>
                            <View>
                                <Text style={styles.statLabel}>CLAIMS IN VIEW</Text>
                                <Text style={styles.statValue}>1,204</Text>
                            </View>
                            <View style={styles.riskBadge}>
                                <View style={styles.riskDot} />
                                <Text style={styles.riskText}>RISK LEVEL: <Text style={{ color: COLORS.alert }}>CRITICAL</Text></Text>
                            </View>
                        </View>

                        <Text style={styles.filterTitle}>DISASTER TYPE</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.typeFilter} contentContainerStyle={{ gap: 10 }}>
                            {types.map((t, i) => (
                                <TouchableOpacity key={t} style={[styles.typeChip, i === 0 && styles.typeChipActive]}>
                                    <View style={[styles.dot, i === 0 && { backgroundColor: '#FFFFFF' }]} />
                                    <Text style={[styles.typeText, i === 0 && { color: '#FFFFFF' }]}>{t}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>

                        <View style={styles.heatmapToggle}>
                            <View style={styles.toggleText}>
                                <TriangleAlert color="#F59E0B" size={20} />
                                <View>
                                    <Text style={styles.toggleTitle}>Risk Heatmap</Text>
                                    <Text style={styles.toggleDesc}>Visualize fraud density</Text>
                                </View>
                            </View>
                            <Switch value={true} trackColor={{ false: '#334155', true: DARK_COLORS.accent }} />
                        </View>
                    </View>

                    <View style={{ height: 24 }} />
                </ScrollView>
            </Layout>
            <GovBottomNav navigation={navigation} active="Analytics" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: DARK_COLORS.bg },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: SPACING.lg },
    headerTitle: { fontSize: 20, fontWeight: 'bold', color: DARK_COLORS.text },
    mapContainer: { height: 280, backgroundColor: '#1E293B', position: 'relative' },
    mapMock: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    mapDotLarge: { width: 50, height: 50, borderRadius: 25, backgroundColor: 'rgba(239, 68, 68, 0.4)', borderWidth: 2, borderColor: COLORS.alert, alignItems: 'center', justifyContent: 'center' },
    mapDotSmall: { width: 34, height: 34, borderRadius: 17, backgroundColor: 'rgba(59, 130, 246, 0.4)', borderWidth: 2, borderColor: DARK_COLORS.accent, alignItems: 'center', justifyContent: 'center', position: 'absolute', top: 120, left: 100 },
    dotText: { color: '#FFFFFF', fontSize: 12, fontWeight: 'bold' },
    radiusCircle: { width: 140, height: 140, borderRadius: 70, borderStyle: 'dashed', borderWidth: 1, borderColor: DARK_COLORS.textDim, position: 'absolute' },
    searchFab: { position: 'absolute', top: 20, right: 20, width: 44, height: 44, borderRadius: 22, backgroundColor: DARK_COLORS.card, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: DARK_COLORS.border },
    detailsPanel: { backgroundColor: DARK_COLORS.bg, borderTopWidth: 1, borderTopColor: DARK_COLORS.border, padding: 24, borderTopLeftRadius: 24, borderTopRightRadius: 24 },
    statsRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 },
    statLabel: { fontSize: 10, fontWeight: 'bold', color: DARK_COLORS.textDim, letterSpacing: 1 },
    statValue: { fontSize: 24, fontWeight: 'bold', color: '#FFFFFF', marginTop: 4 },
    riskBadge: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    riskDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.alert },
    riskText: { fontSize: 11, fontWeight: 'bold', color: DARK_COLORS.textDim },
    filterTitle: { fontSize: 12, fontWeight: 'bold', color: DARK_COLORS.textSecondary, marginBottom: 12 },
    typeFilter: { marginBottom: 32 },
    typeChip: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: DARK_COLORS.card, paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20, borderWidth: 1, borderColor: DARK_COLORS.border },
    typeChipActive: { backgroundColor: DARK_COLORS.accent, borderColor: DARK_COLORS.accent },
    dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: DARK_COLORS.accent },
    typeText: { fontSize: 12, fontWeight: 'bold', color: DARK_COLORS.textDim },
    heatmapToggle: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#1E293B', padding: 16, borderRadius: 16, borderWidth: 1, borderColor: DARK_COLORS.border },
    toggleText: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    toggleTitle: { fontSize: 14, fontWeight: 'bold', color: '#FFF' },
    toggleDesc: { fontSize: 12, color: DARK_COLORS.textDim },
});

export default DistrictAnalytics;
