import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Protected = ({ component: Component }) => {
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const adminData = await AsyncStorage.getItem('adminData');
                setIsLoggedIn(!!adminData);
            } catch (error) {
                console.error('Failed to fetch admin data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        checkLoginStatus();
    }, []);

    if (isLoading) {
        return <ActivityIndicator size="large" color="orange" />;
    }

    if (!isLoggedIn) {
        navigation.navigate('login');
        return null;
    }

    return <Component />;
};

export default Protected;
