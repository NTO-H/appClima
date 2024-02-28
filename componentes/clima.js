import { View, Text, Alert, ActivityIndicator, FlatList, Image, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient';

const Clima = () => {
    const [data,setData]=useState(null)
    const [load,setLoad]=useState(false)
    useEffect(()=>{
        fetch('https://api.weatherapi.com/v1/forecast.json?key=5a492ff34efa492b91a172441211110%20&q=huejutla&days=10&aqi=no&alerts=no&lang=es')
        .then(res=>res.json())
        .then(obj=>{
            setData(obj)
            setLoad(true)
        })
        .catch(err=>Alert.alert('Error inesperado : '+err))
    },[])
    const Card=({fecha,iko,min,max})=>{
        return(
            <View style={style.climaContainer}>
            <View style={style.cardContent}>
                <Text style={style.cardText}>{fecha} </Text>
                <Image style={style.cardImage}
                source={{uri:'https:'+iko}}/>
                <Text style={style.cardText}> {max}°C </Text>
                <Text style={style.cardText}> {min}°C </Text>
            </View>
            </View>
        )
    }
    const LScreen=()=>{
        return(
            <View style={style.screenContent}>
                <Text style={style.title}>{data.location.name}</Text>
                <Text style={style.temperature}>
                {data.current.temp_c}°C
                </Text>
                <Text style={style.condition}>
<Text style={style.estado}>
                {data.current.condition.text} {'\n'}
      
    </Text>

                max {data.forecast.forecastday[0].day.maxtemp_c}
                min °C{'\n'} {data.forecast.forecastday[0].day.mintemp_c} °C
                 </Text>
                <FlatList
                data={data.forecast.forecastday}
                renderItem={({item})=><Card fecha={item.date}
                iko={item.day.condition.icon}
                max={item.day.maxtemp_c}
                min={item.day.mintemp_c}/> }/>
            </View>
        )
    }
    const Uscreen=()=>{
        return(
            <View style={style.screenContent}>
                <ActivityIndicator size={'large'} color={'darkblue'}/>
                <Text>Cargando datos...</Text>
            </View>
        )
    }
 return (
    <LinearGradient colors={['#c4aeff', '#b969ff', '#6226af']} style={style.mainContainer}>
      <Text style={style.header}>Clima</Text>
      {load?LScreen():Uscreen()}
    </LinearGradient>
  )
}
const style=StyleSheet.create({
    mainContainer: {
        flex: 1,
        // padding: 70,
        padding:20,
        backgroundColor: '#f5f5f5'
    },
    header: {
        fontSize: 50,
        fontWeight: 'bold',
        color:"#ffde83",
        textAlign: 'center',


        marginBottom: 40,
        marginTop: 50,

    },
    climaContainer:{
        backgroundColor:'rgba(228, 228, 228, 0.31)', // color difuminado,
        borderRadius: 10,
        marginVertical: 10,
        height:100,
      width:300,
padding:10,
        flexDirection:'column',
       
    },
    cardContent: {
        flexDirection:'row',
        justifyContent: 'space-between',
        padding: 10,

    },
    cardText: {
        fontSize: 16,
        color: '#fff373',
       
    },
    cardImage: {
        height:50,
        width:50
    },
    screenContent: {
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    temperature: {
        fontSize: 70,
        fontWeight: 'bold',
    },
    estado: {
        fontWeight: 'bold',
        fontSize: 45,

    },
    condition: {
        fontSize: 18,
        color:"#291d1d",
        textAlign: 'center',
        marginBottom: 20,
    }
})
export default Clima
