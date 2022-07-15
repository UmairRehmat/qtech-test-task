/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  TextInput,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import axios, { AxiosResponse } from 'axios';
import RNPickerSelect from "react-native-picker-select";
import { PickerIOS } from '@react-native-community/picker';
import { number } from 'prop-types';
import { ToWords } from 'to-words';
const toWords = new ToWords();


const App = () => {

  const [currencyList, setCurrencyList] = useState<any>([
    {
      label: 'Loading', value: 0
    }
  ]);
  const [enteredValue, setEnteredValue] = useState(0);
  const [currencyValue, setCurrencyValue] = useState(0);
  const [selectedCurrency, setSelectedCurrency] = useState(0);

  const [selectedCurrencyVal, setSelectedCurrencyVal] = useState(0);
  const [currencyTextvalue, setcurrencyTextValue] = useState('Zero');

  useEffect(() => {

    getCurrencyDataApi();
  }, []);

  useEffect(()=>{
const selectedValueToUse = selectedCurrencyVal==null?1:selectedCurrencyVal;
const totalValue = enteredValue *selectedValueToUse;
setCurrencyValue(totalValue);
const valueToPrint = 'USD: '+toWords.convert(enteredValue)+'\n'+ selectedCurrency+': '+toWords.convert(totalValue);
setcurrencyTextValue(valueToPrint);
  },[selectedCurrencyVal,enteredValue]);


  const getCurrencyDataApi = () => {
    axios.get('https://api.currencyapi.com/v3/latest?apikey=QpSnxyjq4qTBDqTP25CiEB7AQF2lSOSWCLsGpdoQ')
      .then((response: AxiosResponse) => {
        let tempCurrencyList = [];
        for (const [key, value] of Object.entries<any>(response.data.data)) {
          const objToadd = {
            label: value.code,
            value: value.value
          }
          tempCurrencyList.push(objToadd);
        }
        console.log("Newly Created list====>", tempCurrencyList);
        setCurrencyList(tempCurrencyList);
      });
  }
  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <View style={styles.innerContainer}>
        <View style={styles.rowStyle}>
          <View style={styles.leftCornerBox}>
            <TextInput
              style={styles.textInputStyle}
              placeholder="Enter Value"
              placeholderTextColor="grey"
              onChangeText={(value) => {
                const number = Number(value);
                if(number != NaN)
                setEnteredValue(number);
              }}
              keyboardType='decimal-pad'
              returnKeyType='done'
            />
            <View
              style={{ flex: 1, justifyContent: 'flex-end' }}>
              <Text style={{ color: "black" }}>USD</Text>
            </View>

          </View>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text style={{ color: 'black', fontSize: 24, textAlign: 'center' }}>
              =
            </Text>
          </View>

          <View style={styles.rightCornerBox}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <Text style={{ color: "black", textAlign: 'center' }}>
                {currencyValue}
              </Text>
            </View>
            <View style={styles.pickerContainerStyle}>
              <RNPickerSelect
                items={currencyList}
                doneText='Select'
                style={{
                  placeholder: { color: 'grey' },
                  inputIOS: { color: 'black' },
                  inputAndroid: { color: 'black' }
                }}
                placeholder={{
                  label: 'Select Currency', value: null
                }}
                onValueChange={(value, index) => {
          
                  console.log("value", value);
                  setSelectedCurrencyVal(value);
                  setSelectedCurrency(currencyList[index-1].label);
                }
                }
              />
            </View>
          </View>
        </View>
        <Text style={{ color: "white", textAlign: 'center' }}>
                {currencyTextvalue}
              </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: "grey",
    flex: 1
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center"
  },
  rowStyle: {
    flexDirection: "row",
    padding: 10
  },
  leftCornerBox: {
    backgroundColor: "#c9e6f5",
    justifyContent: 'center',
    flex: 5,
    padding: 10,
    height: 100,
    borderTopLeftRadius: 20,
    borderColor: "#b2c4e6"
  },
  rightCornerBox: {
    backgroundColor: "#c9e6f5",
    justifyContent: 'center',
    flex: 5,
    padding: 10,
    height: 100,
    borderTopRightRadius: 20,
    borderColor: "#b2c4e6"
  },
  textInputStyle: {
    flex: 1,
    color: 'black'
  },
  pickerContainerStyle: {
    flex: 1,
    justifyContent: 'flex-end'
  }

});

export default App;
