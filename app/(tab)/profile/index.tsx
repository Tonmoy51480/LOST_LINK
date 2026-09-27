import {
  ScrollView,
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
  Pressable,
} from "react-native";
import { useCallback, useState } from "react";
import { useFocusEffect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import AppHeader from "@/components/app-header";
import ProfileSummary from "@/components/profile-summary";
import ProfileMenuRow from "@/components/profile-menu-row";
import PrimaryButton from "@/components/PrimaryButton";

import { COLORS, SPACING } from "@/constants/theme";
import { useApp } from "@/context/AppContext";
import { SafeUser } from "@/types";
import { api } from "@/services/api";

export default function ProfileScreen() {
  const { currentUserId, logout } = useApp();

  const [profile, setProfile] = useState<SafeUser | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [profileError, setProfileError] = useState("");
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const loadProfile = async () => {
        if (!currentUserId) {
          setProfile(null);
          setProfileLoading(false);
          return;
        }

        try {
          setProfileLoading(true);
          setProfileError("");

          const response = await api.get(
            `/api/users/${currentUserId}`,
            {
              headers: {
                "x-user-id": currentUserId,
              },
            }
          );

          setProfile(response.data.data);
        } catch (error: any) {
          console.error("Failed to load profile:", error);

          setProfileError(
            error.response?.data?.message ||
              "Failed to load profile. Please try again."
          );
        } finally {
          setProfileLoading(false);
        }
      };

      loadProfile();
    }, [currentUserId])
  );

  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = async () => {
    setShowLogoutConfirm(false);

    await logout();

    router.replace("/(auth)/login");
  };

  const handleRetry = () => {
    if (!currentUserId) return;

    setProfileLoading(true);
    setProfileError("");

    api
      .get(`/api/users/${currentUserId}`, {
        headers: {
          "x-user-id": currentUserId,
        },
      })
      .then((response) => {
        setProfile(response.data.data);
      })
      .catch((error: any) => {
        console.error("Failed to reload profile:", error);

        setProfileError(
          error.response?.data?.message ||
            "Failed to load profile. Please try again."
        );
      })
      .finally(() => {
        setProfileLoading(false);
      });
  };

  return (
    <SafeAreaView edges={["top"]} style={styles.screen}>
      <AppHeader title="Profile" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {profileLoading ? (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" />

            <Text style={styles.statusText}>
              Loading profile...
            </Text>
          </View>
        ) : profileError ? (
          <View style={styles.centerContainer}>
            <Text style={styles.errorText}>
              {profileError}
            </Text>

            <PrimaryButton
              title="Retry"
              onPress={handleRetry}
            />
          </View>
        ) : profile ? (
          <ProfileSummary
            name={profile.name}
            email={profile.email}
          />
        ) : (
          <View style={styles.centerContainer}>
            <Text style={styles.statusText}>
              Profile information is unavailable.
            </Text>
          </View>
        )}

        <View style={styles.menuContainer}>
          <ProfileMenuRow
            icon="document-text-outline"
            title="My Activity"
            subtitle="Reports, claims and solved items"
            onPress={() =>
              router.push("/my-activity" as any)
            }
          />

          <ProfileMenuRow
            icon="notifications-outline"
            title="Notifications"
            subtitle="View alerts and updates"
            onPress={() =>
              router.push(
                "/profile/notifications" as any
              )
            }
          />

          <ProfileMenuRow
            icon="create-outline"
            title="Edit Profile"
            subtitle="Update your display information"
            onPress={() =>
              router.push(
                "/profile/edit-profile" as any
              )
            }
          />

          <ProfileMenuRow
            icon="help-circle-outline"
            title="Help & Rules"
            subtitle="Privacy and safe handover guidance"
            onPress={() =>
              router.push(
                "/profile/help-rules" as any
              )
            }
          />

          <ProfileMenuRow
            icon="information-circle-outline"
            title="About LostLink"
            subtitle="Version, project overview and repository link"
            onPress={() =>
              router.push(
                "/profile/about" as any
              )
            }
          />
        </View>

        <View style={styles.buttonContainer}>
          <PrimaryButton
            title="Logout"
            onPress={handleLogout}
          />
        </View>
      </ScrollView>

      {showLogoutConfirm ? (
        <View style={styles.overlay}>
          <View style={styles.confirmCard}>
            <Text style={styles.confirmTitle}>
              Logout
            </Text>

            <Text style={styles.confirmMessage}>
              Are you sure you want to logout?
            </Text>

            <View style={styles.confirmButtons}>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Cancel logout"
                accessibilityHint="Closes the logout confirmation"
                onPress={() =>
                  setShowLogoutConfirm(false)
                }
                style={styles.cancelButton}
              >
                <Text style={styles.cancelButtonText}>
                  Cancel
                </Text>
              </Pressable>

              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Confirm logout"
                accessibilityHint="Logs you out of LostLink"
                onPress={confirmLogout}
                style={styles.logoutButton}
              >
                <Text style={styles.logoutButtonText}>
                  Logout
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      ) : null}
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
    paddingBottom: 32,
  },

  centerContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
    gap: 12,
  },

  statusText: {
    color: "#6B7280",
    fontSize: 14,
    textAlign: "center",
  },

  errorText: {
    color: "#DC2626",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 8,
  },

  menuContainer: {
    marginTop: 12,
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },

  buttonContainer: {
    marginTop: 28,
  },

  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },

  confirmCard: {
    width: "100%",
    maxWidth: 380,
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 24,
  },

  confirmTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 8,
  },

  confirmMessage: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
    marginBottom: 24,
  },

  confirmButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
  },

  cancelButton: {
    minWidth: 90,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
  },

  cancelButtonText: {
    color: "#374151",
    fontSize: 14,
    fontWeight: "600",
  },

  logoutButton: {
    minWidth: 90,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: "#DC2626",
    alignItems: "center",
  },

  logoutButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
});