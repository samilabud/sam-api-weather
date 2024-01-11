import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'

@Injectable()
export class ApiKeyMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    const apiKey = req.headers['samapi-key']

    // Implement your API key validation logic here
    // Check if the provided API key is valid
    const isValid = apiKey === 'nextweatherwatch-123456'

    if (!isValid) {
      throw new UnauthorizedException('Invalid API key' + apiKey)
    }

    next()
  }
}
