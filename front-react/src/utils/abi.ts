export const ABIs = {
	DAppAddressRelayABI: [
	  {
	    inputs: [
	      {
		internalType: "contract IInputBox",
		name: "_inputBox",
		type: "address",
	      },
	    ],
	    stateMutability: "nonpayable",
	    type: "constructor",
	  },
	  {
	    inputs: [],
	    name: "getInputBox",
	    outputs: [
	      { internalType: "contract IInputBox", name: "", type: "address" },
	    ],
	    stateMutability: "view",
	    type: "function",
	  },
	  {
	    inputs: [{ internalType: "address", name: "_dapp", type: "address" }],
	    name: "relayDAppAddress",
	    outputs: [],
	    stateMutability: "nonpayable",
	    type: "function",
	  },
	],
      
	ERC1155BatchPortalABI: [
	  {
	    inputs: [
	      {
		internalType: "contract IInputBox",
		name: "_inputBox",
		type: "address",
	      },
	    ],
	    stateMutability: "nonpayable",
	    type: "constructor",
	  },
	  {
	    inputs: [
	      { internalType: "contract IERC1155", name: "_token", type: "address" },
	      { internalType: "address", name: "_dapp", type: "address" },
	      { internalType: "uint256[]", name: "_tokenIds", type: "uint256[]" },
	      { internalType: "uint256[]", name: "_values", type: "uint256[]" },
	      { internalType: "bytes", name: "_baseLayerData", type: "bytes" },
	      { internalType: "bytes", name: "_execLayerData", type: "bytes" },
	    ],
	    name: "depositBatchERC1155Token",
	    outputs: [],
	    stateMutability: "nonpayable",
	    type: "function",
	  },
	  {
	    inputs: [],
	    name: "getInputBox",
	    outputs: [
	      { internalType: "contract IInputBox", name: "", type: "address" },
	    ],
	    stateMutability: "view",
	    type: "function",
	  },
	],
      
	ERC1155SinglePortalABI: [
	  {
	    inputs: [
	      {
		internalType: "contract IInputBox",
		name: "_inputBox",
		type: "address",
	      },
	    ],
	    stateMutability: "nonpayable",
	    type: "constructor",
	  },
	  {
	    inputs: [
	      { internalType: "contract IERC1155", name: "_token", type: "address" },
	      { internalType: "address", name: "_dapp", type: "address" },
	      { internalType: "uint256", name: "_tokenId", type: "uint256" },
	      { internalType: "uint256", name: "_value", type: "uint256" },
	      { internalType: "bytes", name: "_baseLayerData", type: "bytes" },
	      { internalType: "bytes", name: "_execLayerData", type: "bytes" },
	    ],
	    name: "depositSingleERC1155Token",
	    outputs: [],
	    stateMutability: "nonpayable",
	    type: "function",
	  },
	  {
	    inputs: [],
	    name: "getInputBox",
	    outputs: [
	      { internalType: "contract IInputBox", name: "", type: "address" },
	    ],
	    stateMutability: "view",
	    type: "function",
	  },
	],
      
	ERC20PortalABI: [
	  {
	    inputs: [
	      {
		internalType: "contract IInputBox",
		name: "_inputBox",
		type: "address",
	      },
	    ],
	    stateMutability: "nonpayable",
	    type: "constructor",
	  },
	  {
	    inputs: [
	      { internalType: "contract IERC20", name: "_token", type: "address" },
	      { internalType: "address", name: "_dapp", type: "address" },
	      { internalType: "uint256", name: "_amount", type: "uint256" },
	      { internalType: "bytes", name: "_execLayerData", type: "bytes" },
	    ],
	    name: "depositERC20Tokens",
	    outputs: [],
	    stateMutability: "nonpayable",
	    type: "function",
	  },
	  {
	    inputs: [],
	    name: "getInputBox",
	    outputs: [
	      { internalType: "contract IInputBox", name: "", type: "address" },
	    ],
	    stateMutability: "view",
	    type: "function",
	  },
	],
      
	ERC721PortalABI: [
	  {
	    inputs: [
	      {
		internalType: "contract IInputBox",
		name: "_inputBox",
		type: "address",
	      },
	    ],
	    stateMutability: "nonpayable",
	    type: "constructor",
	  },
	  {
	    inputs: [
	      { internalType: "contract IERC721", name: "_token", type: "address" },
	      { internalType: "address", name: "_dapp", type: "address" },
	      { internalType: "uint256", name: "_tokenId", type: "uint256" },
	      { internalType: "bytes", name: "_baseLayerData", type: "bytes" },
	      { internalType: "bytes", name: "_execLayerData", type: "bytes" },
	    ],
	    name: "depositERC721Token",
	    outputs: [],
	    stateMutability: "nonpayable",
	    type: "function",
	  },
	  {
	    inputs: [],
	    name: "getInputBox",
	    outputs: [
	      { internalType: "contract IInputBox", name: "", type: "address" },
	    ],
	    stateMutability: "view",
	    type: "function",
	  },
	],
      
	EtherPortalABI: [
	  {
	    inputs: [
	      {
		internalType: "contract IInputBox",
		name: "_inputBox",
		type: "address",
	      },
	    ],
	    stateMutability: "nonpayable",
	    type: "constructor",
	  },
	  {
	    inputs: [],
	    name: "EtherTransferFailed",
	    type: "error",
	  },
	  {
	    inputs: [
	      { internalType: "address", name: "_dapp", type: "address" },
	      { internalType: "bytes", name: "_execLayerData", type: "bytes" },
	    ],
	    name: "depositEther",
	    outputs: [],
	    stateMutability: "payable",
	    type: "function",
	  },
	  {
	    inputs: [],
	    name: "getInputBox",
	    outputs: [
	      { internalType: "contract IInputBox", name: "", type: "address" },
	    ],
	    stateMutability: "view",
	    type: "function",
	  },
	],
      
	InputBoxABI: [
	  {
	    inputs: [],
	    name: "InputSizeExceedsLimit",
	    type: "error",
	  },
	  {
	    anonymous: false,
	    inputs: [
	      { indexed: true, internalType: "address", name: "dapp", type: "address" },
	      {
		indexed: true,
		internalType: "uint256",
		name: "inputIndex",
		type: "uint256",
	      },
	      {
		indexed: false,
		internalType: "address",
		name: "sender",
		type: "address",
	      },
	      { indexed: false, internalType: "bytes", name: "input", type: "bytes" },
	    ],
	    name: "InputAdded",
	    type: "event",
	  },
	  {
	    inputs: [
	      { internalType: "address", name: "_dapp", type: "address" },
	      { internalType: "bytes", name: "_input", type: "bytes" },
	    ],
	    name: "addInput",
	    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
	    stateMutability: "nonpayable",
	    type: "function",
	  },
	  {
	    inputs: [
	      { internalType: "address", name: "_dapp", type: "address" },
	      { internalType: "uint256", name: "_index", type: "uint256" },
	    ],
	    name: "getInputHash",
	    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
	    stateMutability: "view",
	    type: "function",
	  },
	  {
	    inputs: [{ internalType: "address", name: "_dapp", type: "address" }],
	    name: "getNumberOfInputs",
	    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
	    stateMutability: "view",
	    type: "function",
	  },
	],
      };