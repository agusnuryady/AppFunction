import React, { Component } from 'react'
import { Text, View, Dimensions, ScrollView } from 'react-native'
import {LineChart, BarChart, PieChart, ProgressChart, ContributionGraph, StackedBarChart} from 'react-native-chart-kit'

var { width, height } = Dimensions.get('window')

export default class Chart extends Component {
    render() {
        return (
            <View style={{flex:1,flexDirection:'column', margin:0}} >
                <ScrollView>
                    <View style={{flexDirection:'column',}} >
                        <Text style={{margin:8}} > Bezier Line Chart </Text>
                        <LineChart
                            data={{
                                labels: ['January', 'February', 'March', 'April', 'May', 'June'],
                                datasets: [{
                                data: [
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100
                                ]
                                }]
                            }}
                            width={width-16} // from react-native
                            height={220}
                            yAxisLabel={'$'}
                            chartConfig={{
                                backgroundColor: '#e26a00',
                                backgroundGradientFrom: '#fb8c00',
                                backgroundGradientTo: '#ffa726',
                                decimalPlaces: 2, // optional, defaults to 2dp
                                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                style: {
                                borderRadius: 16
                                }
                            }}
                            bezier
                            style={{
                                margin: 8,
                                borderRadius: 16
                            }}
                        />
                    </View>
                    <View style={{flexDirection:'column', width:width}} >
                        <Text style={{margin:8}} > Line Chart </Text>
                        <LineChart
                            data={{
                                labels: ['January', 'February', 'March', 'April', 'May', 'June'],
                                datasets: [{
                                    data: [
                                        Math.random() * 100,
                                        Math.random() * 100,
                                        Math.random() * 100,
                                        Math.random() * 100,
                                        Math.random() * 100,
                                        Math.random() * 100
                                    ],
                                    color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
                                    strokeWidth: 2 // optional
                                }]
                            }}
                            width={width-16} // from react-native
                            height={220}
                            chartConfig={{
                                backgroundColor: '#e26a00',
                                backgroundGradientFrom: '#fb8c00',
                                backgroundGradientTo: '#ffa726',
                                decimalPlaces: 2, // optional, defaults to 2dp
                                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                style: {
                                borderRadius: 16
                                }
                            }}
                            style={{
                                margin: 8,
                                borderRadius: 16
                            }}
                        />
                    </View>
                    <View style={{flexDirection:'column', width:width}} >
                        <Text style={{margin:8}} > Progress Chart </Text>
                        <ProgressChart
                            data={{
                                labels: ['Swim', 'Bike', 'Run'], // optional
                                data: [0.4, 0.6, 0.8]
                            }}
                            width={width-16} // from react-native
                            height={220}
                            chartConfig={{
                                backgroundColor: '#e26a00',
                                backgroundGradientFrom: '#fb8c00',
                                backgroundGradientTo: '#ffa726',
                                decimalPlaces: 2, // optional, defaults to 2dp
                                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                style: {
                                borderRadius: 16
                                }
                            }}
                            style={{
                                margin: 8,
                                borderRadius: 16
                            }}
                        />
                    </View>
                    <View style={{flexDirection:'column', width:width}} >
                        <Text style={{margin:8}} > Bar Chart </Text>
                        <BarChart
                            data={{
                                labels: ['January', 'February', 'March', 'April', 'May', 'June'], // optional
                                datasets: [{
                                    data: [
                                        Math.random() * 100,
                                        Math.random() * 100,
                                        Math.random() * 100,
                                        Math.random() * 100,
                                        Math.random() * 100,
                                        Math.random() * 100
                                    ]
                                }]
                            }}
                            width={width-16} // from react-native
                            height={220}
                            chartConfig={{
                                backgroundColor: '#e26a00',
                                backgroundGradientFrom: '#fb8c00',
                                backgroundGradientTo: '#ffa726',
                                decimalPlaces: 2, // optional, defaults to 2dp
                                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                style: {
                                borderRadius: 16
                                }
                            }}
                            style={{
                                margin: 8,
                                borderRadius: 16
                            }}
                        />
                    </View>
                    <View style={{flexDirection:'column', width:width}} >
                        <Text style={{margin:8}} > Pie Chart </Text>
                        <PieChart
                            data={[
                                { name: 'Seoul', population: 21500000, color: 'rgba(131, 167, 234, 1)', legendFontColor: '#7F7F7F', legendFontSize: 15 },
                                { name: 'Toronto', population: 2800000, color: '#F00', legendFontColor: '#7F7F7F', legendFontSize: 15 },
                                { name: 'Beijing', population: 527612, color: 'red', legendFontColor: '#7F7F7F', legendFontSize: 15 },
                                { name: 'New York', population: 8538000, color: '#f5f5f5', legendFontColor: '#7F7F7F', legendFontSize: 15 },
                                { name: 'Moscow', population: 11920000, color: 'rgb(0, 0, 255)', legendFontColor: '#7F7F7F', legendFontSize: 15 }
                            ]}
                            width={width-16} // from react-native
                            height={220}
                            accessor="population"
                            backgroundColor="transparent"
                            chartConfig={{
                                backgroundColor: '#e26a00',
                                backgroundGradientFrom: '#fb8c00',
                                backgroundGradientTo: '#ffa726',
                                decimalPlaces: 2, // optional, defaults to 2dp
                                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                style: {
                                borderRadius: 16
                                }
                            }}
                            style={{
                                margin: 8,
                                borderRadius: 16
                            }}
                        />
                    </View>
                </ScrollView>
            </View>
        )
    }
}
