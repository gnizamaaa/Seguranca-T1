import React, { useState } from "react";
import { BaseError } from "wagmi";
import { useWriteInputBoxAddInput } from "../hooks/generated";
import { Hex, stringToHex } from "viem";

const SimpleCalculator = () => {
  const dAppAddress = `0xab7528bb862fb57e8a2bcd567a2e929a0be56a5e`;
  const [inputValue, setInputValue] = useState("");
  const [hexInput, setHexInput] = useState<boolean>(false);

  const { isPending, isSuccess, error, writeContractAsync } =
    useWriteInputBoxAddInput();

  const handleButtonClick = (value: string) => {
    setInputValue((prev) => prev + value);
  };

  const handleClear = () => {
    setInputValue("");
  };

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await writeContractAsync({
      args: [
        dAppAddress,
        hexInput ? (inputValue as Hex) : stringToHex(inputValue),
      ],
    });
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg shadow-xl">
      <h2 className="text-3xl font-bold text-white mb-6">Simple Calculator</h2>
      <form onSubmit={submit} className="space-y-4">
        <div className="flex flex-col space-y-2">
          <input
            type="text"
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter calculation"
            value={inputValue}
            readOnly
          />
          <div className="grid grid-cols-4 gap-2">
            {["7", "8", "9", "/"].map((val) => (
              <button
                type="button"
                key={val}
                className="p-2 bg-white text-purple-600 rounded-md hover:bg-purple-100 transition-colors duration-300 font-medium"
                onClick={() => handleButtonClick(val)}
              >
                {val}
              </button>
            ))}
            {["4", "5", "6", "*"].map((val) => (
              <button
                type="button"
                key={val}
                className="p-2 bg-white text-purple-600 rounded-md hover:bg-purple-100 transition-colors duration-300 font-medium"
                onClick={() => handleButtonClick(val)}
              >
                {val}
              </button>
            ))}
            {["1", "2", "3", "-"].map((val) => (
              <button
                type="button"
                key={val}
                className="p-2 bg-white text-purple-600 rounded-md hover:bg-purple-100 transition-colors duration-300 font-medium"
                onClick={() => handleButtonClick(val)}
              >
                {val}
              </button>
            ))}
            {["0", ".", "^", "+"].map((val) => (
              <button
                type="button"
                key={val}
                className="p-2 bg-white text-purple-600 rounded-md hover:bg-purple-100 transition-colors duration-300 font-medium"
                onClick={() => handleButtonClick(val)}
              >
                {val}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="w-full p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-300 font-medium"
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={hexInput}
            onChange={(e) => setHexInput(!hexInput)}
          />
          <span className="text-white">Raw Hex</span>
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-white text-purple-600 rounded-md hover:bg-purple-100 transition-colors duration-300 font-medium"
        >
          {isPending ? "Sending..." : "Send"}
        </button>
      </form>

      {isSuccess && (
        <p className="mt-4 text-green-300 font-bold">Transaction Sent</p>
      )}

      {error && (
        <div className="mt-4 text-red-300">
          Error: {(error as BaseError).shortMessage || error.message}
        </div>
      )}
    </div>
  );
};

export default SimpleCalculator;
