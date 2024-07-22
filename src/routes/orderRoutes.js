import express from 'express'

import{
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrder,
    deleteOrder,
    getUserOrder

} from '../controllers/orderController.js'

const orderRouter = express.Router()

orderRouter.post('/create-order',createOrder)
orderRouter.get('/orders',getAllOrders)
orderRouter.get('/orders/:id',getOrderById)
orderRouter.put('/update-order/:id',updateOrder)
orderRouter.delete('/delete-order/:id',deleteOrder)
orderRouter.get('/getUserOrder/:userId',getUserOrder)

export default orderRouter