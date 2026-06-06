import { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Image, KeyboardAvoidingView, Platform, Alert
} from 'react-native';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebaseConfig';

export default function LoginScreen({ onLogin, navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onLogin();
    } catch (error: any) {
      Alert.alert('Login Failed', error.message);
    }
    setLoading(false);
  };

  const handleForgotPassword = async () => {
    if (!email) {
      Alert.alert('Reset Password', 'Enter your email above and tap Forgot Password again.');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert('Email Sent', 'Check your inbox for a password reset link.');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Text style={styles.tagline}>SPORTS ANALYSIS & PICKS</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#666"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#666"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity onPress={handleForgotPassword} style={styles.forgotWrap}>
        <Text style={styles.forgotText}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loading}>
        <Text style={styles.loginButtonText}>{loading ? 'SIGNING IN...' : 'SIGN IN'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.signupLink}>Don't have an account? <Text style={styles.signupLinkBold}>Sign Up</Text></Text>
      </TouchableOpacity>
      <Text style={styles.disclaimer}>For entertainment and informational purposes only.</Text>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logo: {
    width: 220,
    height: 110,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  tagline: {
    color: '#C9A227',
    fontSize: 12,
    letterSpacing: 3,
    marginBottom: 40,
  },
  input: {
    width: '100%',
    backgroundColor: '#1A1A1A',
    color: '#FFFFFF',
    borderColor: '#333',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    marginBottom: 16,
  },
  forgotWrap: {
    alignSelf: 'flex-end',
    marginBottom: 16,
    marginTop: -8,
  },
  forgotText: {
    color: '#C9A227',
    fontSize: 13,
  },
  loginButton: {
    width: '100%',
    backgroundColor: '#C9A227',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 4,
  },
  loginButtonText: {
    color: '#0A0A0A',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  signupLink: {
    color: '#666',
    fontSize: 14,
    marginBottom: 40,
  },
  signupLinkBold: {
    color: '#C9A227',
    fontWeight: 'bold',
  },
  disclaimer: {
    color: '#444',
    fontSize: 11,
    textAlign: 'center',
    position: 'absolute',
    bottom: 30,
  },
});