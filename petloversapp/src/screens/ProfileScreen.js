import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Switch,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFavorites } from '../context/FavoritesContext';

export default function ProfileScreen() {
  const { favorites } = useFavorites();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [emailAlerts, setEmailAlerts] = useState(false);

  function SettingRow({ icon, iconColor = '#FF8C42', label, sublabel, rightElement, onPress }) {
    return (
      <TouchableOpacity style={styles.settingRow} onPress={onPress} disabled={!onPress}>
        <View style={[styles.settingIcon, { backgroundColor: iconColor + '20' }]}>
          <Ionicons name={icon} size={20} color={iconColor} />
        </View>
        <View style={styles.settingText}>
          <Text style={styles.settingLabel}>{label}</Text>
          {sublabel && <Text style={styles.settingSubLabel}>{sublabel}</Text>}
        </View>
        {rightElement || (onPress && <Ionicons name="chevron-forward" size={18} color="#ccc" />)}
      </TouchableOpacity>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Avatar */}
      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>🐾</Text>
        </View>
        <Text style={styles.profileName}>Bem-vindo ao PetLovers!</Text>
        <Text style={styles.profileSub}>Faça parte dessa corrente do bem</Text>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statNum}>{favorites.length}</Text>
            <Text style={styles.statLabel}>Favoritos</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNum}>0</Text>
            <Text style={styles.statLabel}>Adoções</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNum}>12</Text>
            <Text style={styles.statLabel}>Pets vistos</Text>
          </View>
        </View>
      </View>

      {/* Notificações */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notificações</Text>
        <View style={styles.card}>
          <SettingRow
            icon="notifications"
            iconColor="#FF8C42"
            label="Notificações Push"
            sublabel="Receba alertas de novos pets"
            rightElement={
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ true: '#FF8C42' }}
                thumbColor="#fff"
              />
            }
          />
          <View style={styles.divider} />
          <SettingRow
            icon="mail"
            iconColor="#4A90E2"
            label="Alertas por E-mail"
            sublabel="Novidades da ONG por e-mail"
            rightElement={
              <Switch
                value={emailAlerts}
                onValueChange={setEmailAlerts}
                trackColor={{ true: '#4A90E2' }}
                thumbColor="#fff"
              />
            }
          />
        </View>
      </View>

      {/* Aparência */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Aparência</Text>
        <View style={styles.card}>
          <SettingRow
            icon="moon"
            iconColor="#7B61FF"
            label="Modo Escuro"
            sublabel="Tema escuro para o app"
            rightElement={
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{ true: '#7B61FF' }}
                thumbColor="#fff"
              />
            }
          />
        </View>
      </View>

      {/* Sobre */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sobre o App</Text>
        <View style={styles.card}>
          <SettingRow
            icon="heart"
            iconColor="#FF6B6B"
            label="Nossa Missão"
            sublabel="Conectar pets e famílias"
            onPress={() =>
              Alert.alert(
                '🐾 Nossa Missão',
                'O Petlovers conecta animais que precisam de um lar com famílias amorosas. Cada adoção é uma vida transformada!'
              )
            }
          />
          <View style={styles.divider} />
          <SettingRow
            icon="call"
            iconColor="#4CAF50"
            label="Contato"
            sublabel="petLovers@email.com"
            onPress={() => Alert.alert('Contato', 'petLovers@email.com\n(81) 99999-0000')}
          />
          <View style={styles.divider} />
          <SettingRow
            icon="information-circle"
            iconColor="#888"
            label="Versão"
            sublabel="PetLovers v1.0.0"
          />
        </View>
      </View>

      {/* Sobre adoção */}
      <View style={styles.section}>
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>💡 Como funciona a adoção?</Text>
          <Text style={styles.infoText}>
            1. Escolha um pet que tocou seu coração{'\n'}
            2. Toque em "Quero Adotar"{'\n'}
            3. Nossa equipe entrará em contato{'\n'}
            4. Visita e entrevista de adoção{'\n'}
            5. Seu novo companheiro vai para casa! 🏡
          </Text>
        </View>
      </View>

      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  profileCard: {
    backgroundColor: '#1A1A2E',
    margin: 16,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FF8C42',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarText: { fontSize: 36 },
  profileName: { fontSize: 20, fontWeight: '800', color: '#fff', marginBottom: 4 },
  profileSub: { fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 20 },
  statsRow: { flexDirection: 'row', width: '100%', justifyContent: 'space-around' },
  statItem: { alignItems: 'center' },
  statNum: { fontSize: 24, fontWeight: '900', color: '#FF8C42' },
  statLabel: { fontSize: 11, color: 'rgba(255,255,255,0.6)', marginTop: 2 },
  statDivider: { width: 1, backgroundColor: 'rgba(255,255,255,0.15)' },
  section: { marginHorizontal: 16, marginTop: 16 },
  sectionTitle: { fontSize: 13, fontWeight: '700', color: '#888', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    gap: 14,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingText: { flex: 1 },
  settingLabel: { fontSize: 15, fontWeight: '600', color: '#1A1A2E' },
  settingSubLabel: { fontSize: 12, color: '#aaa', marginTop: 1 },
  divider: { height: 1, backgroundColor: '#F5F5F5', marginLeft: 68 },
  infoBox: {
    backgroundColor: '#FFF3E8',
    borderRadius: 16,
    padding: 18,
    borderLeftWidth: 4,
    borderLeftColor: '#FF8C42',
  },
  infoTitle: { fontSize: 16, fontWeight: '800', color: '#1A1A2E', marginBottom: 10 },
  infoText: { fontSize: 14, color: '#555', lineHeight: 24 },
});
