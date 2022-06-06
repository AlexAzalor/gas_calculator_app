import React, { useCallback, useState } from 'react';
import { Button, Pressable, StyleSheet, Text, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Formik } from 'formik'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useAppSelector } from '../hooks/redux';

const makeFromServer = [
  { label: 'Honda', value: 'Honda' },
  { label: 'S and S Coach Company E.p. Dutton', value: 'S and S Coach Company E.p. Dutton' },
  { label: 'BMW', value: 'BMW' },
  { label: 'Mercedes-Benz', value: 'Mercedes-Benz' },
  { label: 'McLaren Automotive', value: 'McLaren Automotive' },
  { label: 'Import Foreign Auto Sales Inc', value: 'Import Foreign Auto Sales Inc' },
  { label: 'American Motors Corporation', value: 'American Motors Corporation' },
  { label: 'Hyundai', value: 'Hyundai' },
  { label: 'Porsche', value: 'Porsche' },
  { label: 'Ford', value: 'Ford' },
]
const modelFromServer = [
  { label: 'Odyssey', value: 'Odyssey' },
  { label: 'Funeral Coach 2WD', value: 'Funeral Coach 2WD' },
  { label: '5 Series', value: '5 Series' },
  { label: 'Lynx', value: 'Lynx' },
  { label: 'Eclipse Cross ES 2WD', value: 'Eclipse Cross ES 2WD' },
  { label: 'Sunbird Convertible', value: 'Sunbird Convertible' },
  { label: 'Van 1500/2500 2WD', value: 'Van 1500/2500 2WD' },
  { label: 'Civic', value: 'Civic' },
  { label: 'Z8', value: 'Z8' },
  { label: 'Spider Cambiocorsa/Spider GT', value: 'Spider Cambiocorsa/Spider GT' },
]
const yearFromServer = [
  { label: '2022', value: '2022' },
  { label: '2021', value: '2021' },
  { label: '2020', value: '2020' },
  { label: '2019', value: '2019' },
  { label: '2018', value: '2018' },
  { label: '2017', value: '2017' },
  { label: '2016', value: '2016' },
  { label: '2015', value: '2015' },
  { label: '2014', value: '2014' },
  { label: '2013', value: '2013' },
]

const typeGas = [
  { label: 'Regular', value: 'Regular' },
  { label: 'Mid-Grade', value: 'Mid-Grade' },
  { label: 'Premium', value: 'Premium' },
  { label: 'Diesel', value: 'Diesel' },
  { label: 'UK', value: 'UK' },
]

export const Calculator = () => {
  const [openMakeList, setOpenMakeList] = useState(false);
  const [openModelList, setOpenModelList] = useState(false);
  const [openYearList, setOpenYearList] = useState(false);
  const [openGasList, setOpenGasList] = useState(false);

  const [carMake, setCarMake] = useState(null);
  const [carModel, setCarModel] = useState(null);
  const [carYear, setCarYear] = useState(null);
  const [gasType, setGasType] = useState(null);

  const [makeListFromServer, setMakeListFromServer] = useState(makeFromServer);
  const [modelListFromServer, setModelListFromServer] = useState(modelFromServer);
  const [yearListFromServer, setYearListFromServer] = useState(yearFromServer);
  const [gasList, setGasList] = useState(typeGas);

  const { distanceRedux } = useAppSelector(state => state.userReducer)
  const { cityRedux } = useAppSelector(state => state.userReducer)

  const onCountryOpen = useCallback(() => {
    setOpenGasList(false);
  }, []);

  const onCityOpen = useCallback(() => {
    setOpenMakeList(false);
  }, []);

  return (
    <Formik initialValues={{ carMake: '' }} onSubmit={(values) => console.log('submitted', values)}>
      {({ handleChange, handleSubmit, values }) => (
        <View>
          <Text style={styles.text}>Make</Text>
          <DropDownPicker
            // searchable={true}
            // listMode="MODAL"
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
            onSelectItem={() => {
              // console.log('selected', item);
              handleChange('carMake')
            }}
          />
          <Text style={styles.text}>Model</Text>
          <DropDownPicker
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
          <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Calculate</Text>
          </TouchableOpacity>
          <Text>redux distance - {distanceRedux}</Text>
          <Text>redux city - {cityRedux}</Text>
        </View>
      )}
    </Formik>
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
  }
})
