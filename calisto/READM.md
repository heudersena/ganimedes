

```
- Table Profile
    Essa tabela é responsável por savar os dados dos usuários
    Para usuários comuns ele será capaz de fazer o cadastro e 
    editar alguns campos, "Nome,phone,Chave do PIX, Código Referência"

- Table Transactions
    Nesse caso será dividido em 4 estagios - "DEPOSITOS - SAQUES - PREMIADO - JOGADA PERDIDA"
    Toda vez que o usuário fizer um novo depósito automaticamente ele vai ganhar 10 reais de bonus.

    Falando sobre as regras do cliente fazer o SAQUE é, verificar se a solicitação é maior que seu soldo. Ele não poderá sacar o soldo do bonus, o mesmo somente será utilizado na plataforma.

    Teremos um sistema de indicações - Funcionará da seguinte forma, se um cliente cadastrar na platadorma com o código referência do vendedor, quando o o cliente perder alguma grana na plataforma, o vendedor irá receber uma comissão % dessa perda.



01 - CRIAR PAGAMENTO PIX MERCADO PAGO

02 - TABLE TRANSAÇÃO [ APROVADO / REPROVADO ]
    02.1 - SE APROVADO ATUALIZAR A TABELA DE PROFILE SOMANDO O VALOR DESSA TRANSAÇÃO.
```

```
TABLE PROFILES
    -  Nesse caso cadastrar todas as informações do usuário
    -  Todo o resto da API precisa dessas informações para seguir o fluxo.

TABLE TRANSACTIONS  
    -- ADICIONAR
        - Adicionar valores a minha carteira
        - Preciso saber o profile_id (RELACIONAMENTO)

TABLE MERCADOPAGOS
    -- ADICIONAR
        - Adicionar valores conforme a requisição da API do Mercado Pago
        - Preciso saber o transection_id (RELACIONAMENTO)

TABLE ACCUMULATOR_BONUS
    -- ADICIONAR
        - Sera preenchido quando o usuário criar seu  PROFILE
    -- UPDATE
        - Pegar o valor existente na tabela ACCUMULATOR_BONUS.bonus_amount para somar no proxímo UPDATE
        - Será feito a adição dos valores conforme o retorno da API do Mercado Pago aprovar a transação, sendo que essa atualização sera feita um SELECT na TRANSACTIONS.bonus para saber o valor do bonus que foi atribuido naquela transação 

<!-- O QUE FAZER QUANDO RECEBER O OK DO MERCADO PAGO -->

1 - ATUALIZAR A TABLE MERCADOPAGOS
    - m_action
    - m_status
    - m_status_detail
    - m_net_received_amount
    - m_transaction_id

2 - ATUALIZAR A TABLE TRANSACTIONS   
    - mercadao_pago_transaction_status
    -- "Tenho que pegar o valor do campo bonus e adionar na TABLE ACCUMULATOR_BONUS"

3 - ATUALIZAR A TABLE ACCUMULATOR_BONUS
    - Verificar a quem pertence o valor e somar o SOLDO.

4 - ATUALIZAR A TABLE PROFILES
    - Somar o valor balance conforme o retorno da API Mercado Pago

```
