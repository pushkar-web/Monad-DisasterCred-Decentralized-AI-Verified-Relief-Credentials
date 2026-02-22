import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image, Alert } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../constants/theme';
import Layout from '../../components/Layout';
import { ArrowLeft, Camera, Mic, MapPin, Upload, X, Play, Brain } from 'lucide-react-native';

const CreateClaim = ({ navigation }) => {
    const [photos, setPhotos] = useState([]);
    const [isRecording, setIsRecording] = useState(false);

    const addPhoto = () => {
        // Mock photo addition
        if (photos.length < 6) {
            setPhotos([...photos, 'https://via.placeholder.com/150']);
        }
    };

    return (
        <Layout>
            <View style={styles.appBar}>
                <TouchableOpacity onPress={() => navigation?.goBack()} style={styles.backBtn}>
                    <ArrowLeft color={COLORS.text} size={24} />
                </TouchableOpacity>
                <Text style={styles.appBarTitle}>Create New Claim</Text>
                <TouchableOpacity onPress={() => navigation?.goBack()}>
                    <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.container} contentContainerStyle={styles.content}>
                {/* Incident Location */}
                <View style={styles.section}>
                    <View style={styles.sectionLabelRow}>
                        <Text style={styles.sectionLabel}>Incident Location</Text>
                        <View style={styles.gpsBadge}>
                            <View style={styles.gpsDot} />
                            <Text style={styles.gpsText}>GPS Active</Text>
                        </View>
                    </View>

                    <View style={styles.locationCard}>
                        <View style={styles.locationIcon}>
                            <MapPin color={COLORS.primary} size={20} />
                        </View>
                        <View style={styles.locationInfo}>
                            <Text style={styles.addressTitle}>AUTO-DETECTED ADDRESS</Text>
                            <Text style={styles.addressText}>123 Maple Ave, Springfield</Text>
                            <Text style={styles.coordsText}>Lat: 34.0522 • Long: -118.2437 (+/- 5m accuracy)</Text>
                        </View>
                        <TouchableOpacity style={styles.adjustPin}>
                            <Text style={styles.adjustText}>Adjust Pin</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.mapPlaceholder} />
                </View>

                {/* Damage Evidence */}
                <View style={styles.section}>
                    <View style={styles.sectionLabelRow}>
                        <Text style={styles.sectionLabel}>Damage Evidence</Text>
                        <Text style={styles.countText}>{photos.length}/6</Text>
                    </View>
                    <Text style={styles.sectionHint}>Tap to take photos of the damage from multiple angles.</Text>

                    <View style={styles.photoGrid}>
                        <TouchableOpacity style={styles.addPhotoBtn} onPress={addPhoto}>
                            <Camera color={COLORS.primary} size={32} />
                            <Text style={styles.addPhotoText}>Add Photo</Text>
                        </TouchableOpacity>
                        {photos.map((uri, idx) => (
                            <View key={idx} style={styles.photoWrapper}>
                                <Image source={{ uri }} style={styles.photoThumb} />
                                <TouchableOpacity style={styles.removePhoto} onPress={() => setPhotos(photos.filter((_, i) => i !== idx))}>
                                    <X color="#FFFFFF" size={14} />
                                </TouchableOpacity>
                            </View>
                        ))}
                        {[...Array(5 - photos.length)].map((_, i) => (
                            <View key={i} style={styles.emptyPhotoSlot} />
                        ))}
                    </View>
                </View>

                {/* Describe the Situation */}
                <View style={styles.section}>
                    <Text style={styles.sectionLabel}>Describe the Situation</Text>

                    <View style={styles.voiceCard}>
                        <View style={styles.voiceHeader}>
                            <View style={styles.voiceIndicator}>
                                <Mic color={COLORS.alert} size={20} />
                                <Text style={styles.voiceTitle}>Voice Note</Text>
                            </View>
                            <Text style={styles.voiceLimit}>0:00 / 2:00 max</Text>
                        </View>

                        <View style={styles.waveformPlaceholder} />

                        <TouchableOpacity
                            style={[styles.recordBtn, isRecording && styles.recordingActive]}
                            onPress={() => setIsRecording(!isRecording)}
                        >
                            <View style={styles.recordOuter}>
                                <View style={[styles.recordInner, isRecording && styles.recordStop]} />
                            </View>
                            <Text style={styles.recordLabel}>{isRecording ? 'Stop Recording' : 'Start Recording'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* ID Documents */}
                <View style={styles.section}>
                    <View style={styles.sectionLabelRow}>
                        <Text style={styles.sectionLabel}>ID Documents</Text>
                        <Text style={[styles.countText, { color: COLORS.textSecondary }]}>Optional</Text>
                    </View>

                    <TouchableOpacity style={styles.uploadCard}>
                        <Upload color={COLORS.textSecondary} size={24} />
                        <Text style={styles.uploadTitle}>Click to upload ID or Passport</Text>
                        <Text style={styles.uploadHint}>PDF, JPG or PNG (MAX. 5MB)</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ height: 100 }} />
            </ScrollView>

            {/* Fixed Footer Button */}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.runAiBtn} onPress={() => navigation?.navigate('AIResult')}>
                    <Brain color="#FFFFFF" size={20} />
                    <Text style={styles.runAiBtnText}>Run AI Assessment</Text>
                </TouchableOpacity>
            </View>
        </Layout>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    content: { padding: SPACING.lg },
    appBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: SPACING.lg, paddingVertical: SPACING.md, borderBottomWidth: 1, borderBottomColor: COLORS.border },
    appBarTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.text },
    cancelText: { color: COLORS.alert, fontWeight: '600' },
    section: { marginBottom: 32 },
    sectionLabelRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
    sectionLabel: { fontSize: 16, fontWeight: '700', color: COLORS.text },
    sectionHint: { fontSize: 13, color: COLORS.textSecondary, marginBottom: 16 },
    countText: { fontSize: 14, color: COLORS.primary, fontWeight: '600' },
    gpsBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#ECFDF5', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
    gpsDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: COLORS.success, marginRight: 6 },
    gpsText: { fontSize: 11, color: COLORS.success, fontWeight: 'bold' },
    locationCard: { flexDirection: 'row', alignItems: 'flex-start', backgroundColor: '#FFFFFF', padding: 16, borderRadius: 16, borderWidth: 1, borderColor: COLORS.border },
    locationIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#EFF6FF', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
    locationInfo: { flex: 1 },
    addressTitle: { fontSize: 11, fontWeight: 'bold', color: COLORS.textSecondary, marginBottom: 2 },
    addressText: { fontSize: 15, fontWeight: 'bold', color: COLORS.text, marginBottom: 4 },
    coordsText: { fontSize: 11, color: COLORS.textSecondary },
    adjustPin: { paddingVertical: 4, paddingHorizontal: 8, borderRadius: 6, backgroundColor: '#F1F5F9' },
    adjustText: { fontSize: 12, fontWeight: 'bold', color: COLORS.text },
    mapPlaceholder: { height: 120, backgroundColor: '#E2E8F0', borderRadius: 16, marginTop: 12 },
    photoGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
    addPhotoBtn: { width: (343 - 48) / 3, aspectRatio: 1, borderRadius: 12, borderStyle: 'dashed', borderWidth: 2, borderColor: COLORS.primary, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F8FAFC' },
    addPhotoText: { fontSize: 11, fontWeight: 'bold', color: COLORS.primary, marginTop: 8 },
    photoWrapper: { width: (343 - 48) / 3, aspectRatio: 1, borderRadius: 12, position: 'relative' },
    photoThumb: { width: '100%', height: '100%', borderRadius: 12 },
    removePhoto: { position: 'absolute', top: -4, right: -4, backgroundColor: COLORS.alert, borderRadius: 10, width: 20, height: 20, alignItems: 'center', justifyContent: 'center' },
    emptyPhotoSlot: { width: (343 - 48) / 3, aspectRatio: 1, borderRadius: 12, backgroundColor: '#F1F5F9' },
    voiceCard: { backgroundColor: '#FFFFFF', padding: 16, borderRadius: 16, borderWidth: 1, borderColor: COLORS.border },
    voiceHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
    voiceIndicator: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    voiceTitle: { fontSize: 15, fontWeight: 'bold', color: COLORS.text },
    voiceLimit: { fontSize: 12, color: COLORS.textSecondary },
    waveformPlaceholder: { height: 60, backgroundColor: '#F8FAFC', borderRadius: 8, marginBottom: 20 },
    recordBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12 },
    recordOuter: { width: 56, height: 56, borderRadius: 28, borderWidth: 2, borderColor: '#E2E8F0', alignItems: 'center', justifyContent: 'center' },
    recordInner: { width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.alert },
    recordStop: { borderRadius: 4, width: 24, height: 24 },
    recordLabel: { fontSize: 14, fontWeight: 'bold', color: COLORS.text },
    uploadCard: { padding: 24, alignItems: 'center', justifyContent: 'center', borderStyle: 'dashed', borderWidth: 1, borderColor: COLORS.border, borderRadius: 16, backgroundColor: '#FFFFFF' },
    uploadTitle: { fontSize: 14, fontWeight: 'bold', color: COLORS.text, marginTop: 12, marginBottom: 4 },
    uploadHint: { fontSize: 11, color: COLORS.textSecondary },
    footer: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 20, backgroundColor: '#FFFFFF', borderTopWidth: 1, borderTopColor: COLORS.border },
    runAiBtn: { backgroundColor: '#1E3A8A', flexDirection: 'row', padding: 16, borderRadius: 12, alignItems: 'center', justifyContent: 'center', gap: 12 },
    runAiBtnText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
});

export default CreateClaim;
