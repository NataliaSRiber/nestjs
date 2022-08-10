// import {
//   Injectable,
//   NestInterceptor,
//   ExecutionContext,
//   CallHandler,
//   BadRequestException,
// } from '@nestjs/common';
// import { catchError, Observable } from 'rxjs';
// import { DatabaseError } from 'sequelize/dist';
// import { handleDataBaseErrors } from '../utils/handle-database-errors.util';
// import { isPrismaError } from '../utils/is-prisma-error-util';

// @Injectable()
// export class DataBaseInterceptor implements NestInterceptor {
//   intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
//     return next.handle().pipe(
//       catchError((error) => {
//         if (isPrismaError(error)) {
//           // se é um erro prisma é enviado para o handleDatabaseError que verifica qual o tipo de erro
//           error = handleDataBaseErrors(error);
//         }
//         if (error instanceof DatabaseError) {
//           throw new BadRequestException(error.message);
//         } else {
//           throw error;
//         }
//       }),
//     );
//   }
// }
