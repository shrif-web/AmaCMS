import zarinpal from "../../services/zarinpal.js"

export const request = (req, res) => {
    const client = zarinpal.getClient()
    client.PaymentRequest({
        Amount: '1000',
        CallbackURL: 'https://localhost/api/payment/verify',
        Description: 'A Payment from Node.JS',
        Email: 'hi@siamak.work',
        Mobile: '09120000000'
    }).then(response => {
        if (response.status === 100) {
            return res.redirect(response.url)
        }

        return res.status(400).json({
            message: "An error occured",
            code: response.status
        })
    })
}

export const verify = (req, res) => {
    const client = zarinpal.getClient()
    const status = req.query.Status;

    if (status == "OK") {
        const authority = req.query.Authority;
        if (authority === undefined) {
            return res.status(403).json({
                'message': 'Authority should be passed in query string'
            })
        }
        client.PaymentVerification({
            Amount: '1000',
            Authority: authority
        }).then(response => {
            if (response.status === 100) {
                return res.status(200).json({
                    'refId': response.RefID
                })
            }
    
            return res.status(400).json({
                message: "An error occured",
                code: response.status
            })
        })
    } else {
        res.status(400).json({
            message: 'FAILED|CANCELLED'
        })
    }
}
