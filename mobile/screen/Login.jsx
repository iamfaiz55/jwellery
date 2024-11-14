import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, RadioButton, TextInput, Avatar, ActivityIndicator } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { useLoginAdminMutation } from '../redux/apis/adminMobileApi';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const Login = ({ navigation }) => {
    const { control, handleSubmit, formState: { errors }, watch } = useForm();
    const [adminMobileLogin, { isSuccess, data, isLoading }] = useLoginAdminMutation();
    const formValues = watch();

    const onSubmit = data => {
        adminMobileLogin(data);
    };

    useEffect(() => {
        if (isSuccess) {
            if (data && data.result && data.result.email) {
                AsyncStorage.setItem('adminEmail', data.result.email)
                    .then(() => {
                        navigation.navigate("otp");
                    })
                    .catch(err => console.error('Failed to save email:', err));
            }
        }
    }, [isSuccess, data, navigation]);

    return (
        <View style={styles.container}>
            <Avatar.Icon size={80} icon="account-circle" style={styles.avatar} />

            <View>
                <Text style={styles.title}>Login Your</Text>
                <Text style={styles.title}>Account</Text>
            </View>
            {isLoading ? (
                <ActivityIndicator size="large" color="orange" style={styles.loadingIndicator} />
            ) : <>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Email</Text>
                    <Controller
                        control={control}
                        name="email"
                        rules={{
                            required: "Email is required",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Enter a valid email"
                            }
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                mode="outlined"
                                style={styles.input}
                                placeholder="Type Your Email"
                                left={<TextInput.Icon icon="mail" />}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                error={!!errors.email}
                            />
                        )}
                    />
                    {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Password</Text>
                    <Controller
                        control={control}
                        name="password"
                        rules={{
                            required: "Password is required",
                            minLength: {
                                value: 3,
                                message: "Password must be at least 6 characters"
                            }
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                mode="outlined"
                                style={styles.input}
                                placeholder="Type Your Password"
                                secureTextEntry
                                left={<TextInput.Icon icon="lock" />}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                error={!!errors.password}
                            />
                        )}
                    />
                    {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
                </View>
            </>}



            <View style={styles.options}>
                <View style={styles.rememberMeContainer}>
                    <RadioButton value="remember" />
                    <Text>Remember Me</Text>
                </View>
                <Text style={styles.forgotPassword}>Forget Password?</Text>
            </View>

            <Button
                mode="contained"
                style={styles.button}
                onPress={handleSubmit(onSubmit)}
            >
                Log In {/* Changed to Log In */}
            </Button>
            {/* <Text style={styles.debugText}>Form Values: {JSON.stringify(formValues, null, 2)}</Text> */}
        </View>
    );
};

export default Login;

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
        fontWeight: "bold",
        fontSize: 28,
        color: '#333',
        textAlign: 'center',
    },
    inputContainer: {
        width: '100%',
        marginVertical: 10,
    },
    label: {
        fontWeight: "bold",
        fontSize: 16,
        color: '#666',
        marginBottom: 5,
    },
    input: {
        backgroundColor: '#fff',
    },
    options: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginVertical: 20,
    },
    rememberMeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    forgotPassword: {
        fontWeight: "bold",
        color: '#ff8c00',
    },
    button: {
        backgroundColor: "orange",
        paddingVertical: 10,
        width: '100%',
        borderRadius: 5,
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 5,
    },
    debugText: {
        marginTop: 20,
        color: '#666',
        fontSize: 12,
    },
    // button: {
    //     backgroundColor: 'orange',
    //     paddingVertical: 10,
    //     width: '80%',
    //     borderRadius: 5,
    //     marginTop: 20,
    // },
    loadingIndicator: {
        marginVertical: 20,
    },
});
