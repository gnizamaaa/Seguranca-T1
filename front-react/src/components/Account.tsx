import { useAccount, useConnect, useDisconnect, useSwitchChain } from "wagmi";
import { useState } from "react";

const Account = () => {
  const account = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();
  const { chains, switchChain } = useSwitchChain();
  const [isChainDropdownOpen, setIsChainDropdownOpen] = useState(false);

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg shadow-xl">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">Account</h2>

        <div className="bg-white bg-opacity-20 rounded-lg p-4 text-white">
          <p className="mb-2">
            <span className="font-semibold">Status:</span> <span className="text-white font-semibold"> {account.status.toLocaleUpperCase()} </span>
          </p>
          <p className="mb-2 font-semibold">
            <span>Address:</span>{" "}
           {account.addresses?.[0]}
          </p>
          <p className="font-semibold">
            <span>Chain ID:</span> {account.chain?.name} | {account.chainId}
          </p>
        </div>

        {/* Display chain switching and disconnect options when connected */}
        {account.status === "connected" && (
          <div className="space-y-4 mt-4">
            {/* Chain switching dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsChainDropdownOpen(!isChainDropdownOpen)}
                className="w-full flex justify-between items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
              >
                Switch Chain
                <svg
                  className="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {/* Dropdown menu for chain options */}
              {isChainDropdownOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1">
                  {chains.map((chainOption) => (
                    <button
                      key={chainOption.id}
                      onClick={() => {
                        switchChain({ chainId: chainOption.id });
                        setIsChainDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {chainOption.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {/* Disconnect button */}
            <button
              type="button"
              onClick={() => disconnect()}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
            >
              Disconnect
            </button>
          </div>
        )}
      </div>

      {/* Connect section */}
      <div>
        <h2 className="text-3xl font-bold text-white mb-4">Connect</h2>
        <div className="grid grid-cols-2 gap-4">
          {connectors.map((connector) => (
            <button
              key={connector.uid}
              onClick={() => connect({ connector })}
              type="button"
              className="px-4 py-2 bg-white text-purple-600 rounded-md hover:bg-purple-100 transition-colors duration-300"
            >
              {connector.name}
            </button>
          ))}
        </div>
        <div className="mt-4 text-white">Status: {status.toLocaleUpperCase()}</div>
        <div className="mt-2 text-red-300">{error?.message}</div>
      </div>
    </div>
  );
};

export default Account;