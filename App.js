import * as React from 'react';
import {Button, View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

function First({navigation}) {
    return (
        <View style={{flex: 1, alignItems: 'center'}}>
            <Image
                style={{width: 200, height: 200}}
                source={{
                    uri: 'https://lienminh.garena.vn/images/banners/45-vtlmht-220617.png',
                }}
            />
            <Button title="LOL" onPress={() => navigation.navigate('LOL')}/>

            <Image
                style={{width: 200, height: 200}}
                source={{
                    uri:
                        'http://cdn.dota2.com/apps/dota2/images/blogfiles/nb_2020treasure_blog_image_rtyo.png',
                }}
            />
            <Button title="DOTA" onPress={() => navigation.navigate('DOTA')}/>
        </View>
    );
}

class LOL extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            mang: [],
        };
    }

    render() {
        return (
            <FlatList
                data={this.state.mang}
                renderItem={({item}) => (
                    <View style={styles.dong}>
                        <Text style={{flex: 1 }}>{item['name']}</Text>
                        <Image
                            resizeMode={'contain'}
                            style={{width: 100, height: 200, flex: 2}}
                            source={{
                                uri: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/"+item['name'].replace(" ","")+'.png'
                            }}
                        />
                    </View>

                )}
                horizontal={false}
                numColumns={1}
            />
        );
    }

    componentDidMount() {
        fetch(
            'http://ddragon.leagueoflegends.com/cdn/9.3.1/data/en_US/champion.json',
        )
            .then(reponse => reponse.json())
            .then(reponseJson => {
                this.setState({
                    mang: Object.keys(reponseJson['data']).map(key => reponseJson['data'][key]),
                });
            })
            .catch(e => {
                console.log(e);
            });
    }
}
class DOTA extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            mang: [],
        };
    }

    render() {
        return (
            <FlatList
                data={this.state.mang}
                renderItem={({item}) => (
                    <View style={styles.dong}>
                        <Text style={{flex: 1 }}>{item.name.replace("npc_dota_hero_","")}</Text>
                        <Image
                            style={{width: 100, height: 100, flex: 2}}
                            source={{
                                uri: "http://cdn.dota2.com/apps/dota2/images/heroes/"+item.name.replace("npc_dota_hero_","")+"_full.png"
                            }}
                        />
                    </View>
                )}
                horizontal={false}
                numColumns={1}
            />
        );
    }

    componentDidMount() {
        fetch(
            'https://api.opendota.com/api/heroes',
        )
            .then(reponse => reponse.json())
            .then(reponseJson => {
                this.setState({
                    mang: reponseJson
                });
            })
            .catch(e => {
                console.log(e);
            });
    }
}

function HomeScreen({navigation}) {
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>Home Screen</Text>
            <Button
                title="Go to Details"
                onPress={() => navigation.navigate('Details')}
            />
        </View>
    );
}

function DetailsScreen({navigation}) {
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>Details Screen</Text>
            <Button
                title="Go to Details... again"
                onPress={() => navigation.push('Details')}
            />
            <Button title="Go to Home" onPress={() => navigation.navigate('Home')}/>
            <Button title="Go back" onPress={() => navigation.goBack()}/>
            <Button
                title="Go back to first screen in stack"
                onPress={() => navigation.popToTop()}
            />
        </View>
    );
}

const Stack = createStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="First" component={First}/>
                <Stack.Screen name="LOL" component={LOL}/>
                <Stack.Screen name="DOTA" component={DOTA}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

var styles = StyleSheet.create({
    dong: {borderBottomWidth: 1, padding: 50, flexDirection: 'row'},
});

export default App;
