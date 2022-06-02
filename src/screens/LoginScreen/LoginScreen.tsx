import React, { useEffect, useRef, useState } from "react";
import styles from "./LoginScreen.styles";
import { INavigationProps } from "../../navigations/INavigationProps";
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import auth from "@react-native-firebase/auth";

const LoginScreen: React.FC<INavigationProps> = ({ navigation, route }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoginProcess, setIsLoginProcess] = useState(false);

  const ref_email = useRef<any>();
  const ref_password = useRef<any>();

  useEffect(() => {
  }, []);

  const onPressLogin = (email: string, password: string) => {
    setEmailError("");
    setPasswordError("");
    setIsLoginProcess(true);
    // check null string
    if (email.trim().length > 0 && password.trim().length > 0) {
      auth().signInWithEmailAndPassword(email, password)
        .then(() => {
          setIsLoginProcess(false);
          navigation.navigate("HomeScreen")
        })
        .catch(error => {
          setIsLoginProcess(false);
          if (error.code === "auth/invalid-email") {
            setEmailError("Email not valid");
            ref_email.current.focus();
          }
          if (error.code === "auth/user-not-found") {
            setEmailError("User not found");
            ref_email.current.focus();
          }
          if (error.code === "auth/wrong-password") {
            setPasswordError("Wrong password");
            ref_password.current.focus();
          }
        });
    } else if (email.trim().length === 0) {
      setEmailError("Email could not be empty");
    } else if (password.trim().length === 0) {
      setPasswordError("Password could not be empty");
    }
  };

  return (
    <SafeAreaView
      style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      <View style={[styles.circle, styles.circle1]} />
      <View style={[styles.circle, styles.circle2]} />

      <View style={[styles.circle, styles.bottomWrapper]}>

        <Text style={styles.header}>Log In</Text>

        <Text style={styles.formLabel}>
          Email address
        </Text>
        <TextInput
          value={email}
          ref={ref_email}
          onChangeText={text => setEmail(text)}
          style={styles.formControl}
          autoCapitalize={"none"}
          returnKeyType="next"
          onSubmitEditing={() => ref_password.current.focus()}
          autoComplete={"email"}
          placeholderTextColor="#999999"
          placeholder={"Enter your email address"} />
        <Text style={styles.formMessage}>{emailError}</Text>

        <Text style={styles.formLabel}>Password</Text>
        <TextInput
          value={password}
          ref={ref_password}
          onChangeText={text => setPassword(text)}
          style={styles.formControl}
          secureTextEntry
          placeholderTextColor="#999999"
          placeholder={"Enter your password"} />
        <Text style={styles.formMessage}>{passwordError}</Text>

        <TouchableOpacity
          activeOpacity={.8}
          onPress={() => onPressLogin(email, password)}
          disabled={isLoginProcess}>
          {
            isLoginProcess ?
              <ActivityIndicator color={'white'} style={styles.formButton} /> :
              <Text style={styles.formButton}>Log In</Text>
          }
        </TouchableOpacity>

        <View style={styles.extractMessage}>
          <Text style={styles.message}>Do not have an account?</Text>
          <TouchableOpacity
            activeOpacity={.8}>
            <Text style={styles.extractMessageButton}>Register now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
