import { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Image, KeyboardAvoidingView, Platform, Alert, ImageBackground
} from 'react-native';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { Ionicons } from '@expo/vector-icons';
import { auth } from '../firebaseConfig';

const GOLD = '#C9A227';
const BLACK = '#0A0A0A';

export default function LoginScreen({ onLogin, navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
    <ImageBackground
      source={require('../assets/stadium-bg.png')}
      style={styles.bg}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <KeyboardAvoidingView
        style={styles.inner}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Image
          source={require('../assets/logo.png')}
          style={{
            width: '100%',
            height: 500,
            resizeMode: 'contain',
            marginTop: 10,
            marginBottom: -60,
          }}
        />

        <View style={styles.formBlock}>
          <Text style={styles.tagline}>SPORTS ANALYSIS & PICKS</Text>

          <Text style={styles.fieldLabel}>EMAIL</Text>
          <View style={styles.inputRow}>
            <Ionicons name="mail-outline" size={16} color={GOLD} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="#555"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <Text style={styles.fieldLabel}>PASSWORD</Text>
          <View style={styles.inputRow}>
            <Ionicons name="lock-closed-outline" size={16} color={GOLD} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor="#555"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={16} color="#666" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={handleForgotPassword} style={styles.forgotWrap}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loading}>
            <Text style={styles.loginButtonText}>{loading ? 'SIGNING IN...' : 'SIGN IN'}</Text>
          </TouchableOpacity>

          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.signupLink}>
              Don't have an account? <Text style={styles.signupLinkBold}>Sign Up</Text>
            </Text>
          </TouchableOpacity>

          <View style={styles.trustRow}>
            {[
              { icon: 'shield-checkmark-outline', title: 'VERIFIED EXPERTS', sub: 'Top performing\nverified cappers' },
              { icon: 'stats-chart-outline', title: 'REAL-TIME RESULTS', sub: 'Live tracking\nyou can trust' },
              { icon: 'lock-closed-outline', title: 'SECURE & PRIVATE', sub: 'Your data is always\nprotected' },
            ].map((b) => (
              <View key={b.title} style={styles.trustBadge}>
                <Ionicons name={b.icon as any} size={20} color={GOLD} />
                <Text style={styles.trustTitle}>{b.title}</Text>
                <Text style={styles.trustSub}>{b.sub}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.disclaimer}>
            For entertainment and informational purposes only. 18+ Please play responsibly.
          </Text>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: BLACK,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  inner: {
    flex: 1,
    alignItems: 'center',
   justifyContent: 'flex-end',
  },
  formBlock: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  tagline: {
    color: GOLD,
    fontSize: 11,
    letterSpacing: 3,
    marginBottom: 12,
    fontFamily: 'Oswald_400Regular',
  },
  fieldLabel: {
    alignSelf: 'flex-start',
    color: GOLD,
    fontSize: 10,
    fontFamily: 'Oswald_600SemiBold',
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'rgba(26,26,26,0.92)',
    borderColor: '#2A2A2A',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 14,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#FFF',
    fontSize: 14,
    paddingVertical: 11,
  },
  forgotWrap: {
    alignSelf: 'flex-end',
    marginBottom: 12,
  },
  forgotText: {
    color: GOLD,
    fontSize: 12,
    fontFamily: 'Oswald_400Regular',
  },
  loginButton: {
    width: '100%',
    backgroundColor: GOLD,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  loginButtonText: {
    color: BLACK,
    fontSize: 15,
    fontFamily: 'Oswald_700Bold',
    letterSpacing: 2,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#2A2A2A',
  },
  dividerText: {
    color: '#555',
    fontSize: 11,
    marginHorizontal: 10,
    fontFamily: 'Oswald_400Regular',
  },
  signupLink: {
    color: '#AAA',
    fontSize: 13,
    marginBottom: 12,
    fontFamily: 'Oswald_400Regular',
  },
  signupLinkBold: {
    color: GOLD,
    fontFamily: 'Oswald_700Bold',
  },
  trustRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  trustBadge: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  trustTitle: {
    color: '#FFF',
    fontSize: 8,
    fontFamily: 'Oswald_700Bold',
    letterSpacing: 0.5,
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 2,
  },
  trustSub: {
    color: '#FFF',
    fontSize: 9,
    textAlign: 'center',
    lineHeight: 13,
  },
  disclaimer: {
    color: '#FFF',
    fontSize: 10,
    textAlign: 'center',
    lineHeight: 16,
  },
});