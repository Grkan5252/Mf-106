import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import axios from 'axios';

type Order = {
  id: number;
  user: string;
  product?: string;
};

export default function App() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://192.168.1.114:3000/orders')
      .then(res => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log('API HATASI:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <ActivityIndicator style={styles.loader} size="large" color="#2f80ed" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📦 Sipariş Listesi</Text>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.user}>👤 {item.user}</Text>
            <Text style={styles.product}>🛍️ {item.product || 'Ürün yok'}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2f80ed',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Android için gölge
  },
  user: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  product: {
    fontSize: 16,
    color: '#666',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
