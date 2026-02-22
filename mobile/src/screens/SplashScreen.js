import React, { useEffect, useRef } from 'react';
import {
    View, Text, StyleSheet, Animated, TouchableOpacity,
    Dimensions, StatusBar
} from 'react-native';
import { Shield, Zap, Globe } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

const COLORS = {
    bg: '#070D1A',
    surface: '#0F1B2D',
    accent: '#3B82F6',
    accentGlow: 'rgba(59, 130, 246, 0.15)',
    accentBright: '#60A5FA',
    gold: '#F59E0B',
    success: '#10B981',
    text: '#FFFFFF',
    textDim: '#94A3B8',
    border: 'rgba(59, 130, 246, 0.2)',
};

const Particle = ({ delay, x, y, size, color }) => {
    const opacity = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.delay(delay),
                Animated.parallel([
                    Animated.timing(opacity, { toValue: 0.6, duration: 1200, useNativeDriver: true }),
                    Animated.timing(translateY, { toValue: -20, duration: 1200, useNativeDriver: true }),
                ]),
                Animated.parallel([
                    Animated.timing(opacity, { toValue: 0, duration: 1200, useNativeDriver: true }),
                    Animated.timing(translateY, { toValue: -40, duration: 1200, useNativeDriver: true }),
                ]),
                Animated.delay(800),
            ])
        ).start();
    }, []);

    return (
        <Animated.View style={[styles.particle, { left: x, top: y, width: size, height: size, borderRadius: size / 2, backgroundColor: color, opacity, transform: [{ translateY }] }]} />
    );
};

const SplashScreen = ({ navigation }) => {
    // Animation values
    const logoScale = useRef(new Animated.Value(0.5)).current;
    const logoOpacity = useRef(new Animated.Value(0)).current;
    const glowRadius = useRef(new Animated.Value(60)).current;
    const titleOpacity = useRef(new Animated.Value(0)).current;
    const titleY = useRef(new Animated.Value(30)).current;
    const subtitleOpacity = useRef(new Animated.Value(0)).current;
    const statsOpacity = useRef(new Animated.Value(0)).current;
    const statsY = useRef(new Animated.Value(20)).current;
    const btnOpacity = useRef(new Animated.Value(0)).current;
    const btnScale = useRef(new Animated.Value(0.9)).current;
    const shieldPulse = useRef(new Animated.Value(1)).current;
    const ringOpacity = useRef(new Animated.Value(0)).current;
    const ringScale = useRef(new Animated.Value(0.5)).current;

    useEffect(() => {
        // Step 1: Logo + ring
        Animated.parallel([
            Animated.spring(logoScale, { toValue: 1, friction: 6, tension: 80, useNativeDriver: true }),
            Animated.timing(logoOpacity, { toValue: 1, duration: 600, useNativeDriver: true }),
            Animated.timing(ringOpacity, { toValue: 1, duration: 800, useNativeDriver: true }),
            Animated.spring(ringScale, { toValue: 1, friction: 5, tension: 60, useNativeDriver: true }),
        ]).start(() => {
            // Step 2: Title slides in
            Animated.parallel([
                Animated.timing(titleOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
                Animated.timing(titleY, { toValue: 0, duration: 500, useNativeDriver: true }),
            ]).start(() => {
                // Step 3: Subtitle
                Animated.timing(subtitleOpacity, { toValue: 1, duration: 400, useNativeDriver: true }).start(() => {
                    // Step 4: Stats row
                    Animated.parallel([
                        Animated.timing(statsOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
                        Animated.timing(statsY, { toValue: 0, duration: 400, useNativeDriver: true }),
                    ]).start(() => {
                        // Step 5: Button
                        Animated.parallel([
                            Animated.timing(btnOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
                            Animated.spring(btnScale, { toValue: 1, friction: 6, useNativeDriver: true }),
                        ]).start();
                    });
                });
            });
        });

        // Pulsing glow animation
        Animated.loop(
            Animated.sequence([
                Animated.timing(glowRadius, { toValue: 90, duration: 1800, useNativeDriver: false }),
                Animated.timing(glowRadius, { toValue: 60, duration: 1800, useNativeDriver: false }),
            ])
        ).start();

        // Shield pulse
        Animated.loop(
            Animated.sequence([
                Animated.timing(shieldPulse, { toValue: 1.08, duration: 1500, useNativeDriver: true }),
                Animated.timing(shieldPulse, { toValue: 1, duration: 1500, useNativeDriver: true }),
            ])
        ).start();
    }, []);

    const particles = [
        { id: 1, x: 40, y: 80, size: 6, color: COLORS.accent, delay: 0 },
        { id: 2, x: 300, y: 120, size: 4, color: COLORS.gold, delay: 500 },
        { id: 3, x: 80, y: 220, size: 5, color: COLORS.success, delay: 300 },
        { id: 4, x: 320, y: 300, size: 3, color: COLORS.accentBright, delay: 800 },
        { id: 5, x: 20, y: 400, size: 4, color: COLORS.gold, delay: 200 },
        { id: 6, x: 350, y: 480, size: 6, color: COLORS.accent, delay: 600 },
        { id: 7, x: 60, y: 550, size: 3, color: COLORS.success, delay: 1000 },
        { id: 8, x: 290, y: 600, size: 5, color: COLORS.accentBright, delay: 400 },
    ];

    const stats = [
        { label: 'Claims Processed', value: '14,203', icon: Zap, color: COLORS.accent },
        { label: 'Relief Distributed', value: '$45.2M', icon: Globe, color: COLORS.gold },
        { label: 'Verified Identities', value: '8,900+', icon: Shield, color: COLORS.success },
    ];

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.bg} />

            {/* Background particles */}
            {particles.map(p => <Particle key={p.id} {...p} />)}

            {/* Background grid lines */}
            <View style={styles.gridOverlay} pointerEvents="none">
                {[...Array(6)].map((_, i) => (
                    <View key={i} style={[styles.gridLine, { left: `${(i + 1) * 14}%` }]} />
                ))}
            </View>

            {/* Main content */}
            <View style={styles.content}>

                {/* Logo section */}
                <View style={styles.logoContainer}>
                    {/* Outer glowing ring */}
                    <Animated.View style={[styles.glowRing, {
                        opacity: ringOpacity,
                        transform: [{ scale: ringScale }]
                    }]} />

                    {/* Dynamic glow blob */}
                    <Animated.View style={[styles.glowBlob, {
                        width: glowRadius,
                        height: glowRadius,
                        borderRadius: 45,
                    }]} />

                    {/* Icon circle */}
                    <Animated.View style={[styles.logoCircle, {
                        opacity: logoOpacity,
                        transform: [{ scale: logoScale }]
                    }]}>
                        <Animated.View style={{ transform: [{ scale: shieldPulse }] }}>
                            <Shield color="#FFFFFF" size={52} fill="rgba(255,255,255,0.1)" />
                        </Animated.View>
                    </Animated.View>
                </View>

                {/* App name + tagline */}
                <Animated.View style={{ opacity: titleOpacity, transform: [{ translateY: titleY }] }}>
                    <Text style={styles.appName}>
                        <Text style={styles.appNameAccent}>Disaster</Text>
                        <Text style={styles.appNameWhite}>Cred</Text>
                    </Text>
                    <View style={styles.badgeRow}>
                        <View style={styles.badge}>
                            <View style={styles.badgeDot} />
                            <Text style={styles.badgeText}>BLOCKCHAIN SECURED</Text>
                        </View>
                        <View style={[styles.badge, { borderColor: COLORS.gold + '50' }]}>
                            <View style={[styles.badgeDot, { backgroundColor: COLORS.gold }]} />
                            <Text style={[styles.badgeText, { color: COLORS.gold }]}>AI POWERED</Text>
                        </View>
                    </View>
                </Animated.View>

                {/* Subtitle */}
                <Animated.Text style={[styles.subtitle, { opacity: subtitleOpacity }]}>
                    Decentralized disaster relief{'\n'}for a more resilient world
                </Animated.Text>

                {/* Stats row */}
                <Animated.View style={[styles.statsRow, { opacity: statsOpacity, transform: [{ translateY: statsY }] }]}>
                    {stats.map((stat, i) => (
                        <View key={i} style={styles.statCard}>
                            <stat.icon color={stat.color} size={16} />
                            <Text style={[styles.statValue, { color: stat.color }]}>{stat.value}</Text>
                            <Text style={styles.statLabel}>{stat.label}</Text>
                        </View>
                    ))}
                </Animated.View>

                {/* CTA Button */}
                <Animated.View style={[{ opacity: btnOpacity, transform: [{ scale: btnScale }] }, styles.btnWrapper]}>
                    <TouchableOpacity
                        style={styles.ctaBtn}
                        onPress={() => navigation.replace('RoleSelection')}
                        activeOpacity={0.85}
                    >
                        <Text style={styles.ctaBtnText}>Get Started</Text>
                        <View style={styles.ctaArrow}>
                            <Text style={styles.ctaArrowText}>→</Text>
                        </View>
                    </TouchableOpacity>

                    <Text style={styles.termsText}>
                        Protected by Monad Blockchain • End-to-end encrypted
                    </Text>
                </Animated.View>
            </View>

            {/* Bottom bar accent */}
            <View style={styles.bottomAccent}>
                <View style={styles.bottomLine} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.bg },
    gridOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, flexDirection: 'row' },
    gridLine: { position: 'absolute', top: 0, bottom: 0, width: 1, backgroundColor: 'rgba(59,130,246,0.04)' },
    particle: { position: 'absolute' },

    content: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32 },

    // Logo
    logoContainer: { width: 140, height: 140, alignItems: 'center', justifyContent: 'center', marginBottom: 32 },
    glowRing: { position: 'absolute', width: 140, height: 140, borderRadius: 70, borderWidth: 1.5, borderColor: COLORS.border, borderStyle: 'solid' },
    glowBlob: { position: 'absolute', backgroundColor: COLORS.accentGlow },
    logoCircle: {
        width: 100, height: 100, borderRadius: 50,
        backgroundColor: COLORS.accent,
        alignItems: 'center', justifyContent: 'center',
        shadowColor: COLORS.accent,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 24,
        elevation: 20,
        borderWidth: 2,
        borderColor: 'rgba(96,165,250,0.4)',
    },

    // Text
    appName: { textAlign: 'center', marginBottom: 16, fontSize: 48, fontWeight: '800', letterSpacing: -1 },
    appNameAccent: { color: COLORS.accentBright },
    appNameWhite: { color: COLORS.text },

    badgeRow: { flexDirection: 'row', gap: 10, justifyContent: 'center', marginBottom: 20 },
    badge: { flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20, borderWidth: 1, borderColor: COLORS.border, backgroundColor: COLORS.accentGlow },
    badgeDot: { width: 5, height: 5, borderRadius: 2.5, backgroundColor: COLORS.accentBright },
    badgeText: { fontSize: 9, fontWeight: '800', color: COLORS.accentBright, letterSpacing: 1 },

    subtitle: { fontSize: 16, color: COLORS.textDim, textAlign: 'center', lineHeight: 26, marginBottom: 40 },

    // Stats
    statsRow: { flexDirection: 'row', gap: 10, marginBottom: 48, width: '100%' },
    statCard: {
        flex: 1, backgroundColor: COLORS.surface, borderRadius: 16, padding: 14,
        alignItems: 'center', gap: 6,
        borderWidth: 1, borderColor: COLORS.border,
    },
    statValue: { fontSize: 16, fontWeight: '800' },
    statLabel: { fontSize: 9, color: COLORS.textDim, textAlign: 'center', fontWeight: '600', letterSpacing: 0.3 },

    // CTA
    btnWrapper: { width: '100%', alignItems: 'center' },
    ctaBtn: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
        width: '100%', paddingVertical: 18, borderRadius: 20,
        backgroundColor: COLORS.accent,
        gap: 12, marginBottom: 16,
        shadowColor: COLORS.accent,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.5,
        shadowRadius: 20,
        elevation: 14,
    },
    ctaBtnText: { fontSize: 18, fontWeight: '800', color: '#FFFFFF', letterSpacing: 0.3 },
    ctaArrow: { width: 32, height: 32, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },
    ctaArrowText: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' },
    termsText: { fontSize: 11, color: COLORS.textDim, textAlign: 'center' },

    // Bottom accent
    bottomAccent: { paddingBottom: 32, alignItems: 'center' },
    bottomLine: { width: 60, height: 4, borderRadius: 2, backgroundColor: COLORS.border },
});

export default SplashScreen;
