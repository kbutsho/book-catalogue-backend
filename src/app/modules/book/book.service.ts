import { Book, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { IBook, IBookFilter, bookSearchableFields } from './book.interface';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const createBook = async (data: Book): Promise<IBook | null> => {
  const isExist = await prisma.book.findFirst({ where: { title: data.title } });
  if (isExist) {
    throw new Error('Book already exists!');
  }
  data.publicationDate = new Date(data.publicationDate);
  const result = await prisma.book.create({
    data,
    include: { category: { select: { id: true, title: true } } },
  });
  return result;
};

const getAllBook = async (filters: IBookFilter, options: IPaginationOptions): Promise<IGenericResponse<Book[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { search, minPrice, maxPrice, category, ...filterData } = filters;
  const andConditions = [];
  if (search) {
    andConditions.push({
      OR: bookSearchableFields.map(field => ({
        [field]: {
          contains: search,
          mode: 'insensitive',
        },
      })),
    });
  }
  if (minPrice !== undefined) {
    andConditions.push({
      price: {
        gte: parseFloat(minPrice.toString()),
      },
    });
  }
  if (maxPrice !== undefined) {
    andConditions.push({
      price: {
        lte: parseFloat(maxPrice.toString()),
      },
    });
  }
  if (category !== undefined) {
    andConditions.push({
      categoryId: {
        equals: category
      }
    })
  }
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }
  const whereConditions: Prisma.BookWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
  const result = await prisma.book.findMany({
    include: {
      category: { select: { id: true, title: true } },
      reviews: true,
    },
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {},
  });
  const total = await prisma.book.count({
    where: whereConditions
  });
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result
  };
};

const getBooksByCategoryId = async (categoryId: string, options: IPaginationOptions): Promise<IGenericResponse<Book[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const result = await prisma.book.findMany({
    include: {
      category: { select: { id: true, title: true } },
      reviews: true,
    },
    where: { categoryId: categoryId },
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {},
  });
  if (result === null) {
    throw new ApiError(httpStatus.NOT_FOUND, "book not found!")
  }
  const total = await prisma.book.count({
    where: { categoryId: categoryId }
  });
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result
  };
};

const getBookById = async (id: string): Promise<Book | null> => {
  const result = await prisma.book.findUnique({
    where: { id: id }, include: {
      category: { select: { id: true, title: true } },
      reviews: true,
    },
  });
  if (result === null) {
    throw new ApiError(httpStatus.NOT_FOUND, "book not found!")
  }
  return result;
};

const updateBook = async (id: string, data: IBook): Promise<Book> => {
  const result = await prisma.book.update({ where: { id: id }, data });
  return result;
};
const deleteBook = async (id: string): Promise<Book> => {
  const result = await prisma.book.delete({ where: { id: id } });
  return result;
};

export const BookService = {
  createBook,
  getAllBook,
  getBookById,
  updateBook,
  deleteBook,
  getBooksByCategoryId
};
