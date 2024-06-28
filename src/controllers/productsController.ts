import { Request, Response } from 'express';
import Product from '../models/Product';

export const create = async (req: Request, res: Response) => {
  try {
    const product = await Product.create(req.body);
    return res.status(201).json(product);
  } catch (error: any) {
    return res.status(500).send({
      message: error.message,
    });
  }
};

export const get = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      throw new Error(`No existe el producto con el id ${req.params.id}`);
    }

    return res.json(product);
  } catch (error: any) {
    return res.status(404).json({
      message: error.message,
    });
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll({
      order: [['id', 'ASC']],
    });
    return res.json(products);
  } catch (error: any) {
    res.json({
      message: error.message,
    });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const product = await Product.findByPk(id);

    if (!product) {
      throw new Error(`No existe el producto con el id ${id}`);
    }

    await product.update(req.body);
    await product.save();

    return res.json(product);
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const updateStatus = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const product = await Product.findByPk(id);

    if (!product) {
      throw new Error(`No existe el producto con el id ${id}`);
    }

    product.availability = !product.availability;

    await product.update(req.body);
    await product.save();

    return res.json(product);
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const remove = await Product.destroy({
      where: { id },
    });

    if (!remove) {
      throw new Error(`No se encontro el producto con el id ${id}`);
    }

    return res.json({
      message: `Producto con el id ${id} eliminado correctamente`,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};
