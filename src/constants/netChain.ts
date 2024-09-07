const toHex = (num: any) => {
  return '0x' + num.toString(16)
}

export const NET_CHAIN_LIST: any[] = [
  {
    title: 'Match Chain',
    img: './images/icon_MAT_token.png',
    params: {
      chainId: toHex(698),
      chainName: 'Matchain',
      nativeCurrency: {
        name: 'Matchain',
        symbol: 'BNB', // 2-6 characters long
        decimals: 18
      },
      rpcUrls: ['https://rpc.matchain.io'],
      blockExplorerUrls: ['https://matchscan.io/']
    }
  }
  // {
  //   title: 'Matchain Testnet',
  //   img: './images/icon_MAT_token.png',
  //   params: {
  //     chainId: toHex(699),
  //     chainName: 'Matchain Testnet',
  //     nativeCurrency: {
  //       name: 'Matchain Testnet',
  //       symbol: 'BNB', //
  //       decimals: 18
  //     },
  //     rpcUrls: ['https://testnet-rpc.matchain.io'],
  //     blockExplorerUrls: ['https://testnet.matchscan.io']
  //   }
  // },
  // {
  //   title: 'BNB Chain',
  //   img: './images/icon_BNB_token.png',
  //   params: {
  //     chainId: toHex(56),
  //     chainName: 'BNB Chain LlamaNodes',
  //     nativeCurrency: {
  //       name: 'BNB Chain LlamaNodes',
  //       symbol: 'BNB', //
  //       decimals: 18
  //     },
  //     rpcUrls: ['https://binance.llamarpc.com'],
  //     blockExplorerUrls: ['https://bscscan.com']
  //   }
  // }
]
