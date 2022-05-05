export default [
  {
    inputs: [
      { internalType: 'address', name: '_signer', type: 'address' },
      { internalType: 'address', name: '_feeReceiver', type: 'address' },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true, internalType: 'address', name: 'previousOwner', type: 'address',
      },
      {
        indexed: true, internalType: 'address', name: 'newOwner', type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false, internalType: 'uint256', name: 'orderID', type: 'uint256',
      },
      {
        indexed: false, internalType: 'address[2]', name: 'fromTo', type: 'address[2]',
      },
      {
        indexed: false, internalType: 'address[2]', name: 'instance', type: 'address[2]',
      },
      {
        indexed: false, internalType: 'uint256[2]', name: 'idAndAmount', type: 'uint256[2]',
      },
      {
        indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256',
      },
    ],
    name: 'Trade',
    type: 'event',
  },
  {
    inputs: [],
    name: 'PERCENT_DENOMINATOR',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'feePercentage',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'feeReceiver',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address[2][]', name: 'fromTo', type: 'address[2][]' },
      { internalType: 'address[2][]', name: 'instance', type: 'address[2][]' },
      { internalType: 'uint256[2][]', name: 'idAndAmount', type: 'uint256[2][]' },
      { internalType: 'uint256[]', name: 'amount', type: 'uint256[]' },
    ],
    name: 'forceTradeBatch',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint16', name: '_feePercentage', type: 'uint16' }],
    name: 'setFeePercentage',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '_feeReceiver', type: 'address' }],
    name: 'setFeeReceiver',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '_signer', type: 'address' }],
    name: 'setSigner',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'signer',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'orderID', type: 'uint256' },
      { internalType: 'address[2]', name: 'fromTo', type: 'address[2]' },
      { internalType: 'address[2]', name: 'instance', type: 'address[2]' },
      { internalType: 'uint256[2]', name: 'idAndAmount', type: 'uint256[2]' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
      { internalType: 'uint256', name: 'deadline', type: 'uint256' },
      { internalType: 'bytes', name: 'signature', type: 'bytes' },
    ],
    name: 'trade',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];
