import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // Setup Swagger
  const config = new DocumentBuilder()
    .setTitle('Blog API - NestJS REST API')
    .setDescription(
      `Aplikasi REST API management blog sederhana yang dibangun dengan NestJS, Prisma, MySQL, dan JWT authentication.

**Fitur Utama:**
- Autentikasi pengguna dengan JWT
- Sistem manajemen user (registrasi, update, delete)
- Sistem manajemen blog post
- Validasi request yang ketat
- Database MySQL menggunakan Prisma ORM

**Alur Penggunaan:**
1. Registrasi user baru di endpoint POST /users
2. Login dengan username dan password di endpoint POST /auth/login
3. Gunakan JWT token yang diperoleh untuk mengakses endpoint yang dilindungi
4. Tambahkan token di header: \`Authorization: Bearer <token>\`

**Endpoint Groups:**
- Auth: Login dan autentikasi user
- Users: Manajemen data pengguna
- Posts: Manajemen blog post milik user yang login`,
    )
    .setVersion('1.0.0')
    .setContact(
      'API Support',
      'https://github.com/your-repo',
      'support@example.com',
    )
    .setLicense('MIT', 'https://opensource.org/licenses/MIT')
    .addServer('http://localhost:3000', 'Development Server')
    .addServer('https://api.example.com', 'Production Server')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'JWT',
    )
    .addTag('auth', 'Autentikasi dan Login')
    .addTag('users', 'Manajemen Data Pengguna')
    .addTag('posts', 'Manajemen Blog Post')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
      operationsSorter: 'method',
    },
    customCss: `
      .topbar { display: none; }
      .swagger-ui .scheme-container { background: #fafafa; }
      .swagger-ui .info { margin: 20px 0; }
    `,
    customSiteTitle: 'Blog API Documentation',
  });

  await app.listen(3000);
  console.log('✅ Aplikasi berjalan di http://localhost:3000');
  console.log('📚 Dokumentasi Swagger tersedia di http://localhost:3000/api');
}
bootstrap();
