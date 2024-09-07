import { Web3Provider } from '@ethersproject/providers'

export default function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider)
  library.pollingInterval = 15000
  // 监听网络错误事件，并停止轮询
  library.on('error', (error: any) => {
    if (error.code === 'NETWORK_ERROR') {
      console.log('Network error occurred. Retrying network detection...')
      library
        .detectNetwork()
        .then(network => {
          // console.log('Detected network change. New network ID:', network.chainId)
          console.log('New network name:', network.name)
          window.location.reload()
        })
        .catch((detectError: any) => {
          console.error('Error', detectError)
        })
    }
  })
  return library
}
