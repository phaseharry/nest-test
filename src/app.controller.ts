import { Controller, Get, HttpCode, Post, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AppService } from './app.service';

// To create controllers, you can use the cli command
// nest g controller cats (to create a cats.controller.ts)
@Controller()
// required Controller that controls the request and response of a request
// can pass in an optional argument into controller to specify a path
// ex) @Controller('cats') would control requests that are prepended by "/cats".
// else if no parameter was passed it, it will be "/"
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Decorator for the "GET" request
  @Get() // gets called when the "/" path is hit. (Calls the getAllCats method)
  @HttpCode(201) // manually changing a response status code
  getAllCats(): string {
    return 'this gets all cats';
  }

  @Get('/@res') // for get request, default is 200
  usingRes(@Res() response: Response): Response {
    // injecting the response object from express to manually control it if we wish
    return response.send('using @res from express');
  }

  @Get('/hello') // gets called when the "/hello" path is hit
  getTest(): string {
    return this.appService.getHello();
  }

  @Post()
  createCat(): string {
    return 'post request used to create a new cat';
  }
}
