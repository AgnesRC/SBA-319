import express from 'express'

import airportController from '../controllers/airports.js'

const router = express.Router()

router.get('/', airportController.index)
router.delete('/:id', airportController.delete)
router.put('/:id', airportController.update)
router.post('/create', airportController.create)
router.get('/seed', airportController.seed)

export default router