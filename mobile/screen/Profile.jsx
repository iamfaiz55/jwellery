import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { Avatar, Icon } from 'react-native-paper'
import { useLogoutAdminMutation } from '../redux/apis/adminMobileApi'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Profile = () => {
    const [adminMobileLogout, { isSuccess }] = useLogoutAdminMutation()
    const { navigate } = useNavigation()

    useEffect(() => {
        const handleLogoutSuccess = async () => {
            try {
                await AsyncStorage.removeItem('adminData');
                navigate('login');
            } catch (error) {
                console.error('Failed to clear admin data:', error);
            }
            console.log("logout success");

        };
        if (isSuccess) {
            handleLogoutSuccess();
        }
    }, [isSuccess])
    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <Icon
                        source='account'
                        size={30}
                        color="#DAA520" // Gold color
                    />
                    <Text style={styles.profileText}>Profile</Text>
                    <Icon
                        source='dots-horizontal'
                        size={30}
                        color="#DAA520"
                    />
                </View>
            </View>

            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>General</Text>
                <Pressable style={styles.row}>
                    <View style={styles.rowContent}>
                        <Icon source='book-account' size={25} color="#DAA520" />
                        <Text style={styles.rowText}>My Order</Text>
                    </View>
                    <Icon source='chevron-right' size={25} color="#DAA520" />
                </Pressable>
            </View>

            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Account Setting</Text>
                <Pressable style={styles.row}>
                    <View style={styles.rowContent}>
                        <Icon source='google-maps' size={25} color="#DAA520" />
                        <Text style={styles.rowText}>Address</Text>
                    </View>
                    <Icon source='chevron-right' size={25} color="#DAA520" />
                </Pressable>

                <Pressable style={styles.row}>
                    <View style={styles.rowContent}>
                        <Icon source='wallet' size={25} color="#DAA520" />
                        <Text style={styles.rowText}>Payment</Text>
                    </View>
                    <Icon source='chevron-right' size={25} color="#DAA520" />
                </Pressable>

                <Pressable style={styles.row}>
                    <View style={styles.rowContent}>
                        <Icon source='eye-outline' size={25} color="#DAA520" />
                        <Text style={styles.rowText}>Dark Mode</Text>
                    </View>
                    <Icon source='chevron-right' size={25} color="#DAA520" />
                </Pressable>

                <Pressable style={styles.row} onPress={e => adminMobileLogout()}>
                    <View style={styles.rowContent}>
                        <Icon source='logout' size={25} color="#DAA520" />
                        <Text style={styles.rowText}>Logout</Text>
                    </View>
                    <Icon source='chevron-right' size={25} color="#DAA520" />
                </Pressable>

                <Pressable style={styles.row} onPress={() => navigate('login')}>
                    <View style={styles.rowContent}>
                        <Icon source='login' size={25} color="#DAA520" />
                        <Text style={styles.rowText}>Login</Text>
                    </View>
                    <Icon source='chevron-right' size={25} color="#DAA520" />
                </Pressable>

                <Pressable style={styles.row} onPress={() => navigate("otp")}>
                    <View style={styles.rowContent}>
                        <Icon source='login' size={25} color="#DAA520" />
                        <Text style={styles.rowText}>OTP</Text>
                    </View>
                    <Icon source='chevron-right' size={25} color="#DAA520" />
                </Pressable>
            </View>

            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>App Setting</Text>
                <Pressable style={styles.row}>
                    <View style={styles.rowContent}>
                        <Icon source='book-account' size={25} color="#DAA520" />
                        <Text style={styles.rowText}>Language</Text>
                    </View>
                    <Icon source='chevron-right' size={25} color="#DAA520" />
                </Pressable>
            </View>
        </ScrollView>
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAF0DC', // Light golden background
    },
    header: {
        paddingVertical: 50,
        paddingHorizontal: 20,
        backgroundColor: '#FFD700', // Brighter gold
    },
    headerContent: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    profileText: {
        fontSize: 25,
        fontWeight: "bold",
        color: '#333',
    },
    sectionContainer: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    sectionTitle: {
        fontSize: 15,
        color: "gray",
        fontWeight: "bold",
        marginBottom: 10,
    },
    row: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#E0C080', // Subtle gold
    },
    rowContent: {
        flexDirection: "row",
        alignItems: "center",
    },
    rowText: {
        fontWeight: "bold",
        fontSize: 16,
        marginLeft: 10,
    }
});
