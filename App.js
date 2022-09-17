import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text,ScrollView, View,SafeAreaView,TouchableOpacity, TextInput } from 'react-native';
import React, { useState } from "react";

function SizedBox(prop){
  return (<View style={{ height: prop.height, width: prop.width }} ></View>);
}


function ErrorText(props){
  return (<Text style={styles.errorText} >{props.children}</Text>);
}

function LargeText(props){
  return (<Text style={styles.largeText} >{props.children}</Text>);
}

function CustomTextInput(props){
  return(
  <View style={styles.editTextView}>
    <TextInput style={styles.editTextInput}
    clearTextOnFocus={props.text == '0' || props.text == '' ?true:false} 
    onChangeText={(str)=>props.onChangeText(str)}
    value={props.text}
    ></TextInput>
    <Text style={styles.editTextSubTitle}>{props.label}</Text>
  </View>);
}

function OptionSelector(props){

  return(
    <View style={styles.optionSelectorView}>
      <TouchableOpacity
          style={[props.state == 0?styles.activeButton:null,styles.optionSelectorButton]}
          onPress={()=>props.onPress(0)}
          underlayColor='#fff'>
          <Text style={styles.optionSelectorText}>Standard</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[props.state == 1?styles.activeButton:styles.inactiveButton,styles.optionSelectorButton]}
          onPress={()=>props.onPress(1)}
          underlayColor='#fff'>
          <Text style={styles.optionSelectorText}>Metric</Text>
        </TouchableOpacity>
    </View>
  );

}



export default function App() {
  const [state ,setButtonState ] = React.useState(0);
  const [heightMetric ,setheightMetric ] = React.useState(0);
  const [heightFeet ,setHeightFeet ] = React.useState(0);
  const [heightInch ,setHeightInch ] = React.useState(0);
  const [weight ,setWeight ] = React.useState(0);
  const [errorMessage ,setErrorMessage ] = React.useState('');

  function clearFields(){
    setheightMetric('0');
    setHeightFeet('0');
    setHeightInch('0');
    setWeight('0');
    setErrorMessage('');

  }

  function _isMetricUnits(){
    return state == 1;
  }

  function _isEmptyOrZero(str){
    return (str.trim() == '' || str == '0');
  }

  function _isNumeric(str){
    return !isNaN(+str)
  }

  //function to calculate BMI using height and weight
  function calculatBMI(){
    if(isValidData()){
        if(_isMetricUnits()){}
    }
  }

  //function to validate data in form
  function isValidData(){

    if(_isMetricUnits()){

      if(_isEmptyOrZero(heightMetric)){
        return setErrorMessage('Please enter a height.')
        return false;
      }
      if(!_isNumeric(heightMetric)){
        return setErrorMessage('Please enter a valid height.')
      }
     
    }
    else {
      if(_isEmptyOrZero(heightInch) && _isEmptyOrZero(heightFeet)){
        return setErrorMessage('Please enter a height.')
        return false;
      }
      if(!_isNumeric(heightInch)){
        return setErrorMessage('Please only enter numbers for inches.')
      }
      if(!_isNumeric(heightFeet)){
        return setErrorMessage('Please only enter numbers for feet.')
      }


    }
    if(_isEmptyOrZero(weight)){
      setErrorMessage('Please enter a weight.')
      return false;
    }
    if(!_isNumeric(weight)){
      return setErrorMessage('Please only enter numbers for weight.')
    }
    
    setErrorMessage('');
    return true;

  }

  return (
    <View >
      <SafeAreaView style={styles.container} >
        <Text style={styles.appBarTitle}>BMI Calculator</Text>
      </SafeAreaView>
      <ScrollView style={{paddingLeft:20,paddingRight:20}}>
        <SizedBox height={20} />
        <OptionSelector state={state} onPress={function (i){setButtonState(i);clearFields();}}></OptionSelector>
        <SizedBox height={20} />
        <LargeText>Your height </LargeText>
        <SizedBox height={10} />
        { state == 0 && <View style={{flexDirection:'row'}}>
          <CustomTextInput text={heightFeet} onChangeText={(x)=>setHeightFeet(x)} label="Feet (ft)">
          </CustomTextInput>
          <SizedBox width={20} />
          <CustomTextInput text={heightInch} onChangeText={(x)=>setHeightInch(x)}label="Inch (in)">
          </CustomTextInput>
        </View>}
        {state == 1 &&
          <CustomTextInput label="Height (cm)" text={heightMetric} onChangeText={(x)=>setheightMetric(x)}>
          </CustomTextInput>
         }
        <SizedBox height={20} />
       
        <LargeText>Your weight </LargeText>
        <SizedBox height={10} />
        <CustomTextInput text={weight} onChangeText={(x)=>setWeight(x)} label={"Weight "+(state == 1? "(kg)":"(lb)")}></CustomTextInput>
        <SizedBox height={20} />

        <TouchableOpacity
          style={[styles.activeButton,styles.optionSelectorButton]}
          onPress={()=>calculatBMI()}
          underlayColor='#fff'>
          <Text style={styles.optionSelectorText}>Calculate</Text>
        </TouchableOpacity>
        {errorMessage !='' && <ErrorText>{errorMessage}</ErrorText>}

      </ScrollView>
    </View>
  );
}
const primaryColor = '#325296';
const styles = StyleSheet.create({

  editTextSubTitle:{
    fontSize:25,
    width:"100%",
    color:'#939393',
    textAlign:'center'
  },
  editTextView:{
    borderWidth:1,
    height:104,
    flex:1,
    borderRadius:18,
    borderColor:'#ABB8D4',
    alignItems:'center',
    justifyContent:'center'
    },
  editTextInput:{
    fontSize:46,
    width:"100%",
    color:'#626262',
    textAlign:'center'
  },
  container: {
    height:95,
    backgroundColor: primaryColor,
    alignItems:'center',
    justifyContent:'center'
  },
  optionSelectorView:{
    padding:5,
    flexDirection:'row',
    backgroundColor:'#ABB8D4',
    borderRadius:1000
  },
  errorText:{
    fontSize:27,
    color:'#B64E4E'

  },
  largeText:{
    fontSize:27,
    color:'#939393'

  },
  optionSelectorText:{
    fontSize:27,
    color:'white'

  },
  optionSelectorButton:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  activeButton:{
    height:60,
    borderRadius:1000,
    backgroundColor:primaryColor,
  },
  inactiveButton:{
  },
  appBarTitle:{
    flex:1,
    color:'#fff',
    marginTop:8,
    fontSize:25,
    alignItems:'center',
    justifyContent:'center'
  }
});
