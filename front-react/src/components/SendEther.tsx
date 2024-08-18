import React, { useState } from "react";
import { BaseError } from "wagmi";
import { useWriteEtherPortalDepositEther } from "../hooks/generated";

import { parseEther, stringToHex } from "viem";

const SendEther = () => {
  const dAppAddress = `0xab7528bb862fb57e8a2bcd567a2e929a0be56a5e`;
  const [etherValue, setEtherValue] = useState("");

  const {
    isPending,
    isSuccess,
    error,
    writeContractAsync: depositToken,
  } = useWriteEtherPortalDepositEther();

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = stringToHex(`Deposited (${etherValue}) ether.`);
    await depositToken({
      args: [dAppAddress, data],
      value: parseEther(etherValue),
    });
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg shadow-xl">
      <h2 className="text-3xl font-bold text-white mb-6">Deposit Ether</h2>
      <form onSubmit={submit} className="space-y-4">
        <div>
          <input
            type="text"
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter Ether amount"
            value={etherValue}
            onChange={(e) => setEtherValue(e.target.value)}
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
        <p className="mt-4 text-green-300 font-bold">{etherValue} ETH sent!</p>
      )}

      {error && (
        <div className="mt-4 text-red-300">
          Error: {(error as BaseError).shortMessage || error.message}
        </div>
      )}
    </div>
  );
};

export default SendEther;
