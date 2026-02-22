import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../constants/theme';
import { Shield, ChevronRight, WifiOff, Globe, Lock, BrainCircuit } from 'lucide-react-native';
import axios from 'axios';

const VictimOnboarding = ({ navigation }) => {
    const [aiStatus, setAiStatus] = React.useState(null);
    const [isAnalyzing, setIsAnalyzing] = React.useState(false);

    const checkAiRisk = async () => {
        setIsAnalyzing(true);
        try {
            const response = await axios.post('http://localhost:11434/api/generate', {
                model: 'llama3',
                prompt: 'Evaluate this disaster scenario: I am trapped in a flood with no electricity. Am I high risk? Reply with exactly: HIGH RISK or LOW RISK.',
                stream: false
            });
            setAiStatus(response.data.response.includes('HIGH') ? 'HIGH RISK' : 'ELEVATED RISK');
        } catch (e) {
            setAiStatus('OFFLINE AI (Default)');
        }
        setIsAnalyzing(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.logoRow}>
                    <Shield color={COLORS.primary} size={24} />
                    <Text style={styles.logoText}>DisasterCred</Text>
                </View>
                <TouchableOpacity style={styles.langBtn}>
                    <Globe color={COLORS.textSecondary} size={18} />
                    <Text style={styles.langText}>English</Text>
                    <ChevronRight color={COLORS.textSecondary} size={16} />
                </TouchableOpacity>
            </View>

            <View style={styles.content}>
                <View style={styles.heroCard}>
                    <View style={styles.heroCircle}>
                        <Lock color="#FFFFFF" size={48} />
                    </View>
                </View>

                <Text style={styles.title}>Secure Aid Verification</Text>
                <Text style={styles.subtitle}>Your digital ID is private, secure, and stays encrypted on your phone.</Text>

                <View style={styles.offlineBox}>
                    <View style={styles.offlineBadge}>
                        <WifiOff color={COLORS.primary} size={20} />
                    </View>
                    <View style={styles.offlineContent}>
                        <Text style={styles.offlineTitle}>Works Offline</Text>
                        <Text style={styles.offlineDesc}>No internet? No problem. You can create your ID and verify without a connection.</Text>
                    </View>
                </View>
            </View>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.primaryBtn} onPress={() => { checkAiRisk(); navigation?.navigate('Home'); }}>
                    <Text style={styles.primaryBtnText}>Create Digital ID (DID)</Text>
                </TouchableOpacity>

                {aiStatus && (
                    <View style={styles.aiBadge}>
                        <BrainCircuit color="#FFB800" size={16} />
                        <Text style={styles.aiText}>AI Assessment: {aiStatus}</Text>
                    </View>
                )}

                <TouchableOpacity style={styles.secondaryBtn}>
                    <Text style={styles.secondaryBtnText}>I already have an ID</Text>
                </TouchableOpacity>

                <View style={styles.disclaimerRow}>
                    <Shield color={COLORS.textSecondary} size={12} />
                    <Text style={styles.disclaimerText}>Your data is protected under international humanitarian privacy standards.</Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFFFFF' },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: SPACING.lg },
    logoRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    logoText: { fontSize: 18, fontWeight: 'bold', color: COLORS.primary },
    langBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#F8FAFC', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 20, borderWidth: 1, borderColor: COLORS.border },
    langText: { fontSize: 12, fontWeight: 'bold', color: COLORS.textSecondary },
    content: { flex: 1, alignItems: 'center', paddingHorizontal: 40, justifyContent: 'center' },
    heroCard: { width: 180, height: 180, borderRadius: 24, backgroundColor: '#1E293B', alignItems: 'center', justifyContent: 'center', marginBottom: 40, shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 20 },
    heroCircle: { width: 100, height: 100, borderRadius: 50, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.05)' },
    title: { fontSize: 26, fontWeight: 'bold', color: COLORS.text, marginBottom: 12, textAlign: 'center' },
    subtitle: { fontSize: 16, color: COLORS.textSecondary, textAlign: 'center', lineHeight: 24, marginBottom: 40 },
    offlineBox: { flexDirection: 'row', backgroundColor: '#F0F9FF', padding: 20, borderRadius: 16, gap: 16, borderWidth: 1, borderColor: '#BAE6FD' },
    offlineBadge: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' },
    offlineContent: { flex: 1 },
    offlineTitle: { fontSize: 15, fontWeight: 'bold', color: COLORS.primary, marginBottom: 4 },
    offlineDesc: { fontSize: 13, color: '#0369A1', lineHeight: 18 },
    footer: { padding: SPACING.lg },
    primaryBtn: { backgroundColor: COLORS.primary, padding: 18, borderRadius: 12, alignItems: 'center', marginBottom: 12 },
    primaryBtnText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
    secondaryBtn: { padding: 12, alignItems: 'center', marginBottom: 20 },
    secondaryBtnText: { color: COLORS.primary, fontSize: 15, fontWeight: 'bold' },
    disclaimerRow: { flexDirection: 'row', gap: 8, alignItems: 'center', paddingHorizontal: 20 },
    disclaimerText: { fontSize: 10, color: COLORS.textSecondary, textAlign: 'center', flex: 1 },
    aiBadge: { flexDirection: 'row', gap: 6, alignItems: 'center', backgroundColor: '#FFFBEB', padding: 8, borderRadius: 8, borderWidth: 1, borderColor: '#FDE68A', marginBottom: 16, justifyContent: 'center' },
    aiText: { fontSize: 13, fontWeight: 'bold', color: '#B45309' },
});

export default VictimOnboarding;
