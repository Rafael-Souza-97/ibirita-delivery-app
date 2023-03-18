# iBirit@

Bem-vindo ao iBirita, um aplicativo de delivery de bebidas completo e fácil de usar! Com o iBirita, você pode escolher entre uma grande variedade de bebidas e recebê-las diretamente na sua porta.

O iBirita foi desenvolvido por uma equipe de 5 pessoas dedicadas a fornecer a melhor experiência de compra online para seus usuários. Utilizando tecnologias como Javascript, React, Context, API, Axios, Node, MySQL, MD-5, JWT e Sequelize, o aplicativo inclui telas de login e cadastro para seus clientes, vendedores e administradores, bem como uma seleção de produtos, checkout e rastreamento de pedidos.

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

## Testes
Foram implementados testes automatizados para garantir que a aplicação funcione corretamente e evitar possíveis erros no código. Esses testes foram escritos usando [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) e [Jest](https://jestjs.io/pt-BR/), e incluem testes unitários e de integração. Os testes unitários verificam a funcionalidade de componentes individuais da aplicação, enquanto os testes de integração verificam o comportamento de componentes quando interagem uns com os outros. A utilização de [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) e [Jest](https://jestjs.io/pt-BR/)  permite que os testes sejam escritos de forma simples e eficiente, garantindo que a aplicação continue funcionando corretamente mesmo após as alterações no código.

<br>
<br>

<details>
  <summary><strong>COMO INSTALAR O APLICATIVO iBIRITA</strong></summary><br />

## Instalação 

<br>

- Clone o repositório `git@github.com:Rafael-Souza-97/ibirita-delivery-app.git`:

```bash
git clone git@github.com:Rafael-Souza-97/exchange-pokedex.git
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

<hr>
<br>

### Executando a aplicação:


- Execute a aplicação com  com `npm start`:
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

## Autor

- [Artur Vidor](https://github.com/vidorartur)
- [Julia Peres Kitzberger](https://github.com/xjujuperesx)
- [Pablo Araujo](https://github.com/opabloaraujo)
- [Rafael Souza](https://github.com/Rafael-Souza-97)
- [Pedro H. Niemczewski](https://github.com/pedrohassen)

## Referências

 - [Trybe](https://www.betrybe.com/)

## Tecnologias / Ferramentas utilizadas

- [Javascript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- [React](https://pt-br.reactjs.org/)
- [ContextAPI](https://reactjs.org/docs/context.html)
- [Axios](https://axios-http.com/ptbr/docs/intro)
- [Node](https://nodejs.org/en/)
- [Docker](https://www.docker.com/)
- [API RESTful](https://blog.betrybe.com/desenvolvimento-web/api-rest-tudo-sobre/)
- [Express](https://expressjs.com/)
- [MySQL](https://www.mysql.com/)
- [MySQL Workbench](https://www.mysql.com/products/workbench/)
- [Sequelize](https://sequelize.org/)
- [Criptografia MD-5](https://www.devmedia.com.br/criptografia-md5/2944)
- [JWT](https://auth0.com/resources/ebooks/jwt-handbook?utm_content=latamptbrazilgenericauthentication-jwthandbook-jwthandbook&utm_source=google&utm_campaign=latam_mult_bra_all_ciam-all_dg-ao_auth0_search_google_text_kw_utm2&utm_medium=cpc&utm_id=aNK4z0000004ISoGAM&utm_term=json%20web%20token-c&gclid=Cj0KCQiAic6eBhCoARIsANlox86d1mgnR32Ojo_O7HQcmuTbch4oUFGFeAe5YcMjrVVTa3XlqlXDIGoaApm8EALw_wcB)
- [Thunder Client](https://www.thunderclient.com/)
- [ESLint](https://eslint.org/)
- [Scrum](https://www.atlassian.com/br/agile/scrum)
- [Kanban](https://www.totvs.com/blog/negocios/kanban/)
- [Zoom](https://zoom.us/)
- [Slack](https://slack.com/intl/pt-br/)
- [VsCode](https://code.visualstudio.com/)
- [Git](https://git-scm.com/) & [GitHub](https://github.com/)
- [Linux - Ubuntu](https://ubuntu.com/)

## Testes

- [Jest](https://jestjs.io/pt-BR/)
- [React Testing Library - RTL](https://testing-library.com/docs/react-testing-library/intro/)
- [Mocha](https://mochajs.org/)
- [Chai](https://www.chaijs.com/)
- [Sinon](https://sinonjs.org/)

<br>
<hr>
