import { useEffect, useRef } from 'react';

export default function PayPalButton({ amount, currency = 'USD', onSuccess }) {
  const paypalRef = useRef();

  useEffect(() => {
    if (window.paypal) {
      window.paypal
        .Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: amount.toString(),
                    currency_code: currency,
                  },
                },
              ],
            });
          },
          onApprove: (data, actions) => {
            return actions.order.capture().then((details) => {
              alert('✅ PayPal payment completed by ' + details.payer.name.given_name);
              console.log(details);
              if (onSuccess) {
                onSuccess({
                  email: details.payer.email_address,
                  amount: parseFloat(amount),
                  currency,
                  method: 'PayPal',
                  reference: details.id,
                });
              }
            });
          },
          onError: (err) => {
            console.error('PayPal Checkout onError', err);
            alert('❌ PayPal Error');
          },
        })
        .render(paypalRef.current);
    }
  }, [amount, currency, onSuccess]);

  return <div ref={paypalRef}></div>;
}
