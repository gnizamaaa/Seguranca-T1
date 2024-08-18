const { ethers } = require('ethers');

/**
 * Função para enviar um input para uma blockchain usando um RPC URL, a chain Foundry e uma Wallet Mnemonic.
 * @param {string} rpcUrl - O URL do RPC da blockchain.
 * @param {string} mnemonic - A Wallet Mnemonic para derivar a conta.
 * @param {string} account - O endereço da conta que será usada para enviar a transação.
 * @param {string} inputData - A string de input que será enviada na transação.
 * @returns {Promise<string>} - Retorna o hash da transação enviada.
 */
async function sendInput(rpcUrl, mnemonic, account, inputData) {
    // Conectar ao provedor usando o RPC URL
    const provider = new ethers.providers.JsonRpcProvider(rpcUrl);

    // Gerar a wallet a partir do mnemonic
    const wallet = ethers.Wallet.fromMnemonic(mnemonic).connect(provider);

    // Verificar se a conta derivada corresponde à fornecida
    if (wallet.address.toLowerCase() !== account.toLowerCase()) {
        throw new Error('A conta derivada do mnemonic não corresponde à conta fornecida.');
    }

    // Preparar a transação
    const tx = {
        to: account, // O endereço para enviar a transação (pode ser o mesmo da conta)
        data: ethers.utils.hexlify(ethers.utils.toUtf8Bytes(inputData)), // Converter a string para bytes e depois para hex
        gasLimit: 21000, // Define o gas limit, pode ser ajustado conforme necessário
    };

    // Enviar a transação
    const txResponse = await wallet.sendTransaction(tx);
    console.log('Transaction hash:', txResponse.hash);

    // Esperar pela confirmação da transação
    const receipt = await txResponse.wait();
    console.log('Transaction confirmed in block:', receipt.blockNumber);

    return txResponse.hash;
}

// Exemplo de uso da função
const rpcUrl = 'https://foundry-rpc-url'; // Substitua pelo RPC URL correto
const mnemonic = 'sua mnemonic aqui';
const account = '0xYourAccountAddress';
const inputData = 'Sua string de input';

sendInput(rpcUrl, mnemonic, account, inputData)
    .then((txHash) => {
        console.log('Transação enviada com sucesso. Hash:', txHash);
    })
    .catch((error) => {
        console.error('Erro ao enviar a transação:', error);
    });

