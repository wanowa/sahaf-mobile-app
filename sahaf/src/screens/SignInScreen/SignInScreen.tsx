import { StyleSheet, Text, View, Image, ScrollView, Dimensions } from 'react-native'
import React from 'react'
import { TextInput, HelperText, Button, Appbar } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Form } from 'react-final-form';


const { width, height } = Dimensions.get('window')

const SignInScreen = () => {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [isEmailValid, setIsEmailValid] = React.useState(false);
    const [isPasswordEmptyChecked, setIsPasswordEmptyChecked] = React.useState(false);

    const navigation = useNavigation<any>();

    let checkEmailValid = () => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email)
    }
    let isPasswordEmpty = (password == '');

    const onSubmit = (values: any) => {
        
    }

    const onSignIn = () => {
        if(!checkEmailValid()) {
            setIsEmailValid(true);
        }
        else{
            setIsEmailValid(false);
        }
        if(isPasswordEmpty){
            setIsPasswordEmptyChecked(true);
        }
        else{
            setIsPasswordEmptyChecked(false);
        }
        if(isEmailValid && !isPasswordEmpty){
            console.log("Giriş Yap");
            let data = {
                email: email,
                password: password
            }
            console.log(data);
        }
        navigation.navigate('Tabs', {screen: 'MainScreen'});    // TODO authentication yapılacak
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
                    <Appbar.BackAction onPress={onBackAction} size={width*0.075} />
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
                    <HelperText type='error' visible={isEmailValid} >
                        Lütfen geçerli bir email adresi giriniz.
                    </HelperText>
                    <TextInput
                        value={password}
                        onChangeText={setPassword}
                        style={styles.input}
                        label="Şifre"
                        mode="outlined"
                        secureTextEntry
                        left={<TextInput.Icon icon="lock-outline" /*iconColor='#25d6a2'*//>}
                    />
                    <HelperText type='error' visible={isPasswordEmptyChecked} >
                        Lütfen şifrenizi giriniz.
                    </HelperText>
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
        marginVertical: 0,
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
        zIndex: 1,
        
    },
    appbar_text: {
        marginLeft: 10,
    }



})