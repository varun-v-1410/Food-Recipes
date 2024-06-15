import { Ionicons } from '@expo/vector-icons';
import { Link, router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, StatusBar, TextInput, Image, FlatList } from 'react-native';
import { liststyle } from '@/constants/liststyle';
import NetInfo from '@react-native-community/netinfo';
import NoNetwork from '@/components/nointernet';
import { nweb } from '@/constants/notweb';
import { fetchMeals } from '@/utils/getResults';

export default function Result(){

    const {meal} = useLocalSearchParams();
    const [searchmeal,setsearchmeal] = useState(meal);
    const [meals,setmeals] = useState([]);
    const [isConnected,setIsConnected] = useState(true);

    const fetchmeals = async ()=>{

        const result = await fetchMeals(meal);

        setmeals([...result].sort((a, b) => a.strMeal.length - b.strMeal.length));
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
            <View style={styles.searchbar}>
            <Ionicons name="search-outline" size={40} color="#FF6363" />
            <TextInput placeholder="Search a meal"style={styles.searchbox} inputMode='search' multiline={false}
            onChangeText={(t)=>{setsearchmeal(t);}} onSubmitEditing={()=>{
                if(searchmeal.length>0 && searchmeal !== meal){
                    router.push({pathname: '/search/result', params: {meal: searchmeal}});
                }
            }}/>
            </View>
            {meals.length === 0 ? <Text>No meals found</Text> :
            <FlatList showsVerticalScrollIndicator={false} data={meals} numColumns={nweb ? 2 : 4} key={nweb ? 2 : 4} keyExtractor={(item)=>item.idMeal} renderItem={({item})=>{
                return (
                    <View style={liststyle.mealview}>
                        <Image resizeMode='stretch' source={{uri: item.strMealThumb}} style={liststyle.mealimg}/>
                        <Link href={{pathname:'/recipe',params:{mealid:item.idMeal,mealname:item.strMeal}}} style={liststyle.meallname} numberOfLines={2}>
                            <Text>{item.strMeal}</Text>
                        </Link>
                    </View>
                );
            }}/>}
        </View>
    );}
};

const styles = StyleSheet.create(
    {
        searchbar:{
            paddingTop: StatusBar.currentHeight,
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: StatusBar.currentHeight !== undefined ? StatusBar.currentHeight/2 : 10,
            flexDirection: 'row',
            backgroundColor: '#fff',
            padding: 6,
        },
        searchbox:{
            color: '#000',
            fontSize: 20,
            marginLeft: 10,
            flex: 1,
            backgroundColor: '#fff',
            borderBottomColor: '#FF6363',
            margin: 5,
          },
    }
);