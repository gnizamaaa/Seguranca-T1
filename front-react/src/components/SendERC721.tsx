import React, { useState } from "react";
import { BaseError } from "wagmi";
import {
  erc721PortalAddress,
  useWriteErc721Approve,
  useWriteErc721PortalDepositErc721Token,
  useWriteCartesiDAppFactory
} from "../hooks/generated";
import { stringToHex, Address, Hex } from "viem";

const SendERC721 = () => {
  const dAppAddress = `0xab7528bb862fb57e8a2bcd567a2e929a0be56a5e`;
  const [tokenId, setTokenId] = useState<string>("");
  const [tokenAddress, setTokenAddress] = useState("");

  const {
    isPending,
    isSuccess,
    error,
    writeContractAsync: depositToken,
  } = useWriteErc721PortalDepositErc721Token();

  const { writeContractAsync: approveToken } = useWriteErc721Approve();

  const approve = async (address: Address, tokenId: bigint) => {
    try {
      await approveToken({
        address,
        args: [erc721PortalAddress, tokenId],
      });

      console.log("Approval successful");
    } catch (error) {
      console.error("Error in approving ERC721:", error);
      throw error; // Re-throw the error to be handled by the caller
    }
  };

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const bigIntTokenId = BigInt(tokenId);
    const data = stringToHex(`Deposited NFT of token id:(${bigIntTokenId}).`);

    await approve(tokenAddress as Address, bigIntTokenId);

    depositToken({
      args: [tokenAddress as Hex, dAppAddress, bigIntTokenId, "0x", data],
    });
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg shadow-xl">
      <h2 className="text-3xl font-bold text-white mb-6">
        Deposit ERC721 Token
      </h2>
      <form onSubmit={submit} className="space-y-4">
        <div>
          <input
            type="text"
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="ERC721 Token Address"
            value={tokenAddress}
            onChange={(e) => setTokenAddress(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Token ID"
            value={tokenId}
            onChange={(e) => setTokenId(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-white text-purple-600 rounded-md hover:bg-purple-100 transition-colors duration-300 font-medium"
        >
          {isPending ? "Sending..." : "Send"}
        </button>
      </form>

      {isSuccess && (
        <p className="mt-4 text-green-300 font-bold">
          NFT of Token number: {tokenId} sent!
        </p>
      )}

      {error && (
        <div className="mt-4 text-red-300">
          Error: {(error as BaseError).shortMessage || error.message}
        </div>
      )}
    </div>
  );
};

export default SendERC721;
