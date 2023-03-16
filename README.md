## Backend Assignment for Intern at Pet Perfect
This repo cotains all the necessary links and commands to run the app on your local device as it is not deployed on any cloud platform.

### Notion Doc Link
[```https://raunakmandal.notion.site/Documentation-for-Pet-Perfect-Backend-Assessment-7d98f8b7198f4f1aa855b70d9cef136a```](https://raunakmandal.notion.site/Documentation-for-Pet-Perfect-Backend-Assessment-7d98f8b7198f4f1aa855b70d9cef136a)

### Run the App on Local Machine
1. First, clone/download the repo and open the `root` directory.
2. Now create a file called `.env` and put the poper values for these fields
    ```
    DB_NAME=your_db_name
    DB_USER=your_db_user_name
    DB_PASSWORD=your_db_password
    DB_HOST=localhost
    APP_PORT=8080
    SECRET_KEY=yourveryhardsecretkey
    ```
3. Once done, start the server with `npm start` and you can go through the various various endpoints mentioned in the [Notion doc](https://raunakmandal.notion.site/Documentation-for-Pet-Perfect-Backend-Assessment-7d98f8b7198f4f1aa855b70d9cef136a).
4. To test the app, run `npm run test`, but make sure to change the required fileds like Authorization token, id's for several endpoints, etc.

### Test Coverage Report
<img width="1440" alt="image" src="https://user-images.githubusercontent.com/45995056/225722038-96cb8381-b293-45a9-bbbb-7f9f2db0d105.png">
