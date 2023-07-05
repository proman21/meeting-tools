import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

if (import.meta.env.PROD) {
  // eslint-disable-next-line no-inner-declarations
  async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    await app.listen(3000)
  }
  bootstrap()
}

export const viteNodeApp = NestFactory.create(AppModule)
