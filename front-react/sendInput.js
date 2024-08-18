const { ethers } = require('ethers');

/**
 * Função para enviar um input genérico para um endereço de aplicação na blockchain.
 * @param {string} rpcUrl - O URL do RPC da blockchain.
 * @param {string} mnemonic - A Wallet Mnemonic para derivar a conta.
 * @param {string} account - O endereço da conta que será usada para enviar a transação.
 * @param {string} applicationAddress - O endereço da aplicação (dApp) para o qual a transação será enviada.
 * @param {string} inputData - A string de input que será enviada na transação.
 * @returns {Promise<string>} - Retorna o hash da transação enviada.
 */
 function sendInput(rpcUrl, mnemonic, account, applicationAddress, inputData) {
    const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
    const wallet = ethers.Wallet.fromMnemonic(mnemonic).connect(provider);

    if (wallet.address.toLowerCase() !== account.toLowerCase()) {
        throw new Error('A conta derivada do mnemonic não corresponde à conta fornecida.');
    }

    // Preparar a transação genérica
    const tx = {
        to: applicationAddress, // Endereço do dApp
        data: ethers.utils.hexlify(ethers.utils.toUtf8Bytes(inputData)), // Converter a string para bytes e depois para hex
        gasLimit: 100000, // Ajuste conforme necessário
    };

    // Enviar a transação
    const txResponse = await wallet.sendTransaction(tx);
    console.log('Transaction hash:', txResponse.hash);

    // Esperar pela confirmação da transação
    const receipt = await txResponse.wait();
    console.log('Transaction confirmed in block:', receipt.blockNumber);

    return txResponse.hash;
}

