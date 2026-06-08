import { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Image, KeyboardAvoidingView, Platform, ScrollView, Alert
} from 'react-native';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';

export default function SignupScreen({ onSignup, navigation }: any) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);
  const [ageConfirm, setAgeConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const allChecked = check1 && check2 && check3 && ageConfirm;

  const validatePassword = (pass: string) => {
    if (pass.length < 8) return 'Password must be at least 8 characters';
    if (!/\d/.test(pass)) return 'Password must contain at least one number';
    return null;
  };

  const handleSignup = async () => {
    if (!name || !email || !phone || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    const passwordError = validatePassword(password);
    if (passwordError) {
      Alert.alert('Weak Password', passwordError);
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        name,
        email,
        phone,
        createdAt: new Date().toISOString(),
        smsOptIn: true,
        pushOptIn: true,
      });
      onSignup();
    } catch (error: any) {
      Alert.alert('Signup Failed', error.message);
    }
    setLoading(false);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#0A0A0A' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <Text style={styles.title}>CREATE ACCOUNT</Text>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="#666"
          value={name}
          onChangeText={setName}
        />
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
          placeholder="Phone Number"
          placeholderTextColor="#666"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />
        <TextInput
          style={styles.input}
          placeholder="Password (8+ chars, 1 number)"
          placeholderTextColor="#666"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#666"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity style={styles.checkRow} onPress={() => setCheck1(!check1)}>
          <View style={[styles.checkbox, check1 && styles.checkboxChecked]}>
            {check1 && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <Text style={styles.checkText}>I understand this is a sports analysis and information service for entertainment purposes only.</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.checkRow} onPress={() => setCheck2(!check2)}>
          <View style={[styles.checkbox, check2 && styles.checkboxChecked]}>
            {check2 && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <Text style={styles.checkText}>I agree to the Terms of Service and Privacy Policy.</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.checkRow} onPress={() => setCheck3(!check3)}>
          <View style={[styles.checkbox, check3 && styles.checkboxChecked]}>
            {check3 && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <Text style={styles.checkText}>I agree to receive push notifications and SMS alerts for picks and updates.</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.checkRow} onPress={() => setAgeConfirm(!ageConfirm)}>
          <View style={[styles.checkbox, ageConfirm && styles.checkboxChecked]}>
            {ageConfirm && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <Text style={styles.checkText}>I confirm I am 21 years of age or older.</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, (!allChecked || loading) && styles.buttonDisabled]}
          onPress={allChecked ? handleSignup : undefined}
          disabled={!allChecked || loading}
        >
          <Text style={styles.buttonText}>{loading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginLink}>Already have an account? <Text style={styles.loginLinkBold}>Sign In</Text></Text>
        </TouchableOpacity>
        <Text style={styles.disclaimer}>For entertainment and informational purposes only.</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  logo: {
    width: 180,
    height: 90,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  title: {
    color: '#C9A227',
    fontSize: 14,
    letterSpacing: 3,
    marginBottom: 30,
    fontFamily: 'Inter_700Bold',
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
    marginBottom: 14,
    fontFamily: 'Inter_400Regular',
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: 14,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 1,
    borderColor: '#C9A227',
    borderRadius: 4,
    marginRight: 12,
    marginTop: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  checkboxChecked: {
    backgroundColor: '#C9A227',
  },
  checkmark: {
    color: '#0A0A0A',
    fontSize: 14,
    fontFamily: 'Inter_700Bold',
  },
  checkText: {
    color: '#AAAAAA',
    fontSize: 13,
    flex: 1,
    lineHeight: 20,
    fontFamily: 'Inter_400Regular',
  },
  button: {
    width: '100%',
    backgroundColor: '#C9A227',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  buttonDisabled: {
    opacity: 0.4,
  },
  buttonText: {
    color: '#0A0A0A',
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
    letterSpacing: 2,
  },
  loginLink: {
    color: '#666',
    fontSize: 14,
    marginBottom: 30,
    fontFamily: 'Inter_400Regular',
  },
  loginLinkBold: {
    color: '#C9A227',
    fontFamily: 'Inter_700Bold',
  },
  disclaimer: {
    color: '#444',
    fontSize: 11,
    textAlign: 'center',
    fontFamily: 'Inter_400Regular',
  },
});