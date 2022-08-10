import { UniqueConstraintError } from 'sequelize/dist';
import { dataBaseError } from '../types/DatabaseError';
import { PrismaClientError } from '../types/PrismaClientError';

// arquivo para manipular os error do database
enum PrismaErrors {
  UniqueConstraintFail = 'P2002',
}

export const handleDataBaseErrors = (e: PrismaClientError): Error => {
  switch (e.code) {
    case PrismaErrors.UniqueConstraintFail:
      return new UniqueConstraintError(e);

    default:
      return new dataBaseError(e.message);
  }
};
