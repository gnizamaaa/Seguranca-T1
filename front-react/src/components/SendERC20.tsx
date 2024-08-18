import React, { useState } from "react";
import { BaseError } from "wagmi";
import {
  erc20PortalAddress,
  useWriteErc20Approve,
  useWriteErc20PortalDepositErc20Tokens,
} from "../hooks/generated";
import { Address, parseEther, stringToHex, Hex } from "viem";

const SendERC20 = () => {
  const dAppAddress = `0xab7528bb862fb57e8a2bcd567a2e929a0be56a5e`;
  const [erc20Value, setErc20Value] = useState("");
  const [tokenAddress, setTokenAddress] = useState<Address | null>();

  const {
    isPending,
    isSuccess,
    error,
    writeContractAsync: depositToken,
  } = useWriteErc20PortalDepositErc20Tokens();

  const { writeContractAsync: approveToken } = useWriteErc20Approve();

  const approve = async (address: Address, amount: string) => {
    try {
      await approveToken({
        address,
        args: [erc20PortalAddress, parseEther(amount)],
      });
      console.log("ERC20 Approval successful");
    } catch (error) {
      console.error("Error in approving ERC20:", error);
      throw error;
    }
  };

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = stringToHex(`Deposited (${erc20Value}).`);
    await approve(tokenAddress as Address, erc20Value);
    await depositToken({
      args: [tokenAddress as Hex, dAppAddress, parseEther(erc20Value), data],
    });
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg shadow-xl">
      <h2 className="text-3xl font-bold text-white mb-6">Deposit ERC20</h2>
      <form onSubmit={submit} className="space-y-4">
        <div>
          <input
            type="text"
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
            placeholder="ERC20 Token Address"
            value={tokenAddress as Address}
            onChange={(e) => setTokenAddress(e.target.value as Address)}
          />
          <input
            type="text"
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter ERC20 amount"
            value={erc20Value}
            onChange={(e) => setErc20Value(e.target.value)}
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
          {erc20Value} tokens sent!
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

export default SendERC20;
