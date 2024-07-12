import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const swaggerConfig = new DocumentBuilder()
    .setTitle('WeatherAPI')
    .setVersion('1.0')
    .addTag('ApiTag')
    .setContact(
      'Samil',
      'https://samilabud.netlify.app/',
      'samilabud@gmail.com',
    )
    .addApiKey(
      { type: 'apiKey', name: 'samapi-key', in: 'header' },
      'samapi-key',
    )
    .build()
  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('api', app, document)

  app.enableCors()
  console.log('Server is running on http://localhost:8000')
  await app.listen(8000)
}
bootstrap()
