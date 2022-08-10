import { PrismaClientError } from '../types/PrismaClientError';

export const isPrismaError = (e: PrismaClientError) => {
  return (
    typeof e.code === 'string' &&
    typeof e.clientVersion === 'string' &&
    (typeof e.meta === 'undefined' || typeof e.meta === 'object')
  );
};

// função a ser chamada para verificar o tipo de erro gerado pelo prisma