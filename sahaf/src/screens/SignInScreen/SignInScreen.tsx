import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import React from 'react'
import CustomInput from '../../components/CustomInput'
import { TextInput, Button, Appbar } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const SignInScreen = () => {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const navigation = useNavigation<any>();

    const onSignIn = () => {
        console.log("Giriş Yap");
    }

    const onForgotPassword = () => {
        console.log("Şifremi Unuttum");
        navigation.navigate("ForgotPasswordScreen");
    }

    const onBackAction = () => {
        console.log("Geri Dön");
        navigation.navigate("HomeScreen");
    }


    return (
        <SafeAreaProvider>
            <View>
                <Appbar.Header style={styles.appbar}>
                    <Appbar.BackAction onPress={onBackAction} size={30} />
                    <Appbar.Content title="Giriş Yap" style={styles.appbar_text}/>
                </Appbar.Header>
            
                <ScrollView style = {styles.root}>

                    <TextInput
                        value={email}
                        onChangeText={setEmail}
                        style={styles.input}
                        label="Email"
                        mode="outlined"
                        left={<TextInput.Icon icon="email-outline" /*iconColor='#25d6a2'*//>}
                    />
                    <TextInput
                        value={password}
                        onChangeText={setPassword}
                        style={styles.input}
                        label="Şifre"
                        mode="outlined"
                        secureTextEntry
                        left={<TextInput.Icon icon="lock-outline" /*iconColor='#25d6a2'*//>}
                    />
                    <Button
                        style={styles.button}
                        children="Giriş Yap"
                        mode="text"
                        buttonColor='#25d6a2'
                        textColor='white'
                        onPress={onSignIn}
                    />
                    <Button
                        style={styles.button}
                        children="Şifremi Unuttum"
                        mode="outlined"
                        buttonColor= 'white'
                        textColor='#25d6a2'
                        onPress={onForgotPassword}
                    />

                </ScrollView>
            </View>
        </SafeAreaProvider>
    )
}

export default SignInScreen

const styles = StyleSheet.create({
    root: {
        margin: 20
    },
    input: {
        marginVertical: 10,
        width: '100%'
    },
    button: {
        marginVertical: 10,
        borderColor: '#25D6A2',
        width: '100%',
        alignSelf: 'center'
    },
    appbar: {
        margin: 0,
        marginBottom: 0,
        width: '100%',
        zIndex: 1
    },
    appbar_text: {
        marginLeft: 10
    }



})