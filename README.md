# Blog app API (NestJS dengan MySQL dan Prisma)
 
Proyek ini adalah contoh aplikasi REST API management blog sederhana menggunakan NestJS, Prisma, MySQL, dan otentikasi JWT.

## Ringkasan

Aplikasi menyediakan endpoint untuk:

- membuat user baru
- login menggunakan username/password
- mengeluarkan token JWT
- membuat dan menampilkan post yang terkait dengan user
- hanya user yang terautentikasi dapat mengakses data yang dilindungi

Semua data disimpan dalam database MySQL dengan model utama `User` dan `Post`.

## Fitur utama

- Otentikasi JWT dengan `@nestjs/jwt` dan `passport-jwt`
- Database MySQL menggunakan Prisma ORM
- Validasi request payload menggunakan `class-validator`
- Proteksi route dengan `AuthGuard('jwt')`
- Struktur modul NestJS terpisah untuk `auth`, `users`, dan `posts`
- Dokumentasi API otomatis dengan Swagger/OpenAPI
- Tes end-to-end dengan `jest` dan `supertest`

## Teknologi yang digunakan

- `Node.js`
- `NestJS`
- `TypeScript`
- `Prisma`
- `MySQL`
- `JWT`
- `Swagger/OpenAPI`
- `class-validator`
- `passport`
- `jest`
- `supertest`

## Struktur folder penting

- `src/app.module.ts` - konfigurasi root NestJS, termasuk Prisma dan env
- `src/main.ts` - entry point aplikasi
- `src/auth` - modul autentikasi JWT
- `src/users` - modul registrasi dan daftar user
- `src/posts` - modul buat dan ambil post
- `src/prisma` - konfigurasi Prisma dan provider `PrismaService`
- `test` - tes end-to-end

## Instalasi

1. Pasang dependensi:

```bash
npm install
```

2. Buat file `.env` dengan URL koneksi MySQL:

```text
DATABASE_URL="mysql://root:password@localhost:3306/nestjs"
```

3. Hasilkan client Prisma dan sinkronkan skema:

```bash
npx prisma generate
npx prisma db push
```

4. Jalankan aplikasi dalam mode pengembangan:

```bash
npm run start:dev
```

5. Buka browser atau API client di:

```text
http://localhost:3000
```

## Dokumentasi API dengan Swagger

Aplikasi ini dilengkapi dengan dokumentasi API interaktif menggunakan Swagger/OpenAPI.

Setelah aplikasi berjalan, buka dokumentasi Swagger di:

```text
http://localhost:3000/api
```

Di halaman Swagger, Anda dapat:

- Melihat semua endpoint API yang tersedia
- Membaca deskripsi dan parameter setiap endpoint
- Mencoba endpoint langsung dari UI (terutama berguna dengan token JWT)
- Melihat format response dan error handling

**Menggunakan token JWT di Swagger:**

1. Daftar user baru melalui endpoint `POST /users`
2. Login melalui endpoint `POST /auth/login`
3. Salin token JWT dari response
4. Klik tombol **Authorize** di halaman Swagger
5. Masukkan token dengan format: `Bearer <your_jwt_token>`
6. Sekarang Anda bisa mencoba endpoint yang memerlukan autentikasi

## Konfigurasi database

Aplikasi sekarang menggunakan MySQL melalui Prisma. Koneksi dikonfigurasi dari env var `DATABASE_URL`.

Contoh `DATABASE_URL`:

```text
mysql://root:password@localhost:3306/nestjs
```

> Pastikan MySQL berjalan dan database tujuan sudah dibuat atau dapat dibuat oleh Prisma.

## Konfigurasi JWT

JWT dikonfigurasi di `src/auth/auth.module.ts` dengan secret di `src/auth/constants.ts`:

- secret: `superSecretKey123`
- token berlaku selama `1h`

> Untuk produksi, ganti `jwtConstants.secret` dengan kunci rahasia yang lebih kuat dan jangan simpan di kode sumber.

## Endpoint API

### 1. Daftar user baru

- Endpoint: `POST /users`
- Request body:

```json
{
  "username": "nama_user",
  "password": "password123"
}
```

- Validasi:
  - `username` wajib diisi
  - `password` wajib diisi dan minimal 6 karakter

- Response: data user yang dibuat (termasuk `id`)

### 2. Login dan dapatkan token JWT

- Endpoint: `POST /auth/login`
- Request body:

```json
{
  "username": "nama_user",
  "password": "password123"
}
```

- Response:

```json
{
  "access_token": "<jwt_token>"
}
```

### 3. Ambil semua post user yang sedang login

- Endpoint: `GET /posts`
- Header:

```text
Authorization: Bearer <jwt_token>
```

- Response: daftar post pengguna yang login, lengkap dengan data user terkait

### 4. Buat post baru

- Endpoint: `POST /posts`
- Header:

```text
Authorization: Bearer <jwt_token>
```

- Request body:

```json
{
  "title": "Judul Post",
  "content": "Isi konten post"
}
```

- Response: data post yang baru dibuat

### 5. Ambil semua user

- Endpoint: `GET /users`
- Header:

```text
Authorization: Bearer <jwt_token>
```

- Response: daftar semua user beserta post mereka

## Detail implementasi

- `UsersController` menyediakan endpoint pendaftaran user dan daftar user.
- `AuthController` menyediakan endpoint login JWT.
- `PostsController` melindungi semua route dengan `AuthGuard('jwt')`.
- `PostsService` menulis dan membaca data post menggunakan Prisma.
- `AuthService` memvalidasi username/password dengan data dari `UsersService`.

## Menjalankan tes

```bash
npm run test:e2e
```

Tes ini sudah menggunakan konfigurasi di `test/jest-e2e.json` untuk memastikan endpoint JWT dan route terlindungi berjalan dengan benar.

## Catatan penting

- Password saat ini disimpan dalam bentuk plaintext di database. Ini hanya untuk contoh demo.
- Untuk produksi, gunakan hashing password yang aman dan manajemen secret JWT yang tepat.

- Untuk aplikasi nyata, gunakan hashing password seperti `bcrypt` dan simpan secret JWT di environment variable.
- Pastikan file `.env` tidak dikomit ke repository dan gunakan `.env.example` sebagai template konfigurasi.
- Gunakan Prisma Migrate atau backup database ketika memindahkan schema di lingkungan produksi.

