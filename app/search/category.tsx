import { liststyle } from '@/constants/liststyle';
import axios from 'axios';
import { Link, useLocalSearchParams } from 'expo-router';
import React, {useState,useEffect} from 'react';
import { View, Text, Alert, Image, FlatList } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import NoNetwork from '@/components/nointernet';
import { nweb } from '@/constants/notweb';

export default function Category() {

    const {category} = useLocalSearchParams();
    const [meals,setmeals] = useState([]);
    const [isConnected,setIsConnected] = useState(true);

    const fetchmeals = ()=>{
        axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`).then((res)=>{
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
            <Text style={liststyle.title}>{category}</Text>
        </View>
        <FlatList showsVerticalScrollIndicator={false} numColumns={nweb ? 2 : 5} key={nweb ? 2 : 5} data={meals} keyExtractor={(item)=>item.idMeal} renderItem={({item})=>{
                return (
                    <View style={liststyle.mealview}>
                        <Image resizeMode='stretch' source={{uri: item.strMealThumb}} style={liststyle.mealimg}/>
                        <Link href={{pathname:'/recipe',params:{mealid:item.idMeal,mealname:item.strMeal}}} style={liststyle.meallname} numberOfLines={2}>
                        <Text>{item.strMeal}</Text>
                        </Link>
                    </View>
                );
            }}/>
    </View>
    );}
};