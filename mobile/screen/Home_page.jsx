import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Avatar, Button, Card, Dialog, Icon, Modal, Portal, TextInput } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from './Profile';
import io from 'socket.io-client';
import Protected from './Protected';
import { useMobileResponseMutation } from '../redux/apis/adminMobileApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator();
const Home_page = () => {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen
                name="main"
                component={Home}
                options={{
                    tabBarIcon: () => <Icon size={30} source="home" />
                }}
            />
            <Tab.Screen
                name="profile"
                options={{
                    tabBarIcon: () => <Icon size={30} source="account" />
                }}
            >
                {() => <Protected component={Profile} />}
            </Tab.Screen>
        </Tab.Navigator>
    );
};

const socket = io(process.env.EXPO_PUBLIC_BACKEND_URL);

const Home = () => {
    const [res, { isSuccess }] = useMobileResponseMutation()
    const [visible, setVisible] = useState(false);
    const [email, setEmail] = useState("");

    const hideDialog = () => setVisible(false);

    useEffect(() => {
        const registerAdmin = async () => {
            // Get the admin email from AsyncStorage
            const adminEmail = await AsyncStorage.getItem('adminEmail');
            console.warn("adminEmail", adminEmail);

            if (adminEmail) {
                socket.emit("registerAdminMobile");
                console.warn("socket called");

                socket.on("mobileLoginConfirmation", (data) => {
                    setEmail(data.email);
                    setVisible(true);
                    console.warn("Data received from server:", data.email);
                });
            }
        };

        registerAdmin();

        return () => {
            socket.off("mobileLoginConfirmation");
        };
    }, []);
    // const click = async () => {
    //     // console.warn("clicked");
    //     const adminEmail = await AsyncStorage.getItem('adminEmail');
    //     // socket.emit("registerAdminMobile");
    //     console.warn(adminEmail);


    // }
    const handleAccept = async () => {
        const adminEmail = await AsyncStorage.getItem('adminEmail');
        res({ accept: true, email: adminEmail })
        // socket.emit("mobileLoginResponse", { accept: true, email: adminEmail });
        setVisible(false);
    };

    const handleReject = async () => {
        const adminEmail = await AsyncStorage.getItem('adminEmail');
        res({ accept: false, email: adminEmail })
        // socket.emit("mobileLoginResponse", { accept: false, email: adminEmail });
        setVisible(false);
    };


    return <>

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Title>Login Attempt</Dialog.Title>
                    <Dialog.Content>
                        <Text>{`Login attempt detected for ${email}. Do you accept?`}</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={handleAccept} color="#4CAF50">Accept</Button>
                        <Button onPress={handleReject} color="#F44336">Reject</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    </>
};

export default Home_page;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalMessage: {
        fontSize: 16,
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
