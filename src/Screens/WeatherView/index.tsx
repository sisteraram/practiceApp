import React, { useEffect, useState } from 'react';
import { FlatList, Alert } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

import Styled from 'styled-components/native';

const Container = Styled.SafeAreaView`
    flex: 1;
    background-color: #EEE;
`;

const WeatherContainer = Styled(FlatList)``;

const LoadingView = Styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const Loading = Styled.ActivityIndicator`
    margin-bottom: 16px;
`;

const LoadingLabel = Styled.Text`
    font-size: 16px;
`;

constWeatherItemContainer = Styled.View`
    height: 100%;
    justify-content: center;
    align-items: center;
`;

const Weather = Styled.Text`
    margin-bottom: 16px;
    font-size: 24px;
    font-weight: bold;
`;

const Temperature = Styled.Text`
    font-size: 16px;
`;

interface Props {}

const LOCAL_URL = 'http://localhost:8888/'

interface IWeather {
    temperature?: number;
    weather?: string;
    isLoading: boolean;
}

const WeatherView = ({ }: Props) => {
    const [weatherInfo, setWeatherInfo] = useState<IWeather>({
        temperature: undefined,
        weather: undefined,
        isLoading: false,
    });

    const getCurrentWeather = () => {
        setWeatherInfo({
            isLoading: false,
        });
        fetch(LOCAL_URL)
                    .then(response => response.json())
                    .then(json => {
                        Alert.alert(json.toString());
                    })
                    .catch(error => {
                        Alert.alert('망했다리');
                    })
    }

   useEffect(() => {
    getCurrentWeather();
   }, []);

   let data = [];
   const { isLoading, weather, temperature } = weatherInfo;

   return (
   <Container>
    <WeatherContainer onRefresh={() => getCurrentWeather()} refreshing={false}>
    </WeatherContainer>
   </Container>
   );
}

export default WeatherView;
