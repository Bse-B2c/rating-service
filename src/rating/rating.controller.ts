import { RatingDto } from '@rating/dtos/rating.dtos';
import { Request, Response, NextFunction } from "express";
import { HttpStatusCode } from "@bse-b2c/common";
import { RatingService} from '@rating/interfaces/ratingService.interface';


export class RatingController{
    constructor(private service: RatingService){}

    create = async (req: Request, res: Response, next: NextFunction) =>{
        try {
            const { ratingScale, comment, date, authorId, productId, purchaseDate } = 
            req.body as RatingDto;

            const response = await this.service.create({
                ratingScale,
                comment,
                date,
                authorId,
                productId,
                purchaseDate,
            });

            return res.status(HttpStatusCode.CREATED).send({
                statusCode: HttpStatusCode.CREATED,
                error: null,
                data: response,
            });
        } catch (e) {
            next(e);
        }
    };

    findOne = async(req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;

            const response = await this.service.findOne(+id);

            return res.status(HttpStatusCode.OK).send({
                statusCode: HttpStatusCode.OK,
                error: null,
                data: response,
        });
            } catch (e) {
                next(e);
            }
        };

        delete = async(req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;

            const response = await this.service.delete(+id);
            
            return res.status(HttpStatusCode.OK).send({
                statusCode: HttpStatusCode.OK,
                error: null,
                data: response,
                
        });
    } catch (e) {
        next(e);
}
        };
    }