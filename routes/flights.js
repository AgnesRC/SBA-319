import express from 'express'

import flightController from '../controllers/flights.js'

const router = express.Router()

router.get('/', flightController.index)
router.delete('/:id', flightController.delete)
router.put('/:id', flightController.update)
router.post('/create', flightController.create)
router.get('/seed', flightController.seed)
router.post('/test-invalid-flight', flightController.test)

flightController.createIndex();

export default router