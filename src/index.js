import { View,Text,TouchableOpacity,TextInput,StyleSheet,Alert, Image } from 'react-native'
import React, {useEffect, useRef,useState} from 'react'
import { FirebaseRecaptchaVerifierModal} from 'expo-firebase-recaptcha';
import { firebaseConfig } from '../config';
import firebase from 'firebase/compat/app';

//import React,{useRef} from 'react';
// import React, {useRef} from 'react';


//  import { ImageBackground } from 'react-native';
//  import { setStatusBarBackgroundColor, setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';
//  import { color } from 'react-native-reanimated';

const Otp=()=> { 
    const [phoneNumber, setPhoneNumber]= useState('');
    const[code, setCode]=useState('');
    const [verficationId, setVerificationId]= useState(null);
    const recaptchaVerifier = useRef(null);
    const firstInput = useRef(null);
    const secondInput= useRef(null);
    const thirdInput= useRef(null);
    const fourthInput = useRef(null);
    const[countdown, setcountdown]= useState(defaultCountdown);
    const defaultCountdown= 60;
    let clockCall=null
    const [enableResend, setEnableResend]=useState(false)
    

    useEffect(()=>{
        clockCall=setInterval(()=>{
            decrementClock();

        },1000)
        return() => {
            clearInterval(clockCall)
        }
    })

    const decrementClock=()=> {
        if (countdown===0){
            setEnableResend(true)
            setcountdown(0)
            clearInterval(clockCall)

        }else{
            setcountdown(countdown-1)
    }   

    }

    
    const onChangeNumber=(val) => {
        setInterval(val)
        if (val.length===lengthInput){
            Navigation.navigate('Home')
        }
    }
    
    const onResendOTP =()=>{
        if (enableResend) {
            setcountdown(defaultCountdown)
            setEnableResend(false)
            clearInterval(clockCall)
            clockCall= setInterval(()=>{
                decrementClock()
            },1000)
        console.log("Resend OTP")
        }
    

    
    
   
    

    const sendVerification= ()=> {
        const phoneProvider =new firebase.auth.PhoneAuthProvider();
        phoneProvider
            .verifyPhoneNumber(phoneNumber,recaptchaVerifier.current)
            .then(setVerificationId);
            setPhoneNumber('');
        
    };
    const confirmCode=()=> {

        const credential=firebase.auth.PhoneAuthProvider.credential(
            verficationId,
            code
        );
        firebase.auth().signInWithPhoneNumber(credential)
        .then(()=> {
            setCode ('');
        })
        .catch((error) => {
            //show an alert in case of error
            alert(error);
        })
        Alert.alert(
            'Login Successful. Welcome To Dashboard',
        );
          
        
     
}}
    return (
        
        <View style={styles.container}>
            
            <FirebaseRecaptchaVerifierModal
                ref={recaptchaVerifier}
                firebaseConfig={firebaseConfig}
                />
                <Image source={require('../assets/d_t.png')} style={styles.dImg}/>
                
               
                <TextInput
                    placeholder='Enter your Phone Number With Country code'
                    onChangeText={setPhoneNumber}
                    autoCompleteType='tel'
                    keyboardType='phone-pad'
                    style={styles.textInput}
                    />
                    <TouchableOpacity 
                    style ={styles.sendVerification} onPress={sendVerification}>
                        <Text style={styles.buttonText}>
                            Send verfication 
                        </Text>

                    </TouchableOpacity>
                    {/* <TextInput
                    placeholder='Enter Otp here'
                    onChangeText={setCode}
                    keyboardType='number-pad'
                    style={styles.textInput}
                    /> */}
    <View style={{flex:1,justifyContent:'center', alingItems:'center', marginEnd:40,
     marginStart:60}}>
            <View style={{flexDirection:'row'}}>
                <TextInput style={styles.input}
                onChangeText={text=> {
                    text && secondInput.current.focus();
            }}
                ref={firstInput}
                keyboardType='number-pad'
                maxLength={1}
                />

                <TextInput style ={styles.input}
                onChangeText={text =>{text
                ?thirdInput.current.focus()
                :firstInput.current.focus();
            }}
                ref={secondInput}
                 keyboardType='number-pad'
                 maxLength={1}
                />

                <TextInput style ={styles.input}
                onChangeText={text =>{text
                ?fourthInput.current.focus()
                :secondInput.current.focus();
            }}
                ref={thirdInput}
                 keyboardType='number-pad'
                 maxLength={1}
                />

                <TextInput style ={styles.input}
                onChangeText={text => {text
                ?fourthInput.current.focus():
                secondInput.current.focus();
                
                !text && thirdInput.current.focus();
            }}
                ref={fourthInput} 
                keyboardType='number-pad'
                 maxLength={1}
                />
            </View>
        </View>
        
                    <TouchableOpacity 
                    style ={styles.sendCode} onPress={confirmCode}>
                        <Text style={styles.buttonText}>
                            Confirm verfication 
                        </Text>
           
            </TouchableOpacity>
            <View style={styles.bottomView}>
                    <TouchableOpacity onPress={onChangeNumber} >
                    <View style={styles.btnChangeNumber}>
                    <Text style={styles.textchange}>Change number</Text>
                    </View>
                    </TouchableOpacity>
                    

                    <TouchableOpacity onPress=
                    {onResendOTP}  >
                    <View style={styles.btnResend}>
                    <Text style={styles.textResend}>Resend OTP(60)</Text>
                    </View>
                    </TouchableOpacity>     
            </View>        
                    
                    


                   

                    
                    
        </View>
    )
}

export default Otp;


const styles=StyleSheet.create({
    container:{
        flex:2,
        backgroundColor:'#fff',
        alighItem:'center',
        justifyContent:'center',
        
        
    },
    textInput:{
        paddingTop:40,
        paddingBottom:20,
        paddingHorizontal:20,
        frontSize:24,
        borderBottomColor:'#fff',
        borderBottomWidth:2,
        marginBottom:20,
        textAlign:'center',
        colour:'#fff',
        marginTop:40

    },
    sendVerification:{
        padding:15,
        backgroundColor:'#ffa07a',
        borderRadius:90,
        width:'70%',
        alignSelf: 'center',
        marginBottom:10,
        marginTop:30
        
       
        
    },
    sendCode:{
        padding:15,
        backgroundColor:'#ffa07a',
        borderRadius:90,
        width:'70%',
        alignSelf: 'center',
        marginBottom:50,
        marginTop:20

      
    },
    buttonText: {
        textAlign:'center',
        color:'#fff',
        fontWeight:'bold'
    },
    otpText: {
        fontSize:24,
        fontWeight:'bold',
        color:'#000',
        margin:30,
        textAlign:'center',
        justifyContent:'center'
        
    }
    ,
    
     dImg:{
         width:400,
        length:200,
        height:150,
        marginBottom:20,
        marginTop:90,
        borderRadius:30,
        includeFontPadding:30} ,

    input:
    {
     
    justifyContent:'center',
    //  alingItems:'center',
     //borderBottomColor:'#0000ff',
     width:30,
     height:30,
     length:40,
     borderBottomWidth:1, flex:1,
     alighItem:'center',
     justifyContent:'center',
     borderWidth:1,
     borderRadius:5,
     borderColor:"000",
     textAlign:"center",
     marginEnd:30,
     marginTop:30,
     marginBottom:20},


     btnChangeNumber:{
        width:150,
        height:50,
        boarderRadius:10,
        alignItems:'flex-start',
        justifyContent:"center",
        marginHorizontal:30

        
     },
     textchange:{
        color:'#234DB7',
        alignItems:'center',
        fontSize:15
        

     },
     btnResend:{
        width:150,
        height:50,
        borderRadius:10,
        alighItem:'flex-end',
        justifyContent:'center'
      },
     
     textResend:{
        alignItems:'center',
        frontSize:15
      
     },
     bottomView :{
        flexDirection:'row',
        flex:1,
        justifyContent:"flex-end",
        marginBottom:50,
        alignItems:'flex-end',
        backgroundColor:'#fff'
     }




     

     

    

});