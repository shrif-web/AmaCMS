import ZarinPalCheckout from 'zarinpal-checkout';

let zarinpal = undefined
const getClient = () => {
    if (zarinpal === undefined) {
        zarinpal = ZarinPalCheckout.create(
            process.env.PAYMENT_MERCHANT,
            Boolean(Number(process.env.PAYMENT_MOCK))
        )

        zarinpal.PaymentRequ
    }
    return zarinpal
}

export default {
    getClient
}
