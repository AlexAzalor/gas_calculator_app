import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Button, Pressable, StyleSheet, Text, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useAppSelector } from '../hooks/redux';
import { instance } from '../api/backend';
import { instanceMake } from '../api/apiMake';
import { instanceModel } from '../api/apiModel';
import { instanceYear } from '../api/apiYear';

const typeGas = [
  { label: 'Regular', value: 'Regular' },
  { label: 'Mid-Grade', value: 'Mid-Grade' },
  { label: 'Premium', value: 'Premium' },
  { label: 'Diesel', value: 'Diesel' },
  { label: 'UK', value: 'UK' },
]

export const Calculator = () => {
  // console.log('render....');

  const [openMakeList, setOpenMakeList] = useState(false);
  const [openModelList, setOpenModelList] = useState(false);
  const [openYearList, setOpenYearList] = useState(false);
  const [openGasList, setOpenGasList] = useState(false);

  const [carMake, setCarMake] = useState('');
  const [carModel, setCarModel] = useState('');
  const [carYear, setCarYear] = useState('');
  const [gasType, setGasType] = useState('');

  const [makeListFromServer, setMakeListFromServer] = useState([{ label: '', value: '' }]);
  const [modelListFromServer, setModelListFromServer] = useState([{ label: '', value: '' }]);
  const [yearListFromServer, setYearListFromServer] = useState([{ label: '', value: '' }]);
  const [gasList, setGasList] = useState(typeGas);

  // get states with Redux
  const { distanceRedux } = useAppSelector(state => state.dataReducer);
  const { cityRedux } = useAppSelector(state => state.dataReducer);

  const [gasPrice, setGasPrice] = useState(0);
  const [carbonConsumption, setCarbonConsumption] = useState(0);

  const getGasPrice = async () => {
    const response = await instance(
      carMake,
      carModel,
      carYear,
      gasType,
      `${distanceRedux} km`,
      cityRedux
    ).get('/api/gas_consumption');

    console.log('response.data - ', response.data);

    if (response.data.error === 'wrong_gas_type') {
      Alert.alert('Wrong Type of Gasoline selected for the current city/country.')
    }

    if (response.data.error === 'wrong_car_options') {
      Alert.alert('Please complete all fields.')
    }

    setGasPrice(response.data.gas_price);
    setCarbonConsumption(response.data.c02_kg);
  }

  const getMake = async () => {
    const response = await instanceMake().get('/api/make');
    setMakeListFromServer(response.data.filterer_make_list);
  }

  useEffect(() => {
    getMake();
  }, [])

  const getModel = async () => {
    const response = await instanceModel(carMake).get('/api/model')
    setModelListFromServer(response.data.filterer_model_list)
  }

  useEffect(() => {
    getModel();
  }, [carMake])

  const getYear = async () => {
    const response = await instanceYear(carModel, carMake).get('/api/year')
    setYearListFromServer(response.data.vehicle_year_list)
  }

  useEffect(() => {
    getYear();
  }, [carModel])

  const onCountryOpen = useCallback(() => {
    setOpenGasList(false);
  }, []);

  const onCityOpen = useCallback(() => {
    setOpenMakeList(false);
  }, []);


  const getSubmit = () => {
    getGasPrice()
  }

  return (
    <View>
      <Text style={styles.text}>Make</Text>
      <DropDownPicker
        searchable={true}
        listMode="MODAL"
        modalProps={{
          animationType: "slide"
        }}
        open={openMakeList}
        setOpen={setOpenMakeList}
        onOpen={onCountryOpen}
        value={carMake}
        setValue={setCarMake}
        items={makeListFromServer}
        setItems={setMakeListFromServer}
        style={styles.selector}
        zIndex={3000}
        zIndexInverse={1000}
      />
      <Text style={styles.text}>Model</Text>
      <DropDownPicker
        listMode="MODAL"
        modalProps={{
          animationType: "slide"
        }}
        searchable={true}
        open={openModelList}
        setOpen={setOpenModelList}
        value={carModel}
        setValue={setCarModel}
        items={modelListFromServer}
        setItems={setModelListFromServer}
        style={styles.selector}
        zIndex={2000}
        zIndexInverse={2000}
      />
      <Text style={styles.text}>Year</Text>
      <DropDownPicker
        searchable={true}
        listMode="MODAL"
        modalProps={{
          animationType: "slide"
        }}
        open={openYearList}
        setOpen={setOpenYearList}
        value={carYear}
        setValue={setCarYear}
        items={yearListFromServer}
        setItems={setYearListFromServer}
        style={styles.selector}
        zIndex={1000}
        zIndexInverse={3000}
      />
      <Text style={styles.text}>Type of Gasoline</Text>
      <DropDownPicker
        open={openGasList}
        setOpen={setOpenGasList}
        onOpen={onCityOpen}
        value={gasType}
        setValue={setGasType}
        items={gasList}
        setItems={setGasList}
        style={styles.selector}
        zIndex={500}
        zIndexInverse={3500}
      />
      <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={getSubmit}>
        <Text style={styles.buttonText}>Calculate</Text>
      </TouchableOpacity>

      {/* <Text>redux distance - {distanceRedux}</Text>
      <Text>redux city - {cityRedux}</Text> */}

      <Text style={styles.resultTitle}>Gas Price for a Trip: </Text>
      <View style={[styles.resultValue, styles.boxShadow]}>
        <Text style={styles.resultText}>{gasPrice} $</Text>
      </View>

      <Text style={styles.resultTitle}>CO2 Produced: </Text>
      <View style={[styles.resultValue, styles.boxShadow]}>
        <Text style={styles.resultText}>{carbonConsumption} kg</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  selector: {
    marginBottom: 10,
  },
  text: {
    textAlign: 'center',
    color: '#3237ff',
    fontSize: 18,
    fontWeight: "500",
  },
  button: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#3237ff',
  },
  buttonText: {
    color: '#fff',
    textTransform: 'uppercase',
    fontSize: 16,
    fontWeight: "500",
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: "500",
    textAlign: 'center',
  },
  resultValue: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    margin: 10,
    alignSelf: 'center',
  },
  boxShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  resultText: {
    fontSize: 26,
    fontWeight: "600",
    textAlign: 'center',
  }
})
