import { useLocalSearchParams, Link } from 'expo-router';
import React,{useState,useEffect} from 'react';
import { View, Text, Alert, FlatList, Image } from 'react-native';
import axios from 'axios';
import { liststyle } from '@/constants/liststyle';
import NetInfo from '@react-native-community/netinfo';
import NoNetwork from '@/components/nointernet';
import { nweb } from '@/constants/notweb';

export default function Area(){

    const {area} = useLocalSearchParams();
    const [meals,setmeals] = useState([]);
    const [isConnected,setIsConnected] = useState(true);

    const fetchmeals = ()=>{
        axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`).then((res)=>{
            const sorted = [...res.data.meals].sort((a, b) => a.strMeal.length - b.strMeal.length);
            setmeals(sorted);
        }).catch((err)=>{
            Alert.alert('Error',err.message);
        });
    }

    useEffect(()=>{
        fetchmeals();
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected);
        });
        return ()=>{
            unsubscribe();
        }
    },[]);

    if(!isConnected){
        return (<NoNetwork/>);
    }else{
    return (
        <View style={{flex:1}}>
            <View style={liststyle.header}>
                <Text style={liststyle.title}>{area}</Text>
            </View>
            <FlatList showsVerticalScrollIndicator={false} numColumns={nweb ? 2 : 5} key={nweb ? 2 : 5} data={meals} keyExtractor={(item)=>item.idMeal} renderItem={({item})=>{
                    return (
                        <View style={liststyle.mealview}>
                            <Image resizeMode='stretch' source={{uri: item.strMealThumb}} style={liststyle.mealimg}/>
                            <Link href={{pathname:'/recipe',params:{mealid:item.idMeal}}} style={liststyle.meallname} numberOfLines={2}>
                            <Text>{item.strMeal}</Text>
                            </Link>
                        </View>
                    );
                }}/>
        </View>
    );}
};