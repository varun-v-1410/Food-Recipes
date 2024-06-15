import axios from 'axios';
import { Link, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, Alert, FlatList, Image, StyleSheet, Dimensions, StatusBar } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import NetInfo from '@react-native-community/netinfo';
import NoNetwork from '@/components/nointernet';
import { nweb } from '@/constants/notweb';

export default function receipe(){

    const {mealid,mealname} = useLocalSearchParams();
    const [receipe,setreceipe] = useState([]);
    const [isConnected,setIsConnected] = useState(true);

    const fetchreceipe = ()=>{
        axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealid}`).then((res)=>{
            setreceipe(res.data.meals);
        }).catch((err)=>{
            Alert.alert('Error',err.message);
        });
    }

    useEffect(()=>{
        fetchreceipe();
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
        <View style={{flex: 1,paddingTop: StatusBar.currentHeight!==undefined ? StatusBar.currentHeight : 10}}>
            <Text style={styles.mealname}>{mealname}</Text>
            <FlatList showsVerticalScrollIndicator={false} data={receipe} keyExtractor={(item)=>item.idMeal} renderItem={({item})=>{
                return (
                    <View style={{paddingTop:10,flex:1}}>
                        <Image resizeMode='stretch' source={{uri: item.strMealThumb}} style={styles.mealimg}/>
                        <View style={styles.disttop}>
                            <Link push href={{pathname: '/search/category',params:{category:item.strCategory}}}
                            style={styles.tags}>
                                <Text>#{item.strCategory}</Text>
                            </Link>
                            <Link push href={{pathname: '/search/area', params:{area: item.strArea}}}
                            style={styles.tags}>
                                <Text>#{item.strArea}</Text>
                            </Link>
                        </View>
                        <Text style={[styles.heading,styles.disttop,{alignSelf: 'flex-start'}]}>Ingredients:</Text>
                        <View style={[styles.disttop,{marginTop: 0, flexWrap: 'wrap'}]}>
                            {item.strIngredient1!==null && item.strIngredient1!=="" ? <View style={{margin: 5,}}><Image resizeMode='stretch' style={styles.ingpic} source={{uri: 'https://www.themealdb.com/images/ingredients/'+item.strIngredient1.replace(" ","%20")+'-Small.png'}}/><Text style={{textAlign: 'center'}}>{item.strMeasure1} {item.strIngredient1}</Text></View> : null}
                            {item.strIngredient2!==null && item.strIngredient2!=="" ? <View style={{margin: 5,}}><Image resizeMode='stretch' style={styles.ingpic} source={{uri: 'https://www.themealdb.com/images/ingredients/'+item.strIngredient2.replace(" ","%20")+'-Small.png'}}/><Text style={{textAlign: 'center'}}>{item.strMeasure2} {item.strIngredient2}</Text></View> : null}
                            {item.strIngredient3!==null && item.strIngredient3!=="" ? <View style={{margin: 5,}}><Image resizeMode='stretch' style={styles.ingpic} source={{uri: 'https://www.themealdb.com/images/ingredients/'+item.strIngredient3.replace(" ","%20")+'-Small.png'}}/><Text style={{textAlign: 'center'}}>{item.strMeasure3} {item.strIngredient3}</Text></View> : null}
                            {item.strIngredient4!==null && item.strIngredient4!=="" ? <View style={{margin: 5,}}><Image resizeMode='stretch' style={styles.ingpic} source={{uri: 'https://www.themealdb.com/images/ingredients/'+item.strIngredient4.replace(" ","%20")+'-Small.png'}}/><Text style={{textAlign: 'center'}}>{item.strMeasure4} {item.strIngredient4}</Text></View> : null}
                            {item.strIngredient5!==null && item.strIngredient5!=="" ? <View style={{margin: 5,}}><Image resizeMode='stretch' style={styles.ingpic} source={{uri: 'https://www.themealdb.com/images/ingredients/'+item.strIngredient5.replace(" ","%20")+'-Small.png'}}/><Text style={{textAlign: 'center'}}>{item.strMeasure5} {item.strIngredient5}</Text></View> : null}
                            {item.strIngredient6!==null && item.strIngredient6!=="" ? <View style={{margin: 5,}}><Image resizeMode='stretch' style={styles.ingpic} source={{uri: 'https://www.themealdb.com/images/ingredients/'+item.strIngredient6.replace(" ","%20")+'-Small.png'}}/><Text style={{textAlign: 'center'}}>{item.strMeasure6} {item.strIngredient6}</Text></View> : null}
                            {item.strIngredient7!==null && item.strIngredient7!=="" ? <View style={{margin: 5,}}><Image resizeMode='stretch' style={styles.ingpic} source={{uri: 'https://www.themealdb.com/images/ingredients/'+item.strIngredient7.replace(" ","%20")+'-Small.png'}}/><Text style={{textAlign: 'center'}}>{item.strMeasure7} {item.strIngredient7}</Text></View> : null}
                            {item.strIngredient8!==null && item.strIngredient8!=="" ? <View style={{margin: 5,}}><Image resizeMode='stretch' style={styles.ingpic} source={{uri: 'https://www.themealdb.com/images/ingredients/'+item.strIngredient8.replace(" ","%20")+'-Small.png'}}/><Text style={{textAlign: 'center'}}>{item.strMeasure8} {item.strIngredient8}</Text></View> : null}
                            {item.strIngredient9!==null && item.strIngredient9!=="" ? <View style={{margin: 5,}}><Image resizeMode='stretch' style={styles.ingpic} source={{uri: 'https://www.themealdb.com/images/ingredients/'+item.strIngredient9.replace(" ","%20")+'-Small.png'}}/><Text style={{textAlign: 'center'}}>{item.strMeasure9} {item.strIngredient9}</Text></View> : null}
                            {item.strIngredient10!==null && item.strIngredient10!=="" ? <View style={{margin: 5,}}><Image resizeMode='stretch' style={styles.ingpic} source={{uri: 'https://www.themealdb.com/images/ingredients/'+item.strIngredient10.replace(" ","%20")+'-Small.png'}}/><Text style={{textAlign: 'center'}}>{item.strMeasure10} {item.strIngredient10}</Text></View> : null}
                            {item.strIngredient11!==null && item.strIngredient11!=="" ? <View style={{margin: 5,}}><Image resizeMode='stretch' style={styles.ingpic} source={{uri: 'https://www.themealdb.com/images/ingredients/'+item.strIngredient11.replace(" ","%20")+'-Small.png'}}/><Text style={{textAlign: 'center'}}>{item.strMeasure11} {item.strIngredient11}</Text></View> : null}
                            {item.strIngredient12!==null && item.strIngredient12!=="" ? <View style={{margin: 5,}}><Image resizeMode='stretch' style={styles.ingpic} source={{uri: 'https://www.themealdb.com/images/ingredients/'+item.strIngredient12.replace(" ","%20")+'-Small.png'}}/><Text style={{textAlign: 'center'}}>{item.strMeasure12} {item.strIngredient12}</Text></View> : null}
                            {item.strIngredient13!==null && item.strIngredient13!=="" ? <View style={{margin: 5,}}><Image resizeMode='stretch' style={styles.ingpic} source={{uri: 'https://www.themealdb.com/images/ingredients/'+item.strIngredient13.replace(" ","%20")+'-Small.png'}}/><Text style={{textAlign: 'center'}}>{item.strMeasure13} {item.strIngredient13}</Text></View> : null}
                            {item.strIngredient14!==null && item.strIngredient14!=="" ? <View style={{margin: 5,}}><Image resizeMode='stretch' style={styles.ingpic} source={{uri: 'https://www.themealdb.com/images/ingredients/'+item.strIngredient14.replace(" ","%20")+'-Small.png'}}/><Text style={{textAlign: 'center'}}>{item.strMeasure14} {item.strIngredient14}</Text></View> : null}
                            {item.strIngredient15!==null && item.strIngredient15!=="" ? <View style={{margin: 5,}}><Image resizeMode='stretch' style={styles.ingpic} source={{uri: 'https://www.themealdb.com/images/ingredients/'+item.strIngredient15.replace(" ","%20")+'-Small.png'}}/><Text style={{textAlign: 'center'}}>{item.strMeasure15} {item.strIngredient15}</Text></View> : null}
                            {item.strIngredient16!==null && item.strIngredient16!=="" ? <View style={{margin: 5,}}><Image resizeMode='stretch' style={styles.ingpic} source={{uri: 'https://www.themealdb.com/images/ingredients/'+item.strIngredient16.replace(" ","%20")+'-Small.png'}}/><Text style={{textAlign: 'center'}}>{item.strMeasure16} {item.strIngredient16}</Text></View> : null}
                            {item.strIngredient17!==null && item.strIngredient17!=="" ? <View style={{margin: 5,}}><Image resizeMode='stretch' style={styles.ingpic} source={{uri: 'https://www.themealdb.com/images/ingredients/'+item.strIngredient17.replace(" ","%20")+'-Small.png'}}/><Text style={{textAlign: 'center'}}>{item.strMeasure17} {item.strIngredient17}</Text></View> : null}
                            {item.strIngredient18!==null && item.strIngredient18!=="" ? <View style={{margin: 5,}}><Image resizeMode='stretch' style={styles.ingpic} source={{uri: 'https://www.themealdb.com/images/ingredients/'+item.strIngredient18.replace(" ","%20")+'-Small.png'}}/><Text style={{textAlign: 'center'}}>{item.strMeasure18} {item.strIngredient18}</Text></View> : null}
                            {item.strIngredient19!==null && item.strIngredient19!=="" ? <View style={{margin: 5,}}><Image resizeMode='stretch' style={styles.ingpic} source={{uri: 'https://www.themealdb.com/images/ingredients/'+item.strIngredient19.replace(" ","%20")+'-Small.png'}}/><Text style={{textAlign: 'center'}}>{item.strMeasure19} {item.strIngredient19}</Text></View> : null}
                            {item.strIngredient20!==null && item.strIngredient20!=="" ? <View style={{margin: 5,}}><Image resizeMode='stretch' style={styles.ingpic} source={{uri: 'https://www.themealdb.com/images/ingredients/'+item.strIngredient20.replace(" ","%20")+'-Small.png'}}/><Text style={{textAlign: 'center'}}>{item.strMeasure20} {item.strIngredient20}</Text></View> : null}
                        </View>
                        <Text style={[styles.heading,styles.disttop,{alignSelf: 'flex-start'}]}>Instructions:</Text>
                        <Text style={[styles.disttop,{flexDirection: 'column',marginTop: 0,fontSize: 18}]}>{item.strInstructions}</Text>
                        {
                            nweb ? <YoutubePlayer height={Dimensions.get('screen').height/3} width={Dimensions.get('screen').width-10} videoId={item.strYoutube.split('=')[1]} webViewStyle={[styles.disttop,{flexDirection:'column', marginBottom: 0}]} />: <iframe style={{alignSelf: 'center',width: Dimensions.get('screen').width/2,height: Dimensions.get('screen').width/3,marginBottom: 10}} width="100%" height="100%" src={`https://www.youtube.com/embed/${item.strYoutube.split('=')[1]}`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        }
                    </View>
                );
            }}/>
        </View>
    );}
};


const styles = StyleSheet.create({
    mealimg:{
        width: nweb ? Dimensions.get('screen').width/2 : Dimensions.get('screen').width/4,
        height: nweb ? Dimensions.get('screen').width/2 : Dimensions.get('screen').width/4,
        borderRadius: 20,
        alignSelf: 'center',
    },

    mealname:{
        fontSize: 35,
        fontWeight:'bold',
        textAlign:'center',
    },

    heading:{
        fontSize: 25,
        fontWeight: '600',
        textAlign: 'center',
    },

    tags:{
        marginRight: 10,
        padding: 5,
        paddingRight: 10,
        paddingLeft: 10,
        borderRadius: 10,
        borderColor: '#FF6363',
        borderWidth: 1,
        fontSize: 20,
        fontWeight: '500',
    },

    disttop:{
        margin: StatusBar.currentHeight!==undefined ? StatusBar.currentHeight/2 : 10,
        flexDirection: 'row',
    },

    ingpic:{
        width: nweb ? Dimensions.get('screen').width/4: Dimensions.get('screen').width/25, 
        height: nweb ? Dimensions.get('screen').width/4: Dimensions.get('screen').width/25,
        backgroundColor: '#ebecf0',
        borderRadius: 50,
        alignSelf: 'center',
    }
});
