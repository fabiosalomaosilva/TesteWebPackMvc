# POC - Asp.Net MVC Core com Typescript


POC de aplicação construída em Asp.Net MVC Core 6.0 com Typescrpt, Node.js, Módulos NPM e Webpack.

# Se você quer usar o Visual Studio 2022, siga os seguintes passos:

Após clonar a aplicação. entrar na pasta do projeto MVC, abra o terminal e execute os seguintes comandos:

    $ npm install
    $ npm run api

Utilize o Visual Studio para executar normalmente sua aplicação.


# Se você quer usar o VS Code, siga os seguintes passos:

Abra 3 terminais na pasta do projeto MVC e execute os seguintes comandos:

    $ npm run api (caso ainda não tenha executado no passo anterior)
    $ npm run dev-watch
    $ dotnet run

# Desenvolvimento

- A estrutura de arquivos Typescript está localizada dentro da pasta src. E todos os novos arquivos que serão criados deverão estar nesta pasta.

- Todos os arquivos (módulos) que não estão importados em outros arquivos Typescript, deverão ser importados no entrypoint TS do projeto, que é o arquivo "src/index.ts" para que o webpack possa compilar.


  Espero que ajude.
