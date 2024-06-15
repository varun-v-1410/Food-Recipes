import {StyleSheet,Dimensions,StatusBar} from 'react-native';
import { nweb } from '@/constants/notweb';

export const liststyle = StyleSheet.create(
{
    mealview:{
        flex: 1,
        margin: nweb ? Dimensions.get('screen').width/25 : 10,
        alignItems: 'center',
    },    
    mealimg:{
        width: nweb ? Dimensions.get('screen').width/2.5 : Dimensions.get('screen').width/10,
        height: nweb ? Dimensions.get('screen').width/2.5 : Dimensions.get('screen').width/10,
        borderRadius: 20,
    },
    meallname:{
    fontSize: 20,
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#FF6363',
    borderRadius: 10,
    width: nweb ? Dimensions.get('screen').width/2.5*80/100 : Dimensions.get('screen').width/10*80/100,
    padding: 5,
    marginTop: 10,
    },
    header:{
        backgroundColor: '#FF6363',
        paddingTop: StatusBar.currentHeight,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: StatusBar.currentHeight !== undefined ? StatusBar.currentHeight/2 : 10,
    },
    title:{
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    }

});