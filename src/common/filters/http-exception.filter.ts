import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException) // determinamos o tipo de exceção que iremos tratar
export class HttpExceptionFilter<T extends HttpException>
  implements ExceptionFilter
{
  catch(exception: T, host: ArgumentsHost) {
    // host param q contem a info da requisição
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>(); // importa o response do express e com isso podemos enviar uma resposta apropriada

    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse(); // geralmente o padrão é 500

    const error =
      typeof response === 'string'
        ? { message: exceptionResponse }
        : (exceptionResponse as object); // força como objeto para conseguir dar spread no error

    response.status(status).json({
      ...error,
      timestamp: new Date().toISOString(),
    });
  }
}
