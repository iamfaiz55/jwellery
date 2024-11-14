import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Button, Avatar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { useVerifyOTPMutation } from '../redux/apis/adminMobileApi';

const Otp = ({ navigation }) => {
    const [verifyMobileOtp, { isSuccess, data, isLoading, error }] = useVerifyOTPMutation();
    const [otp, setOtp] = useState(['', '', '', '']);
    const [timer, setTimer] = useState(30);
    const [adminEmail, setAdminEmail] = useState('');

    useEffect(() => {
        const fetchAdminEmail = async () => {
            try {
                const email = await AsyncStorage.getItem('adminEmail');
                if (email) {
                    setAdminEmail(email);
                }
            } catch (err) {
                console.error('Failed to fetch admin email:', err);
            }
        };

        fetchAdminEmail();
    }, []);

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => setTimer(prev => prev - 1), 1000);
            return () => clearInterval(interval);
        }
    }, [timer]);

    useEffect(() => {
        if (isSuccess && data && data.result) {
            AsyncStorage.setItem('adminData', JSON.stringify(data.result))
                .then(() => {
                    // console.log('Admin data saved:', data.result);
                    navigation.navigate('Home');
                })
                .catch(err => console.error('Failed to save admin data:', err));
        }
    }, [isSuccess, data, navigation]);

    const handleChange = (value, index) => {
        let otpArray = [...otp];
        otpArray[index] = value;
        setOtp(otpArray);
    };

    const handleSubmit = () => {
        const otpCode = otp.join('');
        // console.log('Submitted OTP:', otpCode);
        // Send adminEmail and OTP to the backend
        verifyMobileOtp({ email: adminEmail, otp: otpCode });
    };

    const handleResendOtp = () => {
        setTimer(30);
        setOtp(['', '', '', '']);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{otp.join('')}</Text>

            <Button onPress={() => navigation.navigate("login")}>Close</Button>
            <Avatar.Icon size={80} icon="lock" style={styles.avatar} />
            <Text style={styles.title}>Enter OTP</Text>
            <Text style={styles.subtitle}>We've sent a code to your mobile number</Text>

            <View style={styles.otpContainer}>
                {otp.map((digit, index) => (
                    <TextInput
                        key={index}
                        style={styles.otpInput}
                        keyboardType="numeric"
                        maxLength={1}
                        value={digit}
                        onChangeText={(value) => handleChange(value, index)}
                    />
                ))}
            </View>

            {timer > 0 ? (
                <Text style={styles.timerText}>Resend code in {timer}s</Text>
            ) : (
                <TouchableOpacity onPress={handleResendOtp}>
                    <Text style={styles.resendText}>Resend OTP</Text>
                </TouchableOpacity>
            )}

            {isLoading ? (
                <ActivityIndicator size="large" color="orange" style={styles.loadingIndicator} />
            ) : (
                <Button
                    mode="contained"
                    style={styles.button}
                    onPress={handleSubmit}
                    disabled={otp.includes('')}
                >
                    Submit
                </Button>
            )}

            {/* Error handling display */}
            {error && <Text style={styles.errorText}>Error verifying OTP: {error.message}</Text>}
        </View>
    );
};

export default Otp;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#FAF0DC',
    },
    avatar: {
        backgroundColor: 'goldenrod',
        marginBottom: 20,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 28,
        color: '#333',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginVertical: 10,
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginVertical: 20,
    },
    otpInput: {
        backgroundColor: '#fff',
        fontSize: 24,
        textAlign: 'center',
        padding: 10,
        width: 50,
        height: 50,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        marginHorizontal: 5,
    },
    timerText: {
        color: '#666',
        fontSize: 14,
        marginVertical: 10,
    },
    resendText: {
        color: '#ff8c00',
        fontSize: 14,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    button: {
        backgroundColor: 'orange',
        paddingVertical: 10,
        width: '80%',
        borderRadius: 5,
        marginTop: 20,
    },
    loadingIndicator: {
        marginVertical: 20,
    },
    errorText: {
        color: 'red',
        marginTop: 10,
        textAlign: 'center',
    },
});
