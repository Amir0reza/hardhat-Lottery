/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  BigNumberish,
  Overrides,
} from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type { Lottery, LotteryInterface } from "../../contracts/Lottery";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_purchaseRatio",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_betPrice",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_betFee",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "LotteryIsClose",
    type: "error",
  },
  {
    inputs: [],
    name: "LotteryIsOpen",
    type: "error",
  },
  {
    inputs: [],
    name: "NotEnoughMoney",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "closingTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "currentTime",
        type: "uint256",
      },
    ],
    name: "TimestampPassed",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "closingTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "currentTime",
        type: "uint256",
      },
    ],
    name: "TooSoonToClose",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "winner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "prize",
        type: "uint256",
      },
    ],
    name: "LotteryClosed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "closingTimeStamp",
        type: "uint256",
      },
    ],
    name: "LotteryOpened",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [],
    name: "bet",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "times",
        type: "uint8",
      },
    ],
    name: "betMany",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "checkUpkeep",
    outputs: [
      {
        internalType: "bool",
        name: "upkeepNeeded",
        type: "bool",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "closeLottery",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getBetFee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getBetPrice",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getBetsClosingTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getBetsOpen",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getOwnerPool",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getPaymentToken",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_winner",
        type: "address",
      },
    ],
    name: "getPrize",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getPrizePool",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getPurchaseRatio",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "closingTime",
        type: "uint256",
      },
    ],
    name: "openBets",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "ownerWithdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "performUpkeep",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "prizeWithdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "purchaseTokens",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "returnTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x61010060405234801561001157600080fd5b50604051612502380380612502833981016040819052610030916100e3565b61003933610086565b608083905260a082905260c0819052604051610054906100d6565b604051809103906000f080158015610070573d6000803e3d6000fd5b506001600160a01b031660e05250610111915050565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b61141b806110e783390190565b6000806000606084860312156100f857600080fd5b8351925060208401519150604084015190509250925092565b60805160a05160c05160e051610f576101906000396000818161038a0152818161043e0152818161061c0152818161071601526107ab0152600081816101190152818161046a01526105630152600081816103bd0152818161048b015261052a0152600081816102e00152818161064701526108200152610f576000f3fe6080604052600436106101055760003560e01c80630988c2231461010a57806311610c251461014c5780632531455a14610163578063292ecf13146101785780632d5cd1d6146101985780633290ce29146101ce57806333f707d1146101d65780633ae1786f146101f65780633cc121e6146102165780634585e33b146102365780634cd456b0146102565780636e04ff0d146102795780636fd09816146102a7578063715018a6146102bc5780637631c449146102d1578063884bf67c146103045780638da5cb5b14610319578063990a49f514610346578063bd2178ce14610366578063d41c3a651461037b578063db5ea892146103ae578063f2fde38b146103e1575b600080fd5b34801561011657600080fd5b507f00000000000000000000000000000000000000000000000000000000000000005b6040519081526020015b60405180910390f35b34801561015857600080fd5b50610161610401565b005b34801561016f57600080fd5b50600254610139565b34801561018457600080fd5b50610161610193366004610c21565b6105dc565b3480156101a457600080fd5b506101396101b3366004610c4b565b6001600160a01b031660009081526005602052604090205490565b610161610612565b3480156101e257600080fd5b506101616101f1366004610c74565b6106bd565b34801561020257600080fd5b50610161610211366004610c74565b610794565b34801561022257600080fd5b50610161610231366004610c74565b61086d565b34801561024257600080fd5b50610161610251366004610c8d565b6108bc565b34801561026257600080fd5b5060035460ff166040519015158152602001610143565b34801561028557600080fd5b50610299610294366004610d14565b6108c4565b604051610143929190610dc4565b3480156102b357600080fd5b506101616108f1565b3480156102c857600080fd5b50610161610a40565b3480156102dd57600080fd5b507f0000000000000000000000000000000000000000000000000000000000000000610139565b34801561031057600080fd5b50600154610139565b34801561032557600080fd5b5061032e610a54565b6040516001600160a01b039091168152602001610143565b34801561035257600080fd5b50610161610361366004610c74565b610a63565b34801561037257600080fd5b50600454610139565b34801561038757600080fd5b507f000000000000000000000000000000000000000000000000000000000000000061032e565b3480156103ba57600080fd5b507f0000000000000000000000000000000000000000000000000000000000000000610139565b3480156103ed57600080fd5b506101616103fc366004610c4b565b610aca565b60035460ff1615801561041657506004544210155b156104345760405163644e785b60e01b815260040160405180910390fd5b6001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000166323b872dd33306104af7f00000000000000000000000000000000000000000000000000000000000000007f0000000000000000000000000000000000000000000000000000000000000000610e32565b6040516001600160e01b031960e086901b1681526001600160a01b03938416600482015292909116602483015260448201526064016020604051808303816000875af1158015610503573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105279190610e4b565b507f00000000000000000000000000000000000000000000000000000000000000006001600082825461055a9190610e32565b925050819055507f0000000000000000000000000000000000000000000000000000000000000000600260008282546105939190610e32565b9091555050600680546001810182556000919091527ff652222313e28459528d920b65115c16c04f3efc82aaedc97be59f3f377c0d3f0180546001600160a01b03191633179055565b60018160ff16116105ec57600080fd5b60ff81161561060f576105fd610401565b8061060781610e6d565b9150506105ec565b50565b6001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000166340c10f193361066c7f000000000000000000000000000000000000000000000000000000000000000034610e8a565b6040518363ffffffff1660e01b8152600401610689929190610ea1565b600060405180830381600087803b1580156106a357600080fd5b505af11580156106b7573d6000803e3d6000fd5b50505050565b6106c5610b40565b6002548111156106e857604051636b90fe5960e11b815260040160405180910390fd5b80600260008282546106fa9190610eba565b909155505060405163a9059cbb60e01b81526001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000169063a9059cbb9061074d9033908590600401610ea1565b6020604051808303816000875af115801561076c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107909190610e4b565b5050565b60405163079cc67960e41b81526001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016906379cc6790906107e29033908590600401610ea1565b600060405180830381600087803b1580156107fc57600080fd5b505af1158015610810573d6000803e3d6000fd5b503392506108fc915061084590507f000000000000000000000000000000000000000000000000000000000000000084610ee3565b6040518115909202916000818181858888f19350505050158015610790573d6000803e3d6000fd5b3360009081526005602052604090205481111561089d57604051636b90fe5960e11b815260040160405180910390fd5b33600090815260056020526040812080548392906106fa908490610eba565b6107906108f1565b60035460045460009160609160ff9091161515600114904210158180156108e85750805b93505050915091565b4260045411610922576004805460405163317453df60e21b8152918201524260248201526044015b60405180910390fd5b60035460ff166109455760405163644e785b60e01b815260040160405180910390fd5b60065415610a3457600060068054806020026020016040519081016040528092919081815260200182805480156109a557602002820191906000526020600020905b81546001600160a01b03168152600190910190602001808311610987575b50505050509050600081516109b74490565b6109c19190610ef7565b905060008282815181106109d7576109d7610f0b565b6020026020010151905060015460056000836001600160a01b03166001600160a01b031681526020019081526020016000206000828254610a189190610e32565b909155505060006001819055610a3090600690610bef565b5050505b6003805460ff19169055565b610a48610b40565b610a526000610b9f565b565b6000546001600160a01b031690565b610a6b610b40565b60035460ff1615610a8f5760405163094d05b160e41b815260040160405180910390fd5b428111610ab85760405163b7c7ed6360e01b815260048101829052426024820152604401610919565b6003805460ff19166001179055600455565b610ad2610b40565b6001600160a01b038116610b375760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610919565b61060f81610b9f565b33610b49610a54565b6001600160a01b031614610a525760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610919565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b508054600082559060005260206000209081019061060f91905b80821115610c1d5760008155600101610c09565b5090565b600060208284031215610c3357600080fd5b813560ff81168114610c4457600080fd5b9392505050565b600060208284031215610c5d57600080fd5b81356001600160a01b0381168114610c4457600080fd5b600060208284031215610c8657600080fd5b5035919050565b60008060208385031215610ca057600080fd5b82356001600160401b0380821115610cb757600080fd5b818501915085601f830112610ccb57600080fd5b813581811115610cda57600080fd5b866020828501011115610cec57600080fd5b60209290920196919550909350505050565b634e487b7160e01b600052604160045260246000fd5b600060208284031215610d2657600080fd5b81356001600160401b0380821115610d3d57600080fd5b818401915084601f830112610d5157600080fd5b813581811115610d6357610d63610cfe565b604051601f8201601f19908116603f01168101908382118183101715610d8b57610d8b610cfe565b81604052828152876020848701011115610da457600080fd5b826020860160208301376000928101602001929092525095945050505050565b821515815260006020604081840152835180604085015260005b81811015610dfa57858101830151858201606001528201610dde565b506000606082860101526060601f19601f830116850101925050509392505050565b634e487b7160e01b600052601160045260246000fd5b80820180821115610e4557610e45610e1c565b92915050565b600060208284031215610e5d57600080fd5b81518015158114610c4457600080fd5b600060ff821680610e8057610e80610e1c565b6000190192915050565b8082028115828204841417610e4557610e45610e1c565b6001600160a01b03929092168252602082015260400190565b81810381811115610e4557610e45610e1c565b634e487b7160e01b600052601260045260246000fd5b600082610ef257610ef2610ecd565b500490565b600082610f0657610f06610ecd565b500690565b634e487b7160e01b600052603260045260246000fdfea2646970667358221220abe0115d57c35d6c53119ed28964bdb97eb2661793c7cf04ea71c44d11c70e0164736f6c6343000811003360806040523480156200001157600080fd5b506040518060400160405280601381526020017f4c6f7474657279546f6b656e436c617373696300000000000000000000000000815250604051806040016040528060038152602001624c544360e81b815250816003908162000075919062000212565b50600462000084828262000212565b506200009691506000905033620000c8565b620000c27f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a633620000c8565b620002de565b60008281526005602090815260408083206001600160a01b038516845290915290205460ff16620001695760008281526005602090815260408083206001600160a01b03851684529091529020805460ff19166001179055620001283390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45b5050565b634e487b7160e01b600052604160045260246000fd5b600181811c908216806200019857607f821691505b602082108103620001b957634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156200020d57600081815260208120601f850160051c81016020861015620001e85750805b601f850160051c820191505b818110156200020957828155600101620001f4565b5050505b505050565b81516001600160401b038111156200022e576200022e6200016d565b62000246816200023f845462000183565b84620001bf565b602080601f8311600181146200027e5760008415620002655750858301515b600019600386901b1c1916600185901b17855562000209565b600085815260208120601f198616915b82811015620002af578886015182559484019460019091019084016200028e565b5085821015620002ce5787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b61112d80620002ee6000396000f3fe608060405234801561001057600080fd5b50600436106101125760003560e01c806301ffc9a71461011757806306fdde031461013f578063095ea7b31461015457806318160ddd1461016757806323b872dd14610179578063248a9ca31461018c5780632f2ff15d1461019f578063313ce567146101b457806336568abe146101c357806339509351146101d657806340c10f19146101e957806342966c68146101fc57806370a082311461020f57806379cc67901461023857806391d148541461024b57806395d89b411461025e578063a217fddf14610266578063a457c2d71461026e578063a9059cbb14610281578063d539139314610294578063d547741f146102a9578063dd62ed3e146102bc575b600080fd5b61012a610125366004610dfe565b6102cf565b60405190151581526020015b60405180910390f35b610147610306565b6040516101369190610e4c565b61012a610162366004610e9b565b610398565b6002545b604051908152602001610136565b61012a610187366004610ec5565b6103b0565b61016b61019a366004610f01565b6103d4565b6101b26101ad366004610f1a565b6103e9565b005b60405160128152602001610136565b6101b26101d1366004610f1a565b61040a565b61012a6101e4366004610e9b565b61048d565b6101b26101f7366004610e9b565b6104af565b6101b261020a366004610f01565b6104d1565b61016b61021d366004610f46565b6001600160a01b031660009081526020819052604090205490565b6101b2610246366004610e9b565b6104de565b61012a610259366004610f1a565b6104f3565b61014761051e565b61016b600081565b61012a61027c366004610e9b565b61052d565b61012a61028f366004610e9b565b6105a8565b61016b6000805160206110b883398151915281565b6101b26102b7366004610f1a565b6105b6565b61016b6102ca366004610f61565b6105d2565b60006001600160e01b03198216637965db0b60e01b148061030057506301ffc9a760e01b6001600160e01b03198316145b92915050565b60606003805461031590610f8b565b80601f016020809104026020016040519081016040528092919081815260200182805461034190610f8b565b801561038e5780601f106103635761010080835404028352916020019161038e565b820191906000526020600020905b81548152906001019060200180831161037157829003601f168201915b5050505050905090565b6000336103a68185856105fd565b5060019392505050565b6000336103be858285610721565b6103c985858561079b565b506001949350505050565b60009081526005602052604090206001015490565b6103f2826103d4565b6103fb8161092d565b6104058383610937565b505050565b6001600160a01b038116331461047f5760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b60648201526084015b60405180910390fd5b61048982826109bd565b5050565b6000336103a68185856104a083836105d2565b6104aa9190610fdb565b6105fd565b6000805160206110b88339815191526104c78161092d565b6104058383610a24565b6104db3382610ad1565b50565b6104e9823383610721565b6104898282610ad1565b60009182526005602090815260408084206001600160a01b0393909316845291905290205460ff1690565b60606004805461031590610f8b565b6000338161053b82866105d2565b90508381101561059b5760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604482015264207a65726f60d81b6064820152608401610476565b6103c982868684036105fd565b6000336103a681858561079b565b6105bf826103d4565b6105c88161092d565b61040583836109bd565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b6001600160a01b03831661065f5760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b6064820152608401610476565b6001600160a01b0382166106c05760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b6064820152608401610476565b6001600160a01b0383811660008181526001602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505050565b600061072d84846105d2565b9050600019811461079557818110156107885760405162461bcd60e51b815260206004820152601d60248201527f45524332303a20696e73756666696369656e7420616c6c6f77616e63650000006044820152606401610476565b61079584848484036105fd565b50505050565b6001600160a01b0383166107ff5760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b6064820152608401610476565b6001600160a01b0382166108615760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b6064820152608401610476565b6001600160a01b038316600090815260208190526040902054818110156108d95760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b6064820152608401610476565b6001600160a01b03848116600081815260208181526040808320878703905593871680835291849020805487019055925185815290926000805160206110d8833981519152910160405180910390a3610795565b6104db8133610bf1565b61094182826104f3565b6104895760008281526005602090815260408083206001600160a01b03851684529091529020805460ff191660011790556109793390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b6109c782826104f3565b156104895760008281526005602090815260408083206001600160a01b0385168085529252808320805460ff1916905551339285917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a45050565b6001600160a01b038216610a7a5760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f2061646472657373006044820152606401610476565b8060026000828254610a8c9190610fdb565b90915550506001600160a01b038216600081815260208181526040808320805486019055518481526000805160206110d8833981519152910160405180910390a35050565b6001600160a01b038216610b315760405162461bcd60e51b815260206004820152602160248201527f45524332303a206275726e2066726f6d20746865207a65726f206164647265736044820152607360f81b6064820152608401610476565b6001600160a01b03821660009081526020819052604090205481811015610ba55760405162461bcd60e51b815260206004820152602260248201527f45524332303a206275726e20616d6f756e7420657863656564732062616c616e604482015261636560f01b6064820152608401610476565b6001600160a01b0383166000818152602081815260408083208686039055600280548790039055518581529192916000805160206110d8833981519152910160405180910390a3505050565b610bfb82826104f3565b61048957610c0881610c4a565b610c13836020610c5c565b604051602001610c24929190610fee565b60408051601f198184030181529082905262461bcd60e51b825261047691600401610e4c565b60606103006001600160a01b03831660145b60606000610c6b83600261105d565b610c76906002610fdb565b6001600160401b03811115610c8d57610c8d611074565b6040519080825280601f01601f191660200182016040528015610cb7576020820181803683370190505b509050600360fc1b81600081518110610cd257610cd261108a565b60200101906001600160f81b031916908160001a905350600f60fb1b81600181518110610d0157610d0161108a565b60200101906001600160f81b031916908160001a9053506000610d2584600261105d565b610d30906001610fdb565b90505b6001811115610da8576f181899199a1a9b1b9c1cb0b131b232b360811b85600f1660108110610d6457610d6461108a565b1a60f81b828281518110610d7a57610d7a61108a565b60200101906001600160f81b031916908160001a90535060049490941c93610da1816110a0565b9050610d33565b508315610df75760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e746044820152606401610476565b9392505050565b600060208284031215610e1057600080fd5b81356001600160e01b031981168114610df757600080fd5b60005b83811015610e43578181015183820152602001610e2b565b50506000910152565b6020815260008251806020840152610e6b816040850160208701610e28565b601f01601f19169190910160400192915050565b80356001600160a01b0381168114610e9657600080fd5b919050565b60008060408385031215610eae57600080fd5b610eb783610e7f565b946020939093013593505050565b600080600060608486031215610eda57600080fd5b610ee384610e7f565b9250610ef160208501610e7f565b9150604084013590509250925092565b600060208284031215610f1357600080fd5b5035919050565b60008060408385031215610f2d57600080fd5b82359150610f3d60208401610e7f565b90509250929050565b600060208284031215610f5857600080fd5b610df782610e7f565b60008060408385031215610f7457600080fd5b610f7d83610e7f565b9150610f3d60208401610e7f565b600181811c90821680610f9f57607f821691505b602082108103610fbf57634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fd5b8082018082111561030057610300610fc5565b76020b1b1b2b9b9a1b7b73a3937b61d1030b1b1b7bab73a1604d1b815260008351611020816017850160208801610e28565b7001034b99036b4b9b9b4b733903937b6329607d1b6017918401918201528351611051816028840160208801610e28565b01602801949350505050565b808202811582820484141761030057610300610fc5565b634e487b7160e01b600052604160045260246000fd5b634e487b7160e01b600052603260045260246000fd5b6000816110af576110af610fc5565b50600019019056fe9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6ddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3efa26469706673582212203b7130a786639d6f7c0e518efdfe19ded33f336209f9a897ba73a8ffdfec966564736f6c63430008110033";

type LotteryConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: LotteryConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Lottery__factory extends ContractFactory {
  constructor(...args: LotteryConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _purchaseRatio: PromiseOrValue<BigNumberish>,
    _betPrice: PromiseOrValue<BigNumberish>,
    _betFee: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Lottery> {
    return super.deploy(
      _purchaseRatio,
      _betPrice,
      _betFee,
      overrides || {}
    ) as Promise<Lottery>;
  }
  override getDeployTransaction(
    _purchaseRatio: PromiseOrValue<BigNumberish>,
    _betPrice: PromiseOrValue<BigNumberish>,
    _betFee: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _purchaseRatio,
      _betPrice,
      _betFee,
      overrides || {}
    );
  }
  override attach(address: string): Lottery {
    return super.attach(address) as Lottery;
  }
  override connect(signer: Signer): Lottery__factory {
    return super.connect(signer) as Lottery__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): LotteryInterface {
    return new utils.Interface(_abi) as LotteryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Lottery {
    return new Contract(address, _abi, signerOrProvider) as Lottery;
  }
}
