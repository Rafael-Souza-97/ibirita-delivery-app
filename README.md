![iBirita](https://user-images.githubusercontent.com/99055008/226148750-d1b974b7-bbf6-4325-8553-a7c36bc09347.png)

Bem-vindo(a) ao iBirita, um aplicativo de delivery de bebidas completo e fácil de usar! Com o iBirita, você pode escolher entre uma grande variedade de bebidas e recebê-las diretamente na sua porta.

O iBirita foi desenvolvido por uma equipe de 5 pessoas dedicadas a fornecer a melhor experiência de compra online para seus usuários. Utilizando tecnologias modernas, o aplicativo inclui telas de login e cadastro para seus clientes, vendedores e administradores, bem como uma seleção de produtos, checkout e rastreamento de pedidos.

Além de ser uma opção conveniente para dispositivos móveis, o iBirita também pode ser usado em PCs. Isso permite que você faça seus pedidos diretamente do seu computador, sem precisar alternar entre diferentes dispositivos. Compatibilidade com dispositivos móveis e desktop é uma das nossas principais prioridades, garantindo que você possa acessar e utilizar o iBirita de qualquer lugar e em qualquer dispositivo.

Com o iBirita, nunca foi tão fácil pedir uma bebida. Experimente agora mesmo!

<br>

## Rotas

O aplicativo possui as seguintes rotas:

- `/` - Rota raiz da aplicação, redireciona o usuário para a página de login.

- `/login` - Rota para o login do usuário. A página de login apresenta um formulário de login onde o usuário deve inserir seu e-mail e senha para acessar a plataforma.

- `/register` - Rota para o registro de novos usuários. A página de registro apresenta um formulário de cadastro onde o usuário deve inserir informações como nome, e-mail, senha e endereço.

- `/customer/products` - Rota para a lista de produtos disponíveis para compra pelos clientes. A página apresenta uma lista de produtos com suas respectivas informações como nome, preço, descrição e imagem. O usuário pode adicionar os produtos ao carrinho de compras.

- `/customer/checkout` - Rota para o carrinho de compras e finalização de pedidos. A página apresenta os produtos adicionados ao carrinho de compras pelo usuário, onde é possível visualizar os detalhes dos produtos e finalizar o pedido.

- `/customer/orders` - Rota para a lista de pedidos realizados pelo cliente. A página apresenta uma lista de todos os pedidos realizados pelo usuário, onde é possível visualizar as informações sobre o pedido e seu status.

- `/customer/orders/:id` - Rota para os detalhes de um pedido específico. A página apresenta todas as informações sobre um pedido específico, incluindo informações do produto, preço, quantidade, endereço de entrega e status do pedido.

- `/seller/orders` - Rota para a lista de pedidos realizados pelos clientes e que aguardam atendimento pelo vendedor. A página apresenta uma lista de todos os pedidos que ainda não foram atendidos pelo vendedor, onde é possível visualizar as informações sobre o pedido e seu status.

- `/seller/orders/:id` - Rota para os detalhes de um pedido específico que aguarda atendimento pelo vendedor. A página apresenta todas as informações sobre um pedido específico, incluindo informações do produto, preço, quantidade, endereço de entrega e status do pedido.

- `/admin/manage` - Rota para a página de gerenciamento da plataforma pelo administrador. A página apresenta diversas funcionalidades como gerenciamento de produtos, gerenciamento de usuários, entre outros.

- `*` - Rota para o tratamento de rotas não encontradas. Quando o usuário tenta acessar uma rota que não existe, ele é redirecionado para esta rota, apresentando uma mensagem informando que a rota não foi encontrada.

<br>

## Context API
O [ContextAPI](https://reactjs.org/docs/context.html) é uma das funcionalidades do [React](https://pt-br.reactjs.org/) que permite compartilhar dados entre componentes sem precisar passar `props` manualmente em cada nível da árvore de componentes. Vantagens do [ContextAPI](https://reactjs.org/docs/context.html):

- Reduz a necessidade de passar `props` manualmente em cada nível da árvore de componentes, tornando o código mais limpo e fácil de ler.
- Permite compartilhar dados em toda a árvore de componentes sem precisar se preocupar com a hierarquia dos componentes.
- Facilita a criação de temas personalizados, permitindo que os componentes tenham acesso a um tema global sem a necessidade de passá-lo manualmente em cada componente.
- Ajuda a manter o estado da aplicação em um único lugar, tornando mais fácil a manipulação e a atualização dos dados.
- Permite o uso de múltiplos contextos em uma única aplicação, tornando a organização e a estruturação da aplicação mais flexíveis.
- Melhora a performance da aplicação, uma vez que reduz a necessidade de atualizar vários componentes ao mesmo tempo.

<br>

## Arquitetura de Software MSC

Optamos por utilizar a arquitetura MSC. que é uma estrutura de design de software que divide um aplicativo em três componentes principais: Model, Service e Controller.

- `Model`: A camada Model é a representação de um objeto no banco de dados, com seus atributos e relacionamentos. Ela lida com a leitura e escrita de dados no banco de dados e fornece uma interface para manipular esses dados.

- `Service`: A camada service é responsável por implementar a lógica de negócios do aplicativo. Ela geralmente encapsula uma ou mais operações do modelo e fornece uma camada adicional de abstração para o controller.

- `Controller`: A camada controller é responsável por lidar com as requisições HTTP e coordenar as interações entre os modelos e os serviços. Ela recebe as solicitações do usuário e decide qual serviço ou modelo deve ser usado para lidar com essa solicitação.

Ao usar a arquitetura MSC, a lógica de negócios é separada da camada de apresentação e da camada de armazenamento de dados, o que torna o código mais modular e escalável. Além disso, a separação de responsabilidades torna mais fácil testar cada componente separadamente.

Aqui estão alguns benefícios da arquitetura MSC:

- `Organização`: Com a divisão clara de responsabilidades, é mais fácil para os desenvolvedores entenderem e manterem o código.

- `Escalabilidade`: Como cada componente é independente, é possível escalar o aplicativo de forma granular, sem precisar escalá-lo como um todo.

- `Reutilização de código`: Como os serviços encapsulam a lógica de negócios, é possível reutilizar o mesmo serviço em várias partes do aplicativo.

- `Testabilidade`: Como cada componente é independente, é mais fácil escrever testes automatizados para cada componente.

<br>

## Testes

Foram realizados testes automatizados durante o desenvolvimento da aplicação para garantir seu correto funcionamento e evitar possíveis erros no código. Foram implementados testes de integração e testes unitários tanto no front-end quanto no back-end.

No front-end, os testes foram escritos utilizando a biblioteca [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) em conjunto com o framework [Jest](https://jestjs.io/pt-BR/). Os testes unitários verificam a funcionalidade de cada componente individualmente, enquanto os testes de integração testam o comportamento de múltiplos componentes em conjunto. Isso garante que a interface do usuário esteja funcionando corretamente, independentemente de qualquer mudança no código.

No back-end, foram implementados testes de unidade utilizando a biblioteca [Mocha](https://mochajs.org/), o framework de asserção [Chai](https://www.chaijs.com/) e a biblioteca de simulação [Sinon](https://sinonjs.org/). Além disso, foram realizados testes de integração para garantir que os diferentes componentes do servidor estejam interagindo corretamente.

A utilização de testes automatizados permite uma maior confiabilidade e segurança na aplicação, garantindo que ela continue funcionando corretamente mesmo após alterações no código.

<br>

## Segurança

A segurança é uma preocupação primordial em nosso aplicativo. Utilizamos várias técnicas e tecnologias para garantir que nosso sistema seja seguro e confiável.

Uma das tecnologias que usamos para garantir a segurança é o [JWT (JSON WEB TOKEN)](https://auth0.com/resources/ebooks/jwt-handbook?utm_content=latamptbrazilgenericauthentication-jwthandbook-jwthandbook&utm_source=google&utm_campaign=latam_mult_bra_all_ciam-all_dg-ao_auth0_search_google_text_kw_utm2&utm_medium=cpc&utm_id=aNK4z0000004ISoGAM&utm_term=json%20web%20token-c&gclid=Cj0KCQiAic6eBhCoARIsANlox86d1mgnR32Ojo_O7HQcmuTbch4oUFGFeAe5YcMjrVVTa3XlqlXDIGoaApm8EALw_wcB), que é uma maneira segura de transmitir informações entre dois ou mais sistemas de forma criptografada. Isso garante que apenas as partes autorizadas possam acessar as informações transmitidas.

Além disso, utilizamos o [MD-5](https://www.devmedia.com.br/criptografia-md5/2944), que é um algoritmo de hash criptográfico, para proteger as senhas de nossos usuários. O [MD-5](https://www.devmedia.com.br/criptografia-md5/2944) é um algoritmo robusto e comprovadamente seguro para uso em senhas.

Outra maneira pela qual garantimos a segurança é através da arquitetura de nosso software. Nossos sistemas são construídos com uma arquitetura modular e escalável, o que significa que podemos isolar e proteger cada componente do sistema de forma independente. Isso nos permite detectar e corrigir vulnerabilidades de segurança de forma mais rápida e eficiente.

<br>

## Estilização

No aplicativo iBirita, utilizamos três ferramentas para estilizar a aplicação web: [Tailwind](https://tailwindcss.com/), [Material UI](https://mui.com/) e [CSS](https://developer.mozilla.org/pt-BR/docs/Web/CSS). O [Tailwind](https://tailwindcss.com/) é um framework [CSS](https://developer.mozilla.org/pt-BR/docs/Web/CSS) utilitário que nos permite criar estilos customizados rapidamente, enquanto o [Material UI](https://mui.com/) é um conjunto de componentes React pré-construídos que seguem as diretrizes de design do Google. Além disso, o [CSS](https://developer.mozilla.org/pt-BR/docs/Web/CSS) nativo foi utilizado em alguns casos para complementar o estilo dos componentes.

Utilizamos [Tailwind](https://tailwindcss.com/) principalmente para estilizar os componentes criados do zero, enquanto [Material UI](https://mui.com/) foi utilizado para os campos de input e botões que utilizamos na aplicação. Ambos foram customizados para atender às necessidades de design e experiência do usuário específicas do projeto.

No geral, a combinação dessas ferramentas nos permitiu criar uma interface web responsiva, atraente e funcional.

<br>
<br>

<details>
  <summary><strong>INSTALAÇÃO DO APLICATIVO iBIRITA</strong></summary><br />

## Instalação 

<br>

- Clone o repositório `git@github.com:Rafael-Souza-97/ibirita-delivery-app.git`:

```bash
git clone git@github.com:Rafael-Souza-97/ibirita-delivery-app.git
```

<br>

- Entre na pasta do repositório que você acabou de clonar:

```bash
cd ibirita-delivery-app
```

<br>

- Instale as depëndencias, caso necessário, com `npm install`:

```bash
npm install
```

- Instale as depëndencias do Front-end e Back-end, com `npm run dev:prestart`:

```bash
npm run dev:prestart
```

<hr>
<br>

### Executando a aplicação:


- Execute a aplicação com  com `npm start` na raiz do projeto:
> Executará a aplicação em modo de desenvolvimento.
 
```bash
npm start
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para visualiza-lo.

<hr>
<br>

### Testando a aplicação:

- Execute os testes com `npm test`:
> Executará os testes unitários e testes de integração.
 
```bash
npm test
```

<hr>
<br>

### Contribuição

Contribuições são sempre bem-vindas! Para contribuir com o projeto, siga as instruções abaixo:

- Fork este repositório

> Crie uma nova branch com sua feature ou correção de bug:

```bash
git checkout -b sua-feature-ou-correcao
```

- Faça as alterações necessárias e commit as mudanças:

```bash
git commit -m "sua mensagem de commit"
```

- Envie suas alterações para seu repositório remoto:

```bash
git push origin sua-feature-ou-correcao
```

- Crie um `Pull Request` para o repositório original.

<hr>

</details>

<br>

## Equipe

- [Artur Vidor](https://github.com/vidorartur)
- [Julia Peres Kitzberger](https://github.com/xjujuperesx)
- [Pablo Araujo](https://github.com/opabloaraujo)
- [Rafael Souza](https://github.com/Rafael-Souza-97)
- [Pedro H. Niemczewski](https://github.com/pedrohassen)

## Referências

 - [Trybe](https://www.betrybe.com/)

## Tecnologias e Ferramentas

- Linguagem: [Javascript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- Framework de Front-end: [React](https://pt-br.reactjs.org/)
- Gerenciamento de estado: [ContextAPI](https://reactjs.org/docs/context.html)
- Cliente HTTP: [Axios](https://axios-http.com/ptbr/docs/intro)
- Plataforma de desenvolvimento: [Node](https://nodejs.org/en/)
- Virtualização: [Docker](https://www.docker.com/)
- Padrão de arquitetura de API: [API RESTful](https://blog.betrybe.com/desenvolvimento-web/api-rest-tudo-sobre/)
- Padrão de arquitetura do Software: [Model-Service-Controller](https://www.devmedia.com.br/introducao-ao-padrao-mvc/29308) 
- Framework de arquitetura de APIwork web: [Express](https://expressjs.com/)
- Banco de dados: [MySQL](https://www.mysql.com/)
- Ferramenta de modelagem de banco de dados: [MySQL Workbench](https://www.mysql.com/products/workbench/)
- ORM: [Sequelize](https://sequelize.org/)
- Criptografia de senhas: [MD-5](https://www.devmedia.com.br/criptografia-md5/2944)
- Autenticação e autorização: [JWT](https://auth0.com/resources/ebooks/jwt-handbook?utm_content=latamptbrazilgenericauthentication-jwthandbook-jwthandbook&utm_source=google&utm_campaign=latam_mult_bra_all_ciam-all_dg-ao_auth0_search_google_text_kw_utm2&utm_medium=cpc&utm_id=aNK4z0000004ISoGAM&utm_term=json%20web%20token-c&gclid=Cj0KCQiAic6eBhCoARIsANlox86d1mgnR32Ojo_O7HQcmuTbch4oUFGFeAe5YcMjrVVTa3XlqlXDIGoaApm8EALw_wcB)
- Cliente de teste de API: [Thunder Client](https://www.thunderclient.com/)
- Linter de código: [ESLint](https://eslint.org/)
- Metodologias ágeis: [Scrum](https://www.atlassian.com/br/agile/scrum) e [Kanban](https://www.totvs.com/blog/negocios/kanban/)
- Ferramentas de comunicação: [Zoom](https://zoom.us/) e [Slack](https://slack.com/intl/pt-br/)
- Editor de código: [Visual Studio Code](https://code.visualstudio.com/)
- Sistema de controle de versão: [Git](https://git-scm.com/) e [GitHub](https://github.com/)
- Sistema operacional: [Linux - Ubuntu](https://ubuntu.com/) e [Windows](https://www.microsoft.com/pt-br/windows/?r=1)

## Estilização

- Framework CSS: [Tailwind](https://tailwindcss.com/)
- Biblioteca de componentes: [Material UI](https://mui.com/)
- Linguagem de Estilização: [CSS](https://developer.mozilla.org/pt-BR/docs/Web/CSS)

## Testes

- Framework de teste de unidade: [Jest](https://jestjs.io/pt-BR/)
- Biblioteca de teste de componentes React: [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- Framework de teste de unidade: [Mocha](https://mochajs.org/)
- Biblioteca de assertividade para teste de unidade: [Chai](https://www.chaijs.com/)
- Biblioteca de espiões, stubs e mocks para testes: [Sinon](https://sinonjs.org/)

<br>
<hr>

## Deploy
https://delivery-7g9vbnf8q-pedrohassen.vercel.app/login

## Preview
https://user-images.githubusercontent.com/99055008/226149136-98ba20a3-1ea4-4e78-99da-507f0bad666c.mp4

<hr>
