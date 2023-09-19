export type IOrder = {
  id: string;
  userId: string;
  status: string;
  orderedBooks: { bookId: string; quantity: number }[];
  createdAt?: Date
  updatedAt?: Date
};
