import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../constants/theme';
import Layout from '../../components/Layout';
import { ArrowLeft, CheckCircle2, Clock, Shield, ChevronRight, Share2, MoreVertical, RefreshCw } from 'lucide-react-native';
import axios from 'axios';
import VictimBottomNav from '../../components/VictimBottomNav';

const ClaimStatus = ({ navigation }) => {
    const [timeline, setTimeline] = React.useState([
        { title: 'Submitted', time: 'Oct 12, 10:00 AM', completed: true },
        { title: 'AI Verification (Pending)', time: 'Calculating claim severity...', completed: false, active: true },
        { title: 'NGO Approvals', time: 'Waiting for AI validation', completed: false, active: false }
    ]);
    const [isAiLoading, setIsAiLoading] = React.useState(false);

    const evaluateClaimWithAI = async () => {
        setIsAiLoading(true);
        try {
            const response = await axios.post('http://localhost:11434/api/generate', {
                model: 'llama3',
                prompt: 'Analyze a disaster claim containing roof damage photos and location data in a severe hurricane zone. Does this look like a legitimate claim? Format response as exactly APPROVED or REJECTED.',
                stream: false
            });
            const isApproved = response.data.response.includes('APPROVED');

            setTimeline([
                { title: 'Submitted', time: 'Oct 12, 10:00 AM', completed: true },
                { title: 'AI Verified', time: isApproved ? 'Approved by Llama3' : 'Flagged for Manual Review', completed: true },
                { title: 'NGO Approvals (0/3)', time: 'Awaiting Red Cross verification', completed: false, active: true },
                { title: 'Relief Issued', time: 'Pending', completed: false },
            ]);
        } catch (error) {
            setTimeline([
                { title: 'Submitted', time: 'Oct 12, 10:00 AM', completed: true },
                { title: 'AI Offline Fallback', time: 'Routed to Manual NGO Queue', completed: true },
                { title: 'NGO Approvals (0/3)', time: 'Awaiting Red Cross verification', completed: false, active: true }
            ]);
        }
        setIsAiLoading(false);
    };

    React.useEffect(() => {
        evaluateClaimWithAI();
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <Layout>
                <View style={styles.appBar}>
                    <TouchableOpacity onPress={() => navigation?.goBack()}>
                        <ArrowLeft color={COLORS.text} size={24} />
                    </TouchableOpacity>
                    <Text style={styles.appBarTitle}>Claim Status</Text>
                    <TouchableOpacity>
                        <MoreVertical color={COLORS.text} size={24} />
                    </TouchableOpacity>
                </View>

                <ScrollView style={styles.container} contentContainerStyle={styles.content}>
                    <View style={styles.idCard}>
                        <View>
                            <Text style={styles.claimLabel}>CLAIM ID</Text>
                            <Text style={styles.claimId}>#DC-8942</Text>
                        </View>
                        <View style={styles.statusBadge}>
                            <Text style={styles.statusText}>In Progress</Text>
                        </View>
                    </View>

                    <View style={styles.datesRow}>
                        <View>
                            <Text style={styles.dateLabel}>Submitted</Text>
                            <Text style={styles.dateValue}>Oct 12, 2023</Text>
                        </View>
                        <View>
                            <Text style={styles.dateLabel}>Last Updated</Text>
                            <Text style={styles.dateValue}>Just now</Text>
                        </View>
                    </View>

                    <View style={styles.timelineSection}>
                        <Text style={styles.sectionTitle}>Application Timeline</Text>

                        <View style={styles.timeline}>
                            {timeline.map((item, idx) => (
                                <View key={idx} style={styles.timelineItem}>
                                    <View style={styles.timelineIndicators}>
                                        <View style={[
                                            styles.timelineDot,
                                            item.completed && styles.dotCompleted,
                                            item.active && styles.dotActive
                                        ]}>
                                            {item.completed && <CheckCircle2 color="#FFFFFF" size={14} />}
                                            {item.active && !isAiLoading && <Clock color="#FFFFFF" size={14} />}
                                            {item.active && isAiLoading && <RefreshCw color="#FFFFFF" size={14} />}
                                        </View>
                                        {idx !== timeline.length - 1 && (
                                            <View style={[styles.timelineLine, item.completed && styles.lineCompleted]} />
                                        )}
                                    </View>
                                    <View style={styles.timelineContent}>
                                        <Text style={[styles.timelineTitle, item.active && { color: COLORS.primary }]}>{item.title}</Text>
                                        <Text style={styles.timelineTime}>{item.time}</Text>
                                    </View>
                                    {item.active && (
                                        <View style={styles.progressLabel}>
                                            <Text style={styles.progressText}>60%</Text>
                                        </View>
                                    )}
                                </View>
                            ))}
                        </View>
                    </View>

                    <View style={styles.officerCard}>
                        <View style={styles.officerHeader}>
                            <Image source={{ uri: 'https://i.pravatar.cc/100?img=12' }} style={styles.officerAvatar} />
                            <View>
                                <Text style={styles.officerName}>Alex Morgan</Text>
                                <View style={styles.verifiedRow}>
                                    <Shield color={COLORS.success} size={12} fill={COLORS.success} />
                                    <Text style={styles.verifiedText}>VERIFIED SURVIVOR</Text>
                                </View>
                            </View>
                            <Share2 color={COLORS.textSecondary} size={20} style={{ marginLeft: 'auto' }} />
                        </View>

                        <View style={styles.qrContainer}>
                            <Image source={require('../../../assets/qr_code.png')} style={styles.qrImage} resizeMode="contain" />
                            <Text style={styles.qrLabel}>Show this code at relief centers to receive aid distribution.</Text>

                            <TouchableOpacity style={styles.tapToEnlarge}>
                                <Text style={styles.tapText}>Tap to enlarge</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.actionLinks}>
                        <TouchableOpacity style={styles.actionBtn}>
                            <Text style={styles.actionBtnText}>Support</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.actionBtn}>
                            <Text style={styles.actionBtnText}>Docs</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </Layout>
            <VictimBottomNav navigation={navigation} active="Status" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    content: { padding: SPACING.lg },
    appBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: SPACING.lg, paddingVertical: SPACING.md },
    appBarTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.text },
    idCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, backgroundColor: '#1E293B', padding: 20, borderRadius: 16 },
    claimLabel: { fontSize: 11, color: '#94A3B8', letterSpacing: 1 },
    claimId: { fontSize: 20, fontWeight: 'bold', color: '#FFFFFF', marginTop: 4 },
    statusBadge: { backgroundColor: '#334155', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
    statusText: { fontSize: 13, color: '#FFFFFF', fontWeight: 'bold' },
    datesRow: { flexDirection: 'row', gap: 40, marginBottom: 32 },
    dateLabel: { fontSize: 12, color: COLORS.textSecondary, marginBottom: 4 },
    dateValue: { fontSize: 15, fontWeight: 'bold', color: COLORS.text },
    timelineSection: { marginBottom: 32 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.text, marginBottom: 24 },
    timeline: { paddingLeft: 10 },
    timelineItem: { flexDirection: 'row', marginBottom: 24, alignItems: 'flex-start' },
    timelineIndicators: { alignItems: 'center', width: 40, marginRight: 16 },
    timelineDot: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#E2E8F0', alignItems: 'center', justifyContent: 'center', zIndex: 1 },
    dotCompleted: { backgroundColor: COLORS.primary },
    dotActive: { backgroundColor: COLORS.primary, borderWidth: 4, borderColor: '#DBEAFE' },
    timelineLine: { position: 'absolute', top: 28, bottom: -24, width: 2, backgroundColor: '#E2E8F0', zIndex: 0 },
    lineCompleted: { backgroundColor: COLORS.primary },
    timelineContent: { flex: 1, paddingTop: 4 },
    timelineTitle: { fontSize: 15, fontWeight: 'bold', color: COLORS.textSecondary },
    timelineTime: { fontSize: 12, color: COLORS.textSecondary, marginTop: 2 },
    progressLabel: { backgroundColor: '#EFF6FF', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4 },
    progressText: { fontSize: 11, fontWeight: 'bold', color: COLORS.primary },
    officerCard: { backgroundColor: '#FFFFFF', borderRadius: 24, padding: 20, borderWidth: 1, borderColor: COLORS.border, marginBottom: 24 },
    officerHeader: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 20 },
    officerAvatar: { width: 40, height: 40, borderRadius: 20 },
    officerName: { fontSize: 16, fontWeight: 'bold', color: COLORS.text },
    verifiedRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    verifiedText: { fontSize: 10, fontWeight: 'bold', color: COLORS.success },
    qrContainer: { alignItems: 'center', backgroundColor: '#F8FAFC', borderRadius: 16, padding: 20 },
    qrImage: { width: 140, height: 140, marginBottom: 16 },
    qrLabel: { fontSize: 13, color: COLORS.textSecondary, textAlign: 'center', paddingHorizontal: 10, lineHeight: 18 },
    tapToEnlarge: { marginTop: 12, flexDirection: 'row', alignItems: 'center', gap: 6 },
    tapText: { fontSize: 11, color: COLORS.textSecondary },
    actionLinks: { flexDirection: 'row', gap: 12 },
    actionBtn: { flex: 1, padding: 12, backgroundColor: '#F1F5F9', borderRadius: 12, alignItems: 'center' },
    actionBtnText: { fontSize: 14, fontWeight: 'bold', color: COLORS.text },
});

export default ClaimStatus;
