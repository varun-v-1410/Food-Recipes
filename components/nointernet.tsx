import React from 'react';
import { View, Text } from 'react-native';

export default function NoNetwork(){
    return (
        <View style={{flex:1,alignItems:'center',alignContent:'center'}}>
            <Text style={{fontSize: 30,fontWeight: 'bold'}}>No Internet Connection</Text>
        </View>
    );
};