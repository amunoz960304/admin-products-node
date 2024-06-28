import { Router } from 'express';
import {
  create,
  get,
  getAll,
  update,
  remove,
  updateStatus,
} from '../controllers/productsController';
import { body, check } from 'express-validator';
import requestValidator from '../middlewares/requestValidator';

const router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    Product:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          description: Product ID
 *          example: 1
 *        name:
 *          type: string
 *          description: Product name
 *          example: Monitor
 *        price:
 *          type: number
 *          description: Product price
 *          example: 1000
 *        available:
 *          type: boolean
 *          description: Product status
 *          example: true
 *        createdAt:
 *          type: datetime
 *          description: Product created at
 *          example: 2024-06-26
 *        updatedAt:
 *          type: datetime
 *          description: Product updated at
 *          example: 2024-06-26
 *    Message:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *          description: error message
 *          example:
 */

/**
 * @swagger
 * /api/products:
 *  post:
 *    summary: create a new product
 *    tags:
 *      - Products
 *    description: Return a product by id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                example: Monitor
 *              price:
 *                type: number
 *                example: Monitor
 *    responses:
 *      201:
 *        description: successful response
 *        content:
 *          application/json:
 *            schema:
 *                $ref: '#/components/schemas/Product'
 *      404:
 *        description: Not found error
 *        content:
 *          application/json:
 *            schema:
 *                $ref: '#/components/schemas/Message'
 */
router.post(
  '/',
  [
    body('name').notEmpty().withMessage('El nombre es obligatorio'),
    body('price')
      .isNumeric()
      .withMessage('Precio debe ser numerico')
      .notEmpty()
      .withMessage('El precio es obligatorio')
      .custom((value) => value > 0)
      .withMessage('El precio no es valido'),
    requestValidator,
  ],
  create
);

/**
 * @swagger
 * /api/products/{id}:
 *  get:
 *    summary: Get a product by id
 *    tags:
 *      - Products
 *    description: Return a product by id
 *    parameters:
 *      - in: path
 *        name: id
 *        description: The product ID
 *        required: true
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: successful response
 *        content:
 *          application/json:
 *            schema:
 *                $ref: '#/components/schemas/Product'
 *      404:
 *        description: Not found error
 *        content:
 *          application/json:
 *            schema:
 *                $ref: '#/components/schemas/Message'
 */
router.get(
  '/:id',
  [
    check('id').notEmpty().withMessage('El id es obligatorio'),
    requestValidator,
  ],
  get
);

/**
 * @swagger
 * /api/products:
 *  get:
 *    summary: Get a list of products
 *    tags:
 *      - products
 *    description: Return a list of products
 *    responses:
 *      200:
 *        description: successful response
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Product'
 */
router.get('/', getAll);

/**
 * @swagger
 * /api/products:
 *  put:
 *    summary: update a product
 *    tags:
 *      - Products
 *    description: update product by id
 *    parameters:
 *      - in: path
 *        name: id
 *        description: The product ID
 *        required: true
 *        schema:
 *          type: integer
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                example: Monitor
 *              price:
 *                type: number
 *                example: Monitor
 *              availability:
 *                type: boolean
 *                example: true
 *    responses:
 *      201:
 *        description: successful response
 *        content:
 *          application/json:
 *            schema:
 *                $ref: '#/components/schemas/Product'
 *      404:
 *        description: Not found error
 *        content:
 *          application/json:
 *            schema:
 *                $ref: '#/components/schemas/Message'
 */
router.put(
  '/:id',
  [
    check('id').notEmpty().withMessage('El id es obligatorio'),
    body('name').isString().withMessage('El nombre no debe estar vacio'),
    body('price').isNumeric().withMessage('Precio debe ser numerico'),
    body('availability')
      .isBoolean()
      .withMessage('La disponibilidad debe ser booleano'),
    requestValidator,
  ],
  update
);

/**
 * @swagger
 * /api/products/{id}:
 *  delete:
 *    summary: Delete product by id
 *    tags:
 *      - Products
 *    description: Delete a product by id
 *    parameters:
 *      - in: path
 *        name: id
 *        description: The product ID
 *        required: true
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: successful response
 *        content:
 *          application/json:
 *            schema:
 *                $ref: '#/components/schemas/Message'
 *      404:
 *        description: Not found
 *        content:
 *          application/json:
 *            schema:
 *                $ref: '#/components/schemas/Message'
 */
router.delete(
  '/:id',
  [
    check('id').notEmpty().withMessage('El id es obligatorio'),
    requestValidator,
  ],
  remove
);

router.patch(
  '/update-status/:id',
  [
    check('id').notEmpty().withMessage('El id es obligatorio'),
    requestValidator,
  ],
  updateStatus
);

export default router;
