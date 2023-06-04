import {StyleSheet} from 'react-native';
import React from 'react';

export default styles = StyleSheet.create({
    Container: {
        backgroundColor: '#E41817',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    LogoImage: {
        width: 269,
        height: 150,
    },
    ImageContainer: {
        alignItems: 'center',
        marginBottom: 50,
    },
    BarContainer: {
        alignItems: 'center',
    },
    Bar: {
        backgroundColor: 'white',
        paddingVertical: 50,
        paddingHorizontal: 15,
        borderRadius: 40,
        alignItems: 'center',
    },
    BarText: {
        fontSize: 20,
        fontWeight: 'bold',
        width: 200,
        textAlign: 'center',
        color: 'black',
        margin: 20,
    },
    InputContainer: {
        marginVertical: 40,
    },
    Input: {
        width: 250,
        height: 40,
        marginHorizontal: 30,
        marginVertical: 20,
        borderBottomWidth: 1,
        padding: 10,
        borderBottomColor: 'grey',
    },
    Button: {
        backgroundColor: '#E41817',
        paddingVertical: 15,
        paddingHorizontal: 50,
        borderRadius: 20,
        marginBottom: 20,
        shadowOffset: {
            width: 3,
            height: 3,
        },
        elevation: 5,
    },
    ButtomText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: 'white',
    },
});
