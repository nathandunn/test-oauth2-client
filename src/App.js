import './App.css';
import axios from 'axios';
import GoogleLogin, {GoogleLogout} from "react-google-login";
import {useState} from "react";

// let authToken = 'eyJhbGciOiJIUzI1NiJ9.eyJwcmluY2lwYWwiOiJINHNJQUFBQUFBQUFBSlZVUzJ3YlJSZ2U1OTAwbEtSU3FcL1pBVmFGUWNXaDJiZGRPSEtLSytoRTdMcHM0c2VOQWpGUm5zanZlWFh0M1pqTTdhNjhqVWVXQ09JSkFyWUtvdUNCT3JjUVJ4QTF4UWhXSFZuQkJRaUNRZXFMY0VBOGhZR2E5aVZOUVZUR1N4enZcL1wvT1wvXC8rK2JPUXpEc1VoRFRLVFF0VjNJc1R6ZXg1RHJVeExxTFZJK2FyQ3RSNURLSlFJOFpVa25zVlJmUkV4XC8rY3ZcL2FtZHp6QXlDaWdPTWVsNnhTMGpBdHhNQUZoVkJkZHFDYWFNb3FvVWgyZWpkeWx0ZzJ3YUhlZ2s5Qm5DdUd3Um9VMnFoRGFFczZEQ3RzSmVGWlF5eklUc1FGd1lyOE5RQkdhMkFLcWlyeE1Gc2hlTkYzVElxMEdwanN5eFNpdG9Ub2xNcHZFR1ltdE55anFxTUl3MjBMYWJ3QVVSYmhVVTFlS25oYWFjSTJsRDFtV25JRnNRVUZqRG5RZFhsMkdnTW5lNWNXeExwY1lTSjFjU1wvU3hMeUNIWEFkRFBsT2hDXC9lMXVlRXFpVDhTRmxpV1VobEpzSHVkQlhiUkRNYnBnak9cL2U4OThcL2E5TjlcL2JxdzRBd0h0eThjazJmZm5aRE5pN2UrM1hjOEVVSWlvRHA0K2szbGRiOEIyZXpWVGY4enBGSXZLMys2dnYzSGo0eHF1RFBMTFF5UFwvXC9lVXludzg1MStYUWRTQ0VqUjJiRTNYYUd4RGQzbm5teTg0TXBkS1dLYVRzV0tsQ0lHZElPUVwvUWQ4M0tIS0xFTytzM0FzWEpKV2F4WEs0dGxuNEhCRlRuTndLbFliRGFhVE1RU3M4bEVjajRlajZhU2lWU0NaeUtKVEFKOGhxZ09BU3JwaE9nV2lrdUYzbitJMVAyekxcLzM1eGRiMzcwNEU4N253T09PU1NETWVEWTIrK1wvR2NPblg3cTdkNlJ0TjlvNkRRQTV0SEdQSGc4ajcreUp1KzJ6TjU5akVtMVQ3VlhwdjVvZkxnNHMzN3dzQVJuVGo1NkpTWG9Hc3NRMmQ0OUp2UFBqKzlkVzhRRE9UQnVFV2dsb2NxSDFNUkhHTUc1N1pCTE0xM1hyd1NOSGVpTThiM1NmNGJZMkNDY3dtNWJwMlJGcWNQK0tBTDRcL05TT3BwdUxNMVdsdFA1alZpZWJOZmlwRjVVMU5tbGpmWmNwbFRPcERycnJxcVZvaXU3Y1g5bExYRjFwK2pDdEpGcHhqYkxlZDFPTFhtNXVYUjh4OTl0dnRKZFNyWG9kamEyNk8zTUZBditYSzQxMDQybTRGclR5ZWIxUWlteldhdWs0dHVsVFdVK204dzNHN2xXWWQxWWE3VEtHVlpZcmx2VnF4dlZWYWRzZDNZcmxiYUI2MFVONXVxSlhRWk9JSnVqczk1R2xOTUZhWWN0RVl5Vk1vU0RCdUl2ejlPOXIyXC85OFRNSFVnME10NkhsSVU1YUJvWUVoeGs0dmdLWkFmSDVuSWQ1MlNNV1VhR0Z1S1BKZm0rVlFIYjl0Nm10VzlIZmZ4b0VJMFV3WnZCK3EwUkRDaGdObmlEYURlQ3BnSEhrTTRSZFFlUlFNaWF5OGFDT3d2T0lxMUxUWWVGcHRBMnB5YUVmb3Z0dnZoZ0E0alROd0FEQ3dWZXdjYkNQNjJZYjRYb3Y4NUZlNXJ5RUJyUk5xeHVLaDNxVkRBZXRZV0FLYVwveHNveXU2T0hOODJReU1PcWJLUENyS25Bakt4SWhKMVhMeFRzU1hzdThYYnc4S3pvMjR3WXQzeUxxWERjWWM5d1ZadG94TElYdkVBNkVTVGx2TWhHTVp6c2pwa2hGTEZJeUM1K2NxaTRyYXN1ZTBidDVjaHJWY0UxVlNMVXRQN3M3cnpVSmh2UWd2WFhibloyZFUzdzhhZFNZRUpUZ0VKZkE3RWZCZmxQTzM3TlBjNnpkdWZ2SnhJbmpMT2hOQ1wvOEM2NXl6Mkx5RURUNFU4ejFvbXo5YnhcL3dGUFc4cGhEUWNBQUE9PSIsInN1YiI6IjExNjA1NDE0NjU0NTkyMjA4NTQ4NCIsInJvbGVzIjpbIlJPTEVfVVNFUiJdLCJpc3MiOiJTcHJpbmcgU2VjdXJpdHkgUkVTVCBHcmFpbHMgUGx1Z2luIiwiZXhwIjoxNjE0MjIxNzk5LCJpYXQiOjE2MTQyMTgxOTl9.yqMrqakUAlvdr-QlKeF8VZCrcegDKBtxHc0-8SIbw40'
// let authToken = null

export const refreshTokenSetup = (res) => {
    let refreshTiming = (res.tokenId.expires_in || 3600 - 5 * 60) * 1000

    const refreshToken = async () => {
        const newAuthRes = await res.reloadAuthResponse()
        refreshTiming = (newAuthRes.expires_in || 3600 - 5 * 60) * 1000
        console.log('newAuthRes:', newAuthRes)
        console.log('new auth token:', newAuthRes.id_token)
        setTimeout(refreshToken, refreshTiming)
    }
    setTimeout(refreshToken, refreshTiming)
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

export async function testA() {


    console.log('test A')
    console.log(document.cookie)
    // authToken = getCookie('jwt')
    console.log('auth token')
    // console.log(authToken)

    // if(authToken){
    const config = {
        headers: {
            // 'Content-Type': 'multipart/form-data',
            'Access-Control-Allow-Origin': '*',
            // 'Cookie':'JSESSIONID=B3CC0AD705E2AFEA3B1C378059789752; jwt=eyJhbGciOiJIUzI1NiJ9.eyJwcmluY2lwYWwiOiJINHNJQUFBQUFBQUFBSlZWWFd3VVZSUysyMjVwZ1FvdENvSkpjZFhLajVhWlVoYmEwaEIrMmdJTmE0dGROMUZNV09cL08zTjI5ZFBiZThkNHozZTBEQ2lyeW9GR2lRa2hNakFcLzZCSW1QR2g5TWlDOG1QRUZNVEV5TUJoTVNFM2swdkJuUG5abmQyZFlRZEI0bWszUHZPZWM3M1wvbk9tZXYzU0pkV1pIZEZVZTVweVwvZUNDaGVXOWhVWEZjMmNRSEZZc2hUVFlFa2FRTldhTSsrQ1ptcmRsM1wvZFByMTVha2NIU2VYSTJnQXRKNVVzYzQ4QjJaYVRxbUw3MU1tZXNSMnBtTzFISlwvYWtyTldraU85Tk5CUVp3WXR4c3JLaU5WYVhhc0ZxcFRXK2xvbnNNZ2pSbWJ3a2ZGSlwvZDVEdVU2U2ZPbzRNQk14S01kM3d1V0x1S2RLWDJITFNXVENtalE2ZU1BR2NlcnI5YWpjVHRPUXhGd3N3WlVuTXlyRlVzajUzaGk1U093RHUyWGtHRXpuUzQxT3RFWjBMWkVOMDZGRlJzZk5nb0p0ekExTmdCYStUTjBpNjRhZndRVnFmTlZjdEU4ZWFsSjdISE9CUzZNR0NxRW1YbDdsSmp2SFBEWHgwNjhOUHp4VTZDRUZPaGg3dWs5aTNIQ0huYnA2K3Z6WHNRc29Cc3FrTmVuSnRvdUVqbXY0azhrdUttY3lcL1hEMzU4ZVY3RjFcL3R4TXpteHRIXC8zNFwvQnd6RnpTOWhkbnlvS3NxMUhHTGFlTnQ4WVwvTWpEZ3plN3NHVGxlYzMzMkRGRkJUQzNsU0lKak9XbWxmU2FmQU5aUFQrWG15NFc4dFB6RFNDZHNcL1poSUt0RzkrNGVHYzFpNmlHVE9oUmtMT05Za1ZhRlF6VW9XY2M0SEE5S3NUQXZ2WFwvMnJUc2pMNVo3dzNac2U1RHJuRUUxTWh3N1wvZnI3VnFmXC8ybytYSXFmQnhDbXNxK216YkFEdUhyZ3F2Z29HYjBZdVR6XC9BcFpCTTF0bGRkXC9KM2g2N2NOZzYrS1h6RDhxWWVwN3I2QXZXN3VuKys4ZjJtMTI1MWtvNmpaSTBucVh1VU90aVZHYklhcWpqS1ZlbTVEZlwvZ29aREw0WG9QdnMzM0ZxU3R4Q1dRWlwvSk1jS2t5ZVllYm1TbHpKNU9YWmFoVHhUTFRBdGNEWXdySUdwd3BpcjBwVWtBVTZ4SVVVMml0bmptZk92RUtiQWwxWlRLazdFdHZQdmtEZGlaZDhtUUZ5SE5WQUgrXC9iWmVZV21BZVd5cEozd3FYQnBQWWRsdFFxRkt4eXcyRXNJRjBvUXNYbURJeUd5c0dnaVVmZDAzYThBUGtVWkJBdlNLS2F4SFRGeFh6cFc2UlkwYlZta0VoVlpqYWNPZnpMKzZmdnppR0Nwb2hYWXZVQ3hpUzM1ZmNtdzFxQ09yZDY1Y0gxbjd5MjN1aGdwR2NKNEE4MGd4ZTRScTBOdnh2TTJKRVhJSHZOcWt3NW9HdzR2cFBONTZ2WXNWclhLNFhpb0dtRlJZN1BiWHZEd3puNEhUU2tnd0hKZ2xIZ0hRN1pwREVFcEN0T1ZwWFREZ3NjeVRtS1ROTHpUeFRMNU9qSlN4YjFnWG1YVjUyTTlSbUlMMStVUEs0cytMZ0F5QnJjZCtqQzFWRmppc05rNlo5ckI0WjJcL25mSmdVdmZcL2ZPaGNmZXZ2M25WQWRKNTFaVWc4RGFsbVRNUEc3SmRHdEQ1aEJhQkhyZVFETTJQT1wvU21EbThNQkVKZkJnMWlRQ2F5TGV2ajc3Mjc5MDVpYkpnTmR4Q3VKQVRXUnp5U3A1VmtZdEo1Y3ViMVl2eEFvVSsyNDMrTkFxUStyeFpHdEp1bSsybTdYYWQ5ZUx2aEdsZEJMbUEwMEIyakpXeTQzUlBlZFwvdzNyRTk3cWhER1J2TmpvOW4zZDNEN2xnNVczYkw0M3ZvdnRHeGNkeElaZVJFMWxsYmRcL3RRRGpIdkNBUHA3ZzJGSnhoWWhmbVo2Nm1HTmZuWnpMVk9zOTFXNmZEZjB0cHZJeTNFb2IrT1VSdkFqa1NHQlVRRjJOSFNPN2g0SU50b1lUQVwvOHlhR3g0SDBWS0htaFFpTThRU1FnV2J3TmlvU0VzelltczZoYkdaRFkyWXFwS2JIazA0b1J5QWI1eFNyU0RHVUtRaU9rNURKQTdaV044TDRtK05WUThKVjAyZStHdlVVK2ZmdXdoXC9TdDFNWExsXC81NXV0c3REaDZ6ZjJtZHhUczVSVkdiRkFreVVuUGJDdVwvOFErd01ITmYwUWdBQUE9PSIsInN1YiI6Ijc1MTI3NCIsInJvbGVzIjpbIlJPTEVfVVNFUiJdLCJpc3MiOiJTcHJpbmcgU2VjdXJpdHkgUkVTVCBHcmFpbHMgUGx1Z2luIiwiZXhwIjoxNjE0MjA3MjkxLCJpYXQiOjE2MTQyMDM2OTF9.l_wODAXyAO7HMnvqMmtB3vK4gtqTpK3EKtv7Mdxbf0w',
            // 'Set-Cookie':'JSESSIONID=B3CC0AD705E2AFEA3B1C378059789752; jwt=eyJhbGciOiJIUzI1NiJ9.eyJwcmluY2lwYWwiOiJINHNJQUFBQUFBQUFBSlZWWFd3VVZSUysyMjVwZ1FvdENvSkpjZFhLajVhWlVoYmEwaEIrMmdJTmE0dGROMUZNV09cL08zTjI5ZFBiZThkNHozZTBEQ2lyeW9GR2lRa2hNakFcLzZCSW1QR2g5TWlDOG1QRUZNVEV5TUJoTVNFM2swdkJuUG5abmQyZFlRZEI0bWszUHZPZWM3M1wvbk9tZXYzU0pkV1pIZEZVZTVweVwvZUNDaGVXOWhVWEZjMmNRSEZZc2hUVFlFa2FRTldhTSsrQ1ptcmRsM1wvZFByMTVha2NIU2VYSTJnQXRKNVVzYzQ4QjJaYVRxbUw3MU1tZXNSMnBtTzFISlwvYWtyTldraU85Tk5CUVp3WXR4c3JLaU5WYVhhc0ZxcFRXK2xvbnNNZ2pSbWJ3a2ZGSlwvZDVEdVU2U2ZPbzRNQk14S01kM3d1V0x1S2RLWDJITFNXVENtalE2ZU1BR2NlcnI5YWpjVHRPUXhGd3N3WlVuTXlyRlVzajUzaGk1U093RHUyWGtHRXpuUzQxT3RFWjBMWkVOMDZGRlJzZk5nb0p0ekExTmdCYStUTjBpNjRhZndRVnFmTlZjdEU4ZWFsSjdISE9CUzZNR0NxRW1YbDdsSmp2SFBEWHgwNjhOUHp4VTZDRUZPaGg3dWs5aTNIQ0huYnA2K3Z6WHNRc29Cc3FrTmVuSnRvdUVqbXY0azhrdUttY3lcL1hEMzU4ZVY3RjFcL3R4TXpteHRIXC8zNFwvQnd6RnpTOWhkbnlvS3NxMUhHTGFlTnQ4WVwvTWpEZ3plN3NHVGxlYzMzMkRGRkJUQzNsU0lKak9XbWxmU2FmQU5aUFQrWG15NFc4dFB6RFNDZHNcL1poSUt0RzkrNGVHYzFpNmlHVE9oUmtMT05Za1ZhRlF6VW9XY2M0SEE5S3NUQXZ2WFwvMnJUc2pMNVo3dzNac2U1RHJuRUUxTWh3N1wvZnI3VnFmXC8ybytYSXFmQnhDbXNxK216YkFEdUhyZ3F2Z29HYjBZdVR6XC9BcFpCTTF0bGRkXC9KM2g2N2NOZzYrS1h6RDhxWWVwN3I2QXZXN3VuKys4ZjJtMTI1MWtvNmpaSTBucVh1VU90aVZHYklhcWpqS1ZlbTVEZlwvZ29aREw0WG9QdnMzM0ZxU3R4Q1dRWlwvSk1jS2t5ZVllYm1TbHpKNU9YWmFoVHhUTFRBdGNEWXdySUdwd3BpcjBwVWtBVTZ4SVVVMml0bmptZk92RUtiQWwxWlRLazdFdHZQdmtEZGlaZDhtUUZ5SE5WQUgrXC9iWmVZV21BZVd5cEozd3FYQnBQWWRsdFFxRkt4eXcyRXNJRjBvUXNYbURJeUd5c0dnaVVmZDAzYThBUGtVWkJBdlNLS2F4SFRGeFh6cFc2UlkwYlZta0VoVlpqYWNPZnpMKzZmdnppR0Nwb2hYWXZVQ3hpUzM1ZmNtdzFxQ09yZDY1Y0gxbjd5MjN1aGdwR2NKNEE4MGd4ZTRScTBOdnh2TTJKRVhJSHZOcWt3NW9HdzR2cFBONTZ2WXNWclhLNFhpb0dtRlJZN1BiWHZEd3puNEhUU2tnd0hKZ2xIZ0hRN1pwREVFcEN0T1ZwWFREZ3NjeVRtS1ROTHpUeFRMNU9qSlN4YjFnWG1YVjUyTTlSbUlMMStVUEs0cytMZ0F5QnJjZCtqQzFWRmppc05rNlo5ckI0WjJcL25mSmdVdmZcL2ZPaGNmZXZ2M25WQWRKNTFaVWc4RGFsbVRNUEc3SmRHdEQ1aEJhQkhyZVFETTJQT1wvU21EbThNQkVKZkJnMWlRQ2F5TGV2ajc3Mjc5MDVpYkpnTmR4Q3VKQVRXUnp5U3A1VmtZdEo1Y3ViMVl2eEFvVSsyNDMrTkFxUStyeFpHdEp1bSsybTdYYWQ5ZUx2aEdsZEJMbUEwMEIyakpXeTQzUlBlZFwvdzNyRTk3cWhER1J2TmpvOW4zZDNEN2xnNVczYkw0M3ZvdnRHeGNkeElaZVJFMWxsYmRcL3RRRGpIdkNBUHA3ZzJGSnhoWWhmbVo2Nm1HTmZuWnpMVk9zOTFXNmZEZjB0cHZJeTNFb2IrT1VSdkFqa1NHQlVRRjJOSFNPN2g0SU50b1lUQVwvOHlhR3g0SDBWS0htaFFpTThRU1FnV2J3TmlvU0VzelltczZoYkdaRFkyWXFwS2JIazA0b1J5QWI1eFNyU0RHVUtRaU9rNURKQTdaV044TDRtK05WUThKVjAyZStHdlVVK2ZmdXdoXC9TdDFNWExsXC81NXV0c3REaDZ6ZjJtZHhUczVSVkdiRkFreVVuUGJDdVwvOFErd01ITmYwUWdBQUE9PSIsInN1YiI6Ijc1MTI3NCIsInJvbGVzIjpbIlJPTEVfVVNFUiJdLCJpc3MiOiJTcHJpbmcgU2VjdXJpdHkgUkVTVCBHcmFpbHMgUGx1Z2luIiwiZXhwIjoxNjE0MjA3MjkxLCJpYXQiOjE2MTQyMDM2OTF9.l_wODAXyAO7HMnvqMmtB3vK4gtqTpK3EKtv7Mdxbf0w',
            // 'Authorization': `Bearer jwt=${authToken}`,
            // 'Bearer': `Bearer jwt=${authToken}`,
            // 'Set-Cookie': `jwt=${authToken}`,
            'withCredentials': true,
            'credentials': 'include',

        }
    }
    // const {data} = await axios.get(`${ANALYSIS_SERVER_URL}/gmt/names/?method=${method}`,config)
    // curl -v -H 'Accept: application/json' -H "Cookie: jwt=eyJhbGciOiJIUzI1NiJ9.eyJwcmluY2lwYWwiOiJINHNJQUFBQUFBQUFBSlZWWFd3VVZSUysyMjVwZ1FvdENvSkpjZFhLajVhWlVoYmEwaEIrMmdJTmE0dGROMUZNV09cL08zTjI5ZFBiZThkNHozZTBEQ2lyeW9GR2lRa2hNakFcLzZCSW1QR2g5TWlDOG1QRUZNVEV5TUJoTVNFM2swdkJuUG5abmQyZFlRZEI0bWszUHZPZWM3M1wvbk9tZXYzU0pkV1pIZEZVZTVweVwvZUNDaGVXOWhVWEZjMmNRSEZZc2hUVFlFa2FRTldhTSsrQ1ptcmRsM1wvZFByMTVha2NIU2VYSTJnQXRKNVVzYzQ4QjJaYVRxbUw3MU1tZXNSMnBtTzFISlwvYWtyTldraU85Tk5CUVp3WXR4c3JLaU5WYVhhc0ZxcFRXK2xvbnNNZ2pSbWJ3a2ZGSlwvZDVEdVU2U2ZPbzRNQk14S01kM3d1V0x1S2RLWDJITFNXVENtalE2ZU1BR2NlcnI5YWpjVHRPUXhGd3N3WlVuTXlyRlVzajUzaGk1U093RHUyWGtHRXpuUzQxT3RFWjBMWkVOMDZGRlJzZk5nb0p0ekExTmdCYStUTjBpNjRhZndRVnFmTlZjdEU4ZWFsSjdISE9CUzZNR0NxRW1YbDdsSmp2SFBEWHgwNjhOUHp4VTZDRUZPaGg3dWs5aTNIQ0huYnA2K3Z6WHNRc29Cc3FrTmVuSnRvdUVqbXY0azhrdUttY3lcL1hEMzU4ZVY3RjFcL3R4TXpteHRIXC8zNFwvQnd6RnpTOWhkbnlvS3NxMUhHTGFlTnQ4WVwvTWpEZ3plN3NHVGxlYzMzMkRGRkJUQzNsU0lKak9XbWxmU2FmQU5aUFQrWG15NFc4dFB6RFNDZHNcL1poSUt0RzkrNGVHYzFpNmlHVE9oUmtMT05Za1ZhRlF6VW9XY2M0SEE5S3NUQXZ2WFwvMnJUc2pMNVo3dzNac2U1RHJuRUUxTWh3N1wvZnI3VnFmXC8ybytYSXFmQnhDbXNxK216YkFEdUhyZ3F2Z29HYjBZdVR6XC9BcFpCTTF0bGRkXC9KM2g2N2NOZzYrS1h6RDhxWWVwN3I2QXZXN3VuKys4ZjJtMTI1MWtvNmpaSTBucVh1VU90aVZHYklhcWpqS1ZlbTVEZlwvZ29aREw0WG9QdnMzM0ZxU3R4Q1dRWlwvSk1jS2t5ZVllYm1TbHpKNU9YWmFoVHhUTFRBdGNEWXdySUdwd3BpcjBwVWtBVTZ4SVVVMml0bmptZk92RUtiQWwxWlRLazdFdHZQdmtEZGlaZDhtUUZ5SE5WQUgrXC9iWmVZV21BZVd5cEozd3FYQnBQWWRsdFFxRkt4eXcyRXNJRjBvUXNYbURJeUd5c0dnaVVmZDAzYThBUGtVWkJBdlNLS2F4SFRGeFh6cFc2UlkwYlZta0VoVlpqYWNPZnpMKzZmdnppR0Nwb2hYWXZVQ3hpUzM1ZmNtdzFxQ09yZDY1Y0gxbjd5MjN1aGdwR2NKNEE4MGd4ZTRScTBOdnh2TTJKRVhJSHZOcWt3NW9HdzR2cFBONTZ2WXNWclhLNFhpb0dtRlJZN1BiWHZEd3puNEhUU2tnd0hKZ2xIZ0hRN1pwREVFcEN0T1ZwWFREZ3NjeVRtS1ROTHpUeFRMNU9qSlN4YjFnWG1YVjUyTTlSbUlMMStVUEs0cytMZ0F5QnJjZCtqQzFWRmppc05rNlo5ckI0WjJcL25mSmdVdmZcL2ZPaGNmZXZ2M25WQWRKNTFaVWc4RGFsbVRNUEc3SmRHdEQ1aEJhQkhyZVFETTJQT1wvU21EbThNQkVKZkJnMWlRQ2F5TGV2ajc3Mjc5MDVpYkpnTmR4Q3VKQVRXUnp5U3A1VmtZdEo1Y3ViMVl2eEFvVSsyNDMrTkFxUStyeFpHdEp1bSsybTdYYWQ5ZUx2aEdsZEJMbUEwMEIyakpXeTQzUlBlZFwvdzNyRTk3cWhER1J2TmpvOW4zZDNEN2xnNVczYkw0M3ZvdnRHeGNkeElaZVJFMWxsYmRcL3RRRGpIdkNBUHA3ZzJGSnhoWWhmbVo2Nm1HTmZuWnpMVk9zOTFXNmZEZjB0cHZJeTNFb2IrT1VSdkFqa1NHQlVRRjJOSFNPN2g0SU50b1lUQVwvOHlhR3g0SDBWS0htaFFpTThRU1FnV2J3TmlvU0VzelltczZoYkdaRFkyWXFwS2JIazA0b1J5QWI1eFNyU0RHVUtRaU9rNURKQTdaV044TDRtK05WUThKVjAyZStHdlVVK2ZmdXdoXC9TdDFNWExsXC81NXV0c3REaDZ6ZjJtZHhUczVSVkdiRkFreVVuUGJDdVwvOFErd01ITmYwUWdBQUE9PSIsInN1YiI6Ijc1MTI3NCIsInJvbGVzIjpbIlJPTEVfVVNFUiJdLCJpc3MiOiJTcHJpbmcgU2VjdXJpdHkgUkVTVCBHcmFpbHMgUGx1Z2luIiwiZXhwIjoxNjE0MjA3MjkxLCJpYXQiOjE2MTQyMDM2OTF9.l_wODAXyAO7HMnvqMmtB3vK4gtqTpK3EKtv7Mdxbf0w" http://localhost:8080/api/
    // const {data} = await axios.post(`http://localhost:8080/api`,{},config)
    const {data} = await axios.get(`http://localhost:8080/api`, config)
    return data
    // }
    // else{
    //   console.log('no auth token')
    // }
}

export default function App(props) {

    // const clientId = "654629507592-9i8vh19esnv2f5is1roofl3c9v7sla54.apps.googleusercontent.com"

    console.log('input props')
    const [authorized,setAuthorized] = useState('unauthorized');



    // testA().then(
    //     (res) => {
    //         console.log('return')
    //     },
    //     (err) => {
    //         console.error(err)
    //     }
    // )

    return (
        <div className="App">
                Authorized: {authorized}
                <GoogleLogin
                    clientId="654629507592-9i8vh19esnv2f5is1roofl3c9v7sla54.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={(response) => {
                        console.log('response', response)
                        refreshTokenSetup(response)
                        setAuthorized('authorized')
                        // testA().then(
                        //     (res) => {
                        //         console.log('follow up response')
                        //     },
                        //     (err) => {
                        //         console.log('follow up err', err)
                        //     },
                        // )
                    }}
                    onFailure={(err) => console.error('error', err)}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                />


                <GoogleLogout
                    clientId="654629507592-9i8vh19esnv2f5is1roofl3c9v7sla54.apps.googleusercontent.com"
                    buttonText="Logout"
                    onLogoutSuccess={(response) => {
                        setAuthorized('unauthorized')
                    }}
                    onFailure={(err) => console.error('error', err)}
                    // onLogoutSuccess={logout}
                >
                </GoogleLogout>
        </div>
    );
}

