import { Category } from '@prisma/client';
import prisma from '../../../shared/prisma';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const createCategory = async (data: Category): Promise<Category> => {
  const isExist = await prisma.category.findFirst({ where: { title: data.title } });
  if (isExist) {
    throw new Error('title already exist!');
  }
  const result = await prisma.category.create({ data });
  return result;
};

const getAllCategory = async (): Promise<Category[]> => {
  const result = await prisma.category.findMany({ include: { books: true } });
  return result;
};

const categoryById = async (id: string): Promise<Category | null> => {
  const result = await prisma.category.findFirst({ where: { id: id }, include: { books: true } })
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'category not found!')
  }
  return result;
};

const updateCategory = async (id: string, data: Category): Promise<Category> => {
  const result = await prisma.category.update({ where: { id: id }, data });
  return result;
};

const deleteCategory = async (id: string): Promise<Category> => {
  const result = await prisma.category.delete({ where: { id: id } });
  return result;
};

export const CategoryService = {
  createCategory,
  getAllCategory,
  categoryById,
  updateCategory,
  deleteCategory
};
