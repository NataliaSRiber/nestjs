import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

export type PrismaClientError = PrismaClientKnownRequestError & {
  meta?: { target: string }; // deve considerar isso na tipagem também
  // como se somasse o que esta dentor do objeto
}; // verificara o tipo de erro, particularidade do prisma
