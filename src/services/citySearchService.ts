import axios from 'axios'

export const getMainCityAddress = async () => {
  const response = await axios.get(
    'https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes?regcode_pattern=*00000000'
    //'https://www.kma.go.kr/DFSROOT/POINT/DATA/top.json.txt'
  )
  return response.data
}

export const getSubCityAddress = async (code: string) => {
  const response = await axios.get(
    `https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes?regcode_pattern=${code}*00000`
    //`https://www.kma.go.kr/DFSROOT/POINT/DATA/mdl.${code}.json.txt`
  )
  return response.data
}

export const getTertiaryCityAddress = async (code: string) => {
  const response = await axios.get(
    `https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes?regcode_pattern=${code}*&is_ignore_zero=true`
    //`https://www.kma.go.kr/DFSROOT/POINT/DATA/leaf.${code}.json.txt`
  )
  return response.data
}

export const getCityInfo = async (address: string) => {
  const authorization = '8d759d53a73457b19b97383dc8104cc5'
  const response = await axios.get(
    //'https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes?regcode_pattern=*00000000'
    //'https://www.kma.go.kr/DFSROOT/POINT/DATA/top.json.txt'
    `https://dapi.kakao.com/v2/local/search/address.json`,
    {
      headers: {
        Authorization: `KakaoAK ${authorization}`,
      },
      params: {
        query: address,
      },
    }
  )
  return response
}
