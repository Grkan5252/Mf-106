const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

const supabase = require('./supabaseClient');

app.use(cors());

app.get('/', (req, res) => {
  res.send('Express sunucusu çalışıyor!');
});

app.get('/orders', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('id, product_name, users(name)')
      .order('id', { ascending: true });

    if (error) {
      console.error('Supabase Hatası:', error);
      return res.status(500).json({ error: 'Supabase veri hatası' });
    }

    const response = data.map(order => ({
      id: order.id,
      product: order.product_name,
      user: order.users ? order.users.name : 'Bilinmeyen Kullanıcı'
    }));

    res.json(response);
  } catch (err) {
    console.error('Sunucu Hatası:', err);
    res.status(500).json({ error: 'Sunucu hatası oluştu' });
  }
});

app.listen(port, () => {
  console.log(`API http://localhost:${port} adresinde çalışıyor.`);
});
