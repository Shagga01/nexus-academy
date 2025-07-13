import { useState } from 'react';
import PayPalButton from '../components/PayPalButton';

export default function PayFees() {
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const savePayment = (paymentData) => {
    return fetch('/api/save-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(paymentData),
    }).then((res) => {
      if (!res.ok) throw new Error('Failed to save payment');
      return res.json();
    });
  };

  const payWithPaystack = () => {
    if (!window.PaystackPop) return alert('⚠ Paystack not loaded yet');
    if (!email || !amount) return alert('❌ Please enter a valid email & amount');
    setLoading(true);

    const handler = window.PaystackPop.setup({
      key: 'pk_live_5a99e730753c1db6b20b5e2bca226ea7473502e1',
      email,
      amount: parseFloat(amount) * 100,
      currency: 'NGN',
      callback: function (response) {
        savePayment({
          email,
          amount: parseFloat(amount),
          currency: 'NGN',
          method: 'Paystack',
          reference: response.reference,
        })
          .then(() => alert('✅ Payment saved. Ref: ' + response.reference))
          .catch((err) => {
            console.error(err);
            alert('⚠ Payment processed, but failed to save.');
          })
          .finally(() => setLoading(false));
      },
      onClose: function () {
        alert('❌ Paystack window closed');
        setLoading(false);
      },
    });
    handler.openIframe();
  };

  const payWithFlutterwave = () => {
    if (!window.FlutterwaveCheckout) return alert('⚠ Flutterwave not loaded yet');
    if (!email || !amount) return alert('❌ Please enter a valid email & amount');
    setLoading(true);

    window.FlutterwaveCheckout({
      public_key: 'FLWPUBK-f4155e7fce5b9bf0caa03fd477f7edf9-X',
      tx_ref: Date.now(),
      amount: parseFloat(amount),
      currency: 'NGN',
      payment_options: 'card,banktransfer,ussd',
      customer: { email },
      callback: function (data) {
        savePayment({
          email,
          amount: parseFloat(amount),
          currency: 'NGN',
          method: 'Flutterwave',
          reference: data.transaction_id,
        })
          .then(() => alert('✅ Payment saved. Tx ID: ' + data.transaction_id))
          .catch((err) => {
            console.error(err);
            alert('⚠ Payment processed, but failed to save.');
          })
          .finally(() => setLoading(false));
      },
      onclose: function () {
        alert('❌ Flutterwave window closed');
        setLoading(false);
      },
    });
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>Pay Your Fees</h1>

      <input
        type="email"
        placeholder="Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ display: 'block', margin: '1rem 0', width: '300px', padding: '8px' }}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{ display: 'block', margin: '1rem 0', width: '300px', padding: '8px' }}
      />

      <button onClick={payWithPaystack} disabled={loading}>
        Pay with Paystack
      </button>
      <button onClick={payWithFlutterwave} disabled={loading} style={{ marginLeft: '1rem' }}>
        Pay with Flutterwave
      </button>

      <div style={{ marginTop: '2rem' }}>
        <PayPalButton
          amount={parseFloat(amount) > 0 ? amount : '1'}
          onSuccess={(paymentData) => {
            setLoading(true);
            savePayment(paymentData)
              .then(() => alert('✅ Payment saved via PayPal. Ref: ' + paymentData.reference))
              .catch((err) => {
                console.error(err);
                alert('⚠ Payment processed, but failed to save.');
              })
              .finally(() => setLoading(false));
          }}
        />
      </div>
    </div>
  );
}
