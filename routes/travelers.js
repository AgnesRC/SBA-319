import express from 'express'

import travelerController from '../controllers/travelers.js'

const router = express.Router()

router.get('/', travelerController.index)
router.delete('/:id', travelerController.delete)
router.put('/:id', travelerController.update)
router.post('/create', travelerController.create)
router.get('/seed', travelerController.seed)

travelerController.createIndex()

export default router