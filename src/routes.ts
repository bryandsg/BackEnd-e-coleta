import express from 'express';
import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';
import multer from 'multer';
import multerConfig from './config/multer';
import { celebrate, Joi } from 'celebrate';
const router = express.Router();
const upload = multer(multerConfig);



const pointsController = new PointsController();
const itemsController = new ItemsController();
router.get('', (request, response) => {
    return response.json({message: "W o r k s!"});
}); 

router.get('/items', itemsController.index); 

router.post(
    '/points',
    upload.single('image'),
    celebrate({
        body: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            phone: Joi.string().required(),
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
            uf: Joi.string().required().length(2),
            city: Joi.string().required(),
            items: Joi.string().required()
        })
    }, { 
        abortEarly: false 
        }),
    pointsController.create
  ); 
router.get('/points', pointsController.index); 
router.get('/points/:id', pointsController.show); 

export default router;
