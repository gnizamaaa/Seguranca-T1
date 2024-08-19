# 🧮 PKI Descentralizada usando Blockchains

## 📜 Visão Geral

Este trabalho tem como objetivo desenvolver um sistema distribuído e descentralizado que substitua a tradicional Infraestrutura de Chaves Públicas (PKI), eliminando a dependência de Autoridades Certificadoras (AC) hierárquicas. 

Para isso, será utilizada a tecnologia Cartesi e como interface dessa estrutura, foi desenvolvida a construção de uma calculadora virtual capaz de enviar as operações do usuário para a block-chain e registrar os resultados obtidos. 

## 🚀 Funcionalidades

- **Calculadora Descentralizada:** Realize operações matemáticas básicas.
- **Registro de Operações:** Todas as operações (válidas e inválidas) são registradas na blockchain.
- **Transparência:** Qualquer usuário pode consultar o histórico de operações diretamente na blockchain.

## 🧩 Arquitetura

A arquitetura é composta por:

- **Frontend:** Interface do usuário construída com React.
- **Backend:** Executado dentro de um nó Cartesi, responsável por processar as operações.
- **Blockchain:** Registro de todas as operações na blockchain.

## 🛠️ Instalação e Configuração

### Pré-requisitos

- Node.js (v22.6.0+)
- NPM (v10.8.2+) ou Yarn
- Docker (v27.1.2)
- Cartesi CLI   (@cartesi/cli/0.16.0 wsl-x64 node-v22.6.0)

### Passos para Instalação & Execução

O primeiro passo é a instalação prévia da plataforma do Cartesi, para isso acesse o [link](https://docs.cartesi.io/cartesi-rollups/1.3/development/installation/) e siga o passo a passo.

Em sequência clone o nosso reposítorio para a sua máquina por meio do comando:
```
$ git clone https://github.com/gnizamaaa/Seguranca-T1.git
```
Acessando o diretório */CartesiAplication*, realize as seguintes chamadas para a execução do ambiente:
```
$ cartesi build
$ cartesi run
```

Com o servidor inicializado, o próximo passo é iniciarmos o *front_end* da nossa aplicação, para isso acesso o diretório */front-react* em um novo terminal e realiza as chamadas dos comandos:
```
$ npm install
$ npm run dev
```

Por fim, com todas as inicializações realizadas adequadamente, você poderá visualizar a aplicação no endereço [localhost:5173](http://localhost:5173/)
   

## 📝 Utilização

Dada a inicialização de todo o ambiente e dentro da nossa plataforma web, o usuário deve realizar a conecção com a plataforma do Cartesi por meio de uma carteira digital, para isso selecione o botão **Mock Connector** e em seguida selecione a opção **Foundry**. Pronto, agora você está identificado e pronto para enviar as operações desejadas.

Com auxilio da interface de calculadora, você pode montar as operações desejadas e envia-las para o servidor. Com o envio realizado, basta aguardar alguns segundos e atualizar a página para a exibição dos resultados.

- Se a operação for **válida**, então o resultado será exibido na seção **Notices** e a operação será registrada na blockchain.
- Se a operação for **inválida**, então o erro será exibido na seção **Reports** e a tentativa será registrada na blockchain.

## 🤝 Contribuição

Contribuições são bem-vindas! Siga os passos abaixo para contribuir:

1. Fork este repositório.
2. Crie uma branch para sua feature (`git checkout -b feature/minha-feature`).
3. Commit suas alterações (`git commit -m 'Adiciona minha feature'`).
4. Push para a branch (`git push origin feature/minha-feature`).
5. Abra um Pull Request.


## 💬 Contato

Criado por [Bruno](https://github.com/bmacerbi), [Rhuan](https://github.com/gnizamaaa) e [Pedro](https://github.com/Pedro2um). Sinta-se à vontade para entrar em contato!

---