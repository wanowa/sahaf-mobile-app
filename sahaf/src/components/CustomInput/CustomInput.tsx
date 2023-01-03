import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-paper';


const CustomInput = () => {
  return (
    <View /*style={styles.container}*/>
      <TextInput 
        style={styles.input}
        mode="outlined"
        label="Email"
        left={<TextInput.Icon icon="account-outline" /*iconColor='#25d6a2'*//>}
        //outlineColor="#25d6a2"
        //activeOutlineColor="#25d6a2"
      />
    </View>
  )
}

export default CustomInput

const styles = StyleSheet.create({
/* 
    container: {
        //backgroundColor: 'white',
        width: '100%',

        borderColor: '#000000',
        borderWidth: 1,
        borderRadius: 10,

        paddingHorizontal: 5,
        marginVertical: 10
    },
*/
    input: {

    }
})