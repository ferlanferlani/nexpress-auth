# Nexpress-API

a starter template designed to create APIs using the Express framework in web application development with Node.js which is integrated with email auth verification. This emphasizes the package's focus on building APIs using Express as a backend framework.

![Nexpress API](https://github.com/ferlanferlani/nexpress-api/assets/87635305/eae6e6fa-8cc0-4cb7-a981-c399859565cc)

To get started using this project, follow the steps below, Get a copy of the project by running the following command:

```bash
 git clone https://github.com/ferlanferlani/nexpress-api.git
```

**Install Dependencies**:
Navigate to the project directory and run the following command to install dependencies:

```bash
 cd nexpress-api
 npm install
```

Before running the application, you need to set a few things first:

1. **App Password Gmail**: This application uses nodemailer to authenticate with email verification. Beforehand, make sure to create an App Password on your Google account. You can do this by following these steps:

   a. Go to [Google account settings](https://myaccount.google.com/).

   b. Select "Security" on the left side.

   c. Under "Signing in to Google," look for the "App Passwords" option.

   d. Click "Select application" and select "More."

   e. Give the application a name, for example "ProjectX Email Application".

   f. After getting the application password, please create a `.env` file or you can also duplicate `.env.local`, change it to `.env` then fill it in like this:

   ```bash
   EMAIL=youremail@gmail.com
   PASSWORD=yourpasswordapp
   ```

   **Configure Database**:

2. **MongoDB Database**: This application uses MongoDB as its database. You need to create a database first. You can create it in [MongoDB Cloud](https://cloud.mongodb.com/).
   After you create it, go to the menu database->connect->drivers to take the database connection string, then paste it in the environment variable

   ```bash
   DATABASE_URL=yourconnectionstring
   ```

3. **Generate Database**: Now, run the following command in your project terminal to generate the database. Here, [Prisma ORM](https://www.prisma.io/). used to interact with the database:

   ```bash
   npx prism generate
   ```

Make sure you have set all configurations correctly before running the application. If you have further questions, don't hesitate to ask in the issue section or click [here!](https://github.com/ferlanferlani/nexpress-api/issues/1)

**Run it Locally**:
Once the installation is complete, you can start the project by running the following command:

```bash
npm run nexpress
```

**Author**:
nexpress is created by [ferlanferlani](https://ferlanferlani.rf.gd)

**Donate**:
if you have used this package and it is very useful and helpful to you, feel free to donate

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/ferlanferlani)
