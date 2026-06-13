# API NestJS dengan SQL dan JWT

Proyek ini adalah contoh aplikasi REST API sederhana menggunakan NestJS, TypeORM, SQLite, dan otentikasi JWT.

## Ringkasan

Aplikasi menyediakan endpoint untuk:

- membuat user baru
- login menggunakan username/password
- mengeluarkan token JWT
- membuat dan menampilkan post yang terkait dengan user
- hanya user yang terautentikasi dapat mengakses data yang dilindungi

Semua data disimpan dalam database SQLite lokal (`database.sqlite`) dan entitas utama adalah `User` dan `Post`.

## Fitur utama

- Otentikasi JWT dengan `@nestjs/jwt` dan `passport-jwt`
- Database SQLite menggunakan `TypeORM`
- Validasi request payload menggunakan `class-validator`
- Proteksi route dengan `AuthGuard('jwt')`
- Struktur modul NestJS terpisah untuk `auth`, `users`, dan `posts`
- Tes end-to-end dengan `jest` dan `supertest`

## Teknologi yang digunakan

- `Node.js`
- `NestJS`
- `TypeScript`
- `TypeORM`
- `SQLite`
- `JWT`
- `class-validator`
- `passport`
- `jest`
- `supertest`

## Struktur folder penting

- `src/app.module.ts` - konfigurasi root NestJS, termasuk TypeORM
- `src/main.ts` - entry point aplikasi
- `src/auth` - modul autentikasi JWT
- `src/users` - modul registrasi dan daftar user
- `src/posts` - modul buat dan ambil post
- `src/entities` - definisi model database untuk `User` dan `Post`
- `test` - tes end-to-end

## Instalasi

1. Pasang dependensi:

```bash
npm install
```

2. Jalankan aplikasi dalam mode pengembangan:

```bash
npm run start:dev
```

3. Buka browser atau API client di:

```text
http://localhost:3000
```

## Konfigurasi database

Aplikasi menggunakan SQLite dan konfigurasi TypeORM disiapkan di `src/app.module.ts`:

- `type: 'sqlite'`
- `database: 'database.sqlite'`
- `entities: [User, Post]`
- `synchronize: true`

> `synchronize: true` berarti TypeORM akan membuat/memperbarui skema database secara otomatis. Gunakan hanya untuk pengembangan.

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
- `PostsService` dapat menampilkan post berdasarkan user yang login.
- `AuthService` memvalidasi username/password dengan data dari `UsersService`.

## Menjalankan tes

```bash
npm run test:e2e
```

Tes ini sudah menggunakan konfigurasi di `test/jest-e2e.json` untuk memastikan endpoint JWT dan route terlindungi berjalan dengan benar.

## Catatan penting

- Password saat ini disimpan dalam bentuk plaintext di database. Ini hanya untuk contoh demo.
- Untuk aplikasi nyata, gunakan hashing password seperti `bcrypt` dan simpan secret JWT di environment variable.
- Pastikan `database.sqlite` ditambahkan ke `.gitignore` jika tidak ingin menyimpan file database di repository.

## Cara mengembangkan lebih lanjut

- Tambahkan hashing password sebelum menyimpan user
- Tambahkan refresh token untuk otentikasi JWT yang lebih baik
- Tambahkan pagination pada endpoint post
- Tambahkan peran user (`role`) untuk membatasi akses
- Ganti SQLite dengan PostgreSQL / MySQL untuk produksi
