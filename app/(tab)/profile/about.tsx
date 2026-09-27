import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  Alert,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AppHeader from "@/components/app-header";
import PrimaryButton from "@/components/PrimaryButton";
import { COLORS, SPACING } from "@/constants/theme";

const GITHUB_REPO_URL = "https://github.com/Tonmoy51480/LOST_LINK";

export default function AboutScreen() {
  const handleOpenLink = async (url: string) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert("Error", `Cannot open link: ${url}`);
      }
    } catch (err: any) {
      Alert.alert("Error", err.message || "Failed to open link.");
    }
  };

  return (
    <SafeAreaView edges={["top"]} style={styles.screen}>
      <AppHeader showBack title="About LostLink" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Hero Card */}
        <View style={styles.heroCard}>
          <View style={styles.iconCircle}>
            <Ionicons color={COLORS.primary} name="shield-checkmark" size={44} />
          </View>
          <Text style={styles.appName}>
            Lost<Text style={styles.appNameHighlight}>Link</Text>
          </Text>
          <Text style={styles.appTagline}>
            AIUB Campus Lost & Found Community
          </Text>

          <View style={styles.versionBadge}>
            <Ionicons color={COLORS.primary} name="pricetag-outline" size={14} />
            <Text style={styles.versionText}>Version 1.0.0 (Release Build)</Text>
          </View>
        </View>

        {/* Overview Section */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>About the Project</Text>
          <Text style={styles.bodyText}>
            LostLink is a modern, community-driven lost and found mobile platform designed for AIUB campus. It helps students, faculty, and campus security quickly report, discover, and securely reclaim misplaced personal belongings.
          </Text>

          <View style={styles.featureList}>
            <View style={styles.featureItem}>
              <Ionicons color="#10B981" name="checkmark-circle" size={18} />
              <Text style={styles.featureText}>Safe & verified ownership claim process</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons color="#10B981" name="checkmark-circle" size={18} />
              <Text style={styles.featureText}>Real-time campus messaging between users</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons color="#10B981" name="checkmark-circle" size={18} />
              <Text style={styles.featureText}>Campus building & category classification</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons color="#10B981" name="checkmark-circle" size={18} />
              <Text style={styles.featureText}>Administrator oversight and item resolution</Text>
            </View>
          </View>
        </View>

        {/* Links Section */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Project Links</Text>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => handleOpenLink(GITHUB_REPO_URL)}
            style={styles.linkRow}
          >
            <View style={styles.linkIconBox}>
              <Ionicons color="#111827" name="logo-github" size={22} />
            </View>
            <View style={styles.linkContent}>
              <Text style={styles.linkLabel}>GitHub Repository</Text>
              <Text numberOfLines={1} style={styles.linkUrl}>
                github.com/Tonmoy51480/LOST_LINK
              </Text>
            </View>
            <Ionicons color="#9CA3AF" name="open-outline" size={18} />
          </TouchableOpacity>
        </View>

        {/* Tech Stack */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Technology Stack</Text>
          <View style={styles.tagsContainer}>
            {["React Native", "Expo SDK 54", "TypeScript", "PostgreSQL", "Node.js", "Express"].map(
              (tech) => (
                <View key={tech} style={styles.tag}>
                  <Text style={styles.tagText}>{tech}</Text>
                </View>
              )
            )}
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <PrimaryButton title="Back to Profile" onPress={() => router.back()} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: SPACING.lg,
    paddingBottom: 36,
  },
  heroCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: SPACING.xl,
    alignItems: "center",
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primaryLight,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  appName: {
    fontSize: 26,
    fontWeight: "900",
    color: "#111827",
    letterSpacing: -0.5,
  },
  appNameHighlight: {
    color: COLORS.primary,
  },
  appTagline: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 4,
    fontWeight: "500",
    textAlign: "center",
  },
  versionBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 14,
  },
  versionText: {
    color: COLORS.primaryDark,
    fontSize: 12,
    fontWeight: "600",
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 12,
  },
  bodyText: {
    fontSize: 14,
    lineHeight: 22,
    color: "#4B5563",
  },
  featureList: {
    marginTop: 14,
    gap: 10,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  featureText: {
    fontSize: 13,
    color: "#374151",
    fontWeight: "500",
  },
  linkRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  linkIconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  linkContent: {
    flex: 1,
    marginRight: 8,
  },
  linkLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  linkUrl: {
    fontSize: 12,
    color: COLORS.primary,
    marginTop: 1,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  tag: {
    backgroundColor: "#EFF6FF",
    borderColor: "#DBEAFE",
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  tagText: {
    fontSize: 12,
    color: "#1E40AF",
    fontWeight: "600",
  },
  buttonContainer: {
    marginTop: 12,
  },
});
