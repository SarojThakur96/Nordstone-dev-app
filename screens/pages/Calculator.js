import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {Button, Provider, TextInput, ThemeProvider} from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';

const Calculator = () => {
  const [firstNumber, setFirstNumber] = useState('');
  const [secondNumber, setSecondNumber] = useState('');
  const [operator, setOperator] = useState('');
  const [showDropDown, setShowDropDown] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const operationList = [
    {
      label: 'Addition',
      value: 'addition',
    },
    {
      label: 'Subtraction',
      value: 'subtraction',
    },
    {
      label: 'Multiplication',
      value: 'multiplication',
    },
  ];

  const CallCalculateApi = () => {
    fetch(
      `https://nordstone-app.herokuapp.com/api/results?first_number=${firstNumber}&second_number=${secondNumber}&operator=${operator}`,
    )
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setShowResult(data?.result);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <Provider>
      <ThemeProvider>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            // justifyContent: 'center',
          }}>
          <View
            style={{
              height: '80%',
              width: '80%',
              marginVertical: '10%',
            }}>
            <TextInput
              label="First Number"
              mode="outlined"
              keyboardType="numeric"
              value={firstNumber}
              onChangeText={text => setFirstNumber(text)}
            />
            <TextInput
              label="Second Number"
              mode="outlined"
              keyboardType="numeric"
              value={secondNumber}
              onChangeText={text => setSecondNumber(text)}
              style={{
                marginVertical: 10,
              }}
            />
            <DropDown
              label={'Select Operation'}
              mode={'outlined'}
              visible={showDropDown}
              showDropDown={() => setShowDropDown(true)}
              onDismiss={() => setShowDropDown(false)}
              value={operator}
              setValue={setOperator}
              list={operationList}
            />
            <Button
              mode="contained"
              // color="#00aaff"
              style={{
                marginVertical: 20,
              }}
              onPress={CallCalculateApi}>
              Calculate
            </Button>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                borderTopEndRadius: 20,
                borderBottomLeftRadius: 20,
                padding: 20,
                marginHorizontal: 20,
                elevation: 3,
              }}>
              <Text style={{color: '#000000', fontSize: 24}}>Result: </Text>
              <Text style={{color: 'red', fontSize: 24}}>{showResult}</Text>
            </View>
          </View>
        </View>
      </ThemeProvider>
    </Provider>
  );
};

export default Calculator;
