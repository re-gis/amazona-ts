import express from 'express'
export const keyRouter = express.Router()

keyRouter.get('/paypal', (req, res) => {
    return res.status(200).json({ clientId: process.env.PAYPAL_CLIENT_ID || 'sb'})
})


