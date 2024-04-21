NestJS -> backend framework for better architechture

```
<!--! Why nest? -->
    Modularity
    Scalablity
    Structure
    Microservices
    REST API
    TypeScript
    GraphQL
    Documentation
    Popularity/community
```

```
<!--! What is Module -->
-> Its nothing but a class which is annotated by a @Module decorator.
-> Any module can import other modules,controllers and providers.
    <!--? CLI Command -> nest g module moduleName -->
```

```
<!--! Controllers  -->
Responsible for handling incoming requests and return responses to the clients.
Annotated by @Controller() decorator

<!--! Providers or Services -->
Responsible for executing the bussiness logic.
Annotated by @Injectable() decorator

    <!--? constructor(private authService: AuthService) {} -->
    By this way nestJS takes care of instatiating the authService inside the authController.
```

```
    NOTE: nestjs uses express under the hood.
```

```
PRISMA: It is a typeORM.

1- npx prisma init -> creates the Prisma folder, .env file and creates postgres connection string by default.
2- npx prisma studio -> creates a client to explore the db from browser
3- npx prisma migrate dev -> going to read the schema and generate migrations in the prisma folder. Pushes table automatically to db, also runs the npx prisma generate command.

4- npx prisma generate -> create typescript types for the schema. So we can directly use these types in our code from the @prisma/client

5- @Global() -> using this decorator in a module along with the exports property inside @Module decorator ensures that the module is available throughout the project, but make sure it is also imported in the root module i.e the AppModule.
```
