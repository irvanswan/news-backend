# Newsapp Backend
> for backend News web App from express.js, news web app showing post from user and we can comment, like, and save the article. join Now

[Front End](https://github.com/irvanswan/news-frontend)

## REQUIREMENT
1. Node JS v14.15.4
2. Postgre SQL (database management)

## LIBRARY
1.  Express JS
2.  library Multer (for uploading file)
3.  library Cors ( allows a server to indicate any other origins (domain, scheme, or port) than its own from which a browser should permit loading of resources)
4.  library dote env (for privately your settings configuration on database)
5.  library json web tokeb (for hasing data)
6.  library pg (for connect backend with pg admin)

## FOLDER FUNCTION

| Folder  | Function |
| ----- | --- |
| models   |  for processing data on database |
| controlers | for connect models and route  |
| routes | for routing the API  |
| helpers | for helping the API to processing data  |
| public/uploads | for handle upload file  |

## Folder Structure
```
 ├── controllers         
 │  ├── authController.js
 │  ├── categoryController.js
 │  ├── commentsController.js
 │  ├── newsController.js
 │  └── usersController.js
 ├── helpers            
 │  ├── config.js
 │  ├── formResponse.js
 │  ├── formUpload.js
 │  ├── hashing.js
 │  └── verifyToken.js
 ├── models
 |  ├── authModel.js 
 |  ├── commentsModel.js
 |  ├── newsModel.js
 |  ├── usersModel.js
 |  └── categoryModel.js
 ├── public
 │  ├── uploads  
 │  │  │── avatar
 │  │  │── category_poster
 │  │  │── poster
 ├── routes
 │   ├── auth.js
 │   ├── categories.js         
 │   ├── comments.js
 │   ├── index.js
 │   ├── news.js
 │   └── users.js
 └── .env
```
