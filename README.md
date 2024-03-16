# Nexpress-API

a package or tool designed to create APIs using the Express framework in web application development with Node.js. This emphasizes the package's focus on building APIs using Express as a backend framework.

![Nexpress API](https://github.com/ferlanferlani/nexpress-api/assets/87635305/eae6e6fa-8cc0-4cb7-a981-c399859565cc)


## Guide

To get started using this project, follow the steps below:

1. **Clone Repository**:
   Get a copy of the project by running the following command:

   ```bash
   git clone https://github.com/ferlanferlani/nexpress-api.git
   ```

   or

   ```bash
   npm install nexpress-api
   ```

2. **Install Dependencies**:
   Navigate to the project directory and run the following command to install dependencies:

   ```bash
   cd nexpress-api
   npm install
   ```

3. **Configure Database**:
### Configure Database

Sebelum menjalankan aplikasi, Anda perlu mengatur beberapa hal terlebih dahulu:

1. **App Password Gmail**: Aplikasi ini menggunakan nodemailer untuk melakukan otentikasi dengan verifikasi email. Sebelumnya, pastikan untuk membuat App Password di akun Google Anda. Anda dapat melakukan hal ini dengan mengikuti langkah-langkah berikut:

    a. Masuk ke [pengaturan akun Google](https://myaccount.google.com/).
    
    b. Pilih "Keamanan" di sisi kiri.
    
    c. Di bawah "Masuk ke Google", cari opsi "Password Aplikasi".
    
    d. Klik "Pilih aplikasi" dan pilih "Lainnya".
    
    e. Beri nama untuk aplikasi, misalnya "Aplikasi Email ProyekX".
    
    f. Setelah mendapatkan password aplikasi, atur di bagian file `.env` seperti ini:

    ```bash
    EMAIL=youremail@gmail.com
    PASSWORD=yourpasswordapp  
    ```

2. **MongoDB Database**: Aplikasi ini menggunakan MongoDB sebagai database-nya. Anda perlu membuat database terlebih dahulu. Anda dapat membuatnya di [MongoDB Cloud](https://cloud.mongodb.com/).

3. **Generate Database**: Sekarang, jalankan perintah berikut di terminal proyek Anda untuk menghasilkan database. Di sini, Prisma ORM digunakan untuk berinteraksi dengan database:

    ```bash
    npx prisma generate
    ```

Pastikan Anda telah mengatur semua konfigurasi dengan benar sebelum menjalankan aplikasi. Jika ada pertanyaan lebih lanjut, jangan ragu untuk bertanya!


4. **Starting Application**:
   Once the installation is complete, you can start the project by running the following command:

   ```bash
   npm run nexrepss
   ```

   ## Happy Hacking
