# Trabalho Aula 06

## Requisitos:


## Requisitos Locadora
Cadastro de Veículos:
    1. Não é permitido cadastrar veículos com a mesma placa de outro já registrado no sistema.
    2. As informações a serem cadastradas dos veículos devem incluir o valor da hora de aluguel.
    
Aluguel de Veículos:
    1. Para alugar um veículo, o cliente deve fornecer nome, CPF e o tipo de carteira.
    2. Se o tipo de carteira do cliente for "A", ele só poderá alugar uma moto; se for "B", apenas um
    carro.
    3. Cada cliente pode alugar apenas um veículo por vez, e não deve estar alugando nenhum outro
    veículo no momento de realizar um novo aluguel.
    4. Ao alugar um veículo, deve-se realizar um cálculo considerando o valor da diária, os dias a serem
    alugados e um acréscimo conforme o tipo de veículo. Carros terão um acréscimo de 10%,
    enquanto motos terão 5%.

Devolução de Veículos:
    1. A devolução do veículo requer o fornecimento do CPF do cliente e a placa do veículo.
    2. Não é permitido excluir um veículo que esteja atualmente alugado.

Faturamento:
    1. O sistema, quando solicitado, deve apresentar a fatura a ser paga pelo cliente, detalhando o
    custo do aluguel de cada veículo.

Funcionalidades do Sistema
    1. Cadastrar veículo 
    2. Alugar veículo
    3. Devolver veículo
    4. Listar veículos disponíveis
    5. Listar veículos alugados
    6. Listar Alugueis
    7. Listar Clientes
    8. Mostrar fatura do cliente 

Middlewares
    1. Middleware Log
    2. Middleware tratamento de erros(CustomError)