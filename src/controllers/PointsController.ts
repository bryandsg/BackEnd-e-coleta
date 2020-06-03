import { Request, Response } from 'express';
import knex from '../database/connection'

class PointsController {

    async create(request: Request, response: Response) {
        const {
            name,
            email,
            phone,
            latitude,
            longitude,
            city,
            uf,
            items
        } = request.body;
    
        const trx = await knex.transaction();
        
        const newPoint = {
            image: "mock",
            name,
            email,
            phone,
            latitude,
            longitude,
            city,
            uf
        };

       const insertedIds = await trx('points').insert(newPoint);
        let point_id = insertedIds[0]
        let pointItems = items.map((item_id: Number) => {
            return {
                item_id,
                point_id
            };
        });
    
        await trx('points_items').insert(pointItems);

        await trx.commit();

        return response.json({
            id: point_id,
            ...newPoint
        });
    }

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const point = await knex('points').where('id', id).first();

        if ( !point ){
            return response.status(400).json({menssage:'Point not found!'});

        }

        const items = await knex('items')
        .join('points_items', 'items.id', '=', 'points_items.item_id')
        .where('points_items.point_id', id)
        .select('items.title','items.image');

        return response.json({point, items});
    }

    async index( request: Request, response: Response) {
         const { city, uf, items } = request.query;

        const parsedItems = String(items).split(',').map(item => Number(item.trim()));

        const points = await knex('points')
        .join('points_items', 'points.id', '=', 'points_items.point_id')
        .whereIn('points_items.item_id', parsedItems)
        .where('city', String(city))
        .where('uf', String(uf))
        .distinct()
        .select('points.*');

        return response.json(points);

    }
}

export default PointsController;