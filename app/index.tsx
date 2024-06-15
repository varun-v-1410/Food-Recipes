import React,{useEffect,useState} from 'react';
import { Text, View, StyleSheet, Dimensions, TextInput, Alert, FlatList, Image, StatusBar} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import axios from 'axios';
import { Link, router } from 'expo-router';
import { liststyle } from '@/constants/liststyle';
import NetInfo from '@react-native-community/netinfo';
import NoNetwork from '@/components/nointernet';
import { nweb } from '@/constants/notweb';

const Index = () => {

  const [meal,setMeal] = useState('');
  const [categories,setcategories] = useState([]);
  const[areas,setareas] = useState([]);
  const [isConnected,setIsConnected] = useState(true);

  const fetchcategories = ()=>{
    axios.get(`https://www.themealdb.com/api/json/v1/1/categories.php`).then((res)=>{
      const sorted = [...res.data.categories].sort((a, b) => a.strCategory.length - b.strCategory.length);
      setcategories(sorted);
    }).catch((err)=>{
      Alert.alert('Error',err.message);
    });
  }

  const fetchareas = ()=>{
    axios.get(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`).then((res)=>{
      setareas(res.data.meals);
    }).catch((err)=>{
      Alert.alert('Error',err.message);
    });
  }

  useEffect(()=>{
    fetchcategories();
    fetchareas();
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
      <View style={styles.container}>
        <Text style={{color: '#fff',fontSize: 40,fontWeight: 'bold'}}>Food-Recipes</Text>
        <View style={{marginTop: 30,width: nweb ? Dimensions.get('screen').width*90/100: Dimensions.get('screen').width*60/100,flexDirection: 'row',backgroundColor: '#fff',padding: 6,
        borderRadius: 20,alignItems: 'center'}}>
          <Ionicons name="search-outline" size={40} color="#FF6363" />
          <TextInput placeholder="Search a meal" style={styles.searchbox} inputMode='search' multiline={false}
          onChangeText={(t)=>{setMeal(t);}} onSubmitEditing={()=>{
            if(meal.length>0){
              router.navigate({pathname: '/search/result', params: {meal: meal}});
          }}}/>
        </View>
      </View>
      <View>
        <FlatList data={areas} showsHorizontalScrollIndicator={false} horizontal={true} keyExtractor={(item)=>item.strArea} renderItem={({item})=>{
          return (
            <Link href={{pathname: '/search/area', params:{area: item.strArea}}} style={styles.areaname}>
              <Text>{item.strArea}</Text>
            </Link>
          );
        }} showsVerticalScrollIndicator={false}/>
      </View>
      <FlatList showsVerticalScrollIndicator={false} data={categories} numColumns={ nweb ? 2 : 5} key={nweb ? 2 : 5} keyExtractor={(item)=>item.idCategory} renderItem={({item})=>{
        return (
          <View style={liststyle.mealview}>
            <Image resizeMode='stretch' source={{uri: item.strCategoryThumb}} style={liststyle.mealimg}/>
            <Link href={{pathname:'/search/category', params:{category: item.strCategory}}} style={liststyle.meallname}>
              <Text>{item.strCategory}</Text>
            </Link>
          </View>
        );
      }}/>
    </View>
  );}
};

const styles = StyleSheet.create(
  {
    container: {
      height: Dimensions.get('screen').height/2.8,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FF6363',
      borderBottomLeftRadius: Dimensions.get('screen').width/5,
      borderBottomRightRadius: Dimensions.get('screen').width/5,
      paddingTop: StatusBar.currentHeight,
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
    areaname:{
      fontSize: 20,
      margin: 10,
      borderColor: '#FF6363',
      borderWidth: 2,
      padding: 5,
      paddingLeft: 15,
      paddingRight: 15,
      borderRadius: 20,
    }
  }
);

export default Index;