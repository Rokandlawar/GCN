import axios from "axios";
const token = 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjNBNjE4NUVCNEY3QkI3ODIyMUQyMThFMEQ1NEFBQzhFNUJDNzBCNjciLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoidXBhYWRtaW4iLCJzdWIiOiJNSFlNQlE0RTIzU1FPWVkwU1ZFOUs3UU8zN0JCVDBFSDFVSEU5V0s5RFlWVVhOVE9TQyIsInRva2VuX3VzYWdlIjoiYWNjZXNzX3Rva2VuIiwianRpIjoiMjFhNzA4NTctN2Y5NS00YTM0LTljMmItM2Y4NTRhMWJlY2JmIiwic2NvcGUiOlsicHJvZmlsZSIsIk9wZW5JZCJdLCJhdWQiOlsiQ29yZUNsaWVudCIsIkdhdGV3YXlDbGllbnQiLCJyZXNvdXJjZV9zZXJ2ZXIiLCJNYXN0ZXJBZG1pbkNsaWVudCJdLCJuYmYiOjE1ODU3NTIzNTgsImV4cCI6MTU4NTgzNjM1OCwiaWF0IjoxNTg1NzUyMzU4LCJpc3MiOiJodHRwOi8vZGV2ZWxvcG1lbnQuZGVsYXNvZnQuY29tOjg0NDMvYXV0aCJ9.Z75XDQpBT_ph283LbxqfAXcLnswXEND36IFboFvqJmiFGc65UFBCm1XmV8laSX_feO3zUjGsCQtDHo-AshmNK3w5W2wGc1vVTf3VjmxigEsPOiaI1SAHnKfTufZZPSNzPgLwfmo62c8cLJWayPXr-PBu_V6heW1WcRqk8VFIsV-t68JwYAB-_ayRzyJjNWcnUs19Gj0pzVY9UHNYXylU5MvcqKtVOaWw6PE-MFNvtC2g_M4DB5Dd57DWgj8SkDIxq5CdZ9BP5VIa2TXJjFgZNxNEOAwzkZgCt3YH09IryUMiosT3WzWN-Il0u_b0bYiQrKewA68oYGGdOLXw13rwKg'
export const GetData = (url) =>
    fetch(`${url}`, {
        method: 'GET',
        headers: {
            'Authorization': token
        }
    })
        .then(response => {
            if (response.ok) {
                return response.json()
            }
            else {
                throw response.json();
            }
        })


export const PostData = (url, bodyval) => {
    return fetch((`${url}`), {
        method: 'POST',
        headers: {
            //'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': token || '',
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Credentials": "true"
        },
        body: JSON.stringify(bodyval)

    }).then(response => {
        if (response.ok) { console.log('ok response', response); return response.json() }
        else {
            throw response.json();
        }
        //return response.json()
    })
}

export const PostDataNoBody = (url) => {
    return fetch((`${url}`), {
        method: 'POST',
        headers: {
            //'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': token || '',
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Credentials": "true"
        }
    }).then(response => {
        if (response.ok) { console.log('ok response', response); return response.json() }
        else {
            throw response.json();
        }
        //return response.json()
    })
}

export const PostFormData = (url, bodyval) => {
    let formData = new URLSearchParams();
    const bodyvalkeys = Object.keys(bodyval)
    bodyvalkeys.forEach(each => {
        formData.set(each, bodyval[each])
    })

    return fetch((`${url}`), {
        method: 'POST',
        headers: {
            //'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': token || '',
            'Content-Type': 'application/x-www-form-urlencoded',
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Credentials": "true"
        },
        body: formData

    }).then(response => {
        if (response.ok) { console.log('ok response', response); return response.json() }
        else {
            throw response.json();
        }
        //return response.json()
    })
}

export const PutData = (url, bodyval) => {
    if (bodyval) {
        return fetch((`${url}`), {
            method: 'PUT',
            headers: {
                //'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': token || '',
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization",
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
                "Access-Control-Allow-Credentials": "true"


            },
            body: JSON.stringify(bodyval)

        }).then(response => {
            if (response.ok) { console.log('ok response', response); return response.json() }
            else {
                throw response.json();
            }
            //return response.json()
        })
    }
    else{
        return fetch((`${url}`), {
            method: 'PUT',
            headers: {
                //'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': token || '',
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization",
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
                "Access-Control-Allow-Credentials": "true"
            },
            body: {}

        }).then(response => {
            if (response.ok) { console.log('ok response', response); return response.json() }
            else {
                throw response.json();
            }
            //return response.json()
        })
    }
    // else {
    //     return fetch((`${url}`), {
    //         method: 'PUT',
    //         headers: {
    //             //'Content-Type': 'application/x-www-form-urlencoded',
    //             'Authorization': token || '',
    //             'Content-Type': 'application/json',
    //         }

    //     }).then(response => response.json()).catch(res => res)
    // }

}

export const PutFormData = (url, bodyval) => {
    let formData = new URLSearchParams();
    const bodyvalkeys = bodyval && Object.keys(bodyval)
    bodyvalkeys && bodyvalkeys.forEach(each => {
        formData.set(each, JSON.stringify(bodyval[each]))
    })
    if (bodyval) {
        return fetch((`${url}`), {
            method: 'PUT',
            headers: {
                //'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': token || '',
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization",
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
                "Access-Control-Allow-Credentials": "true"


            },
            body: JSON.stringify(bodyval)

        }).then(response => {
            if (response.ok) { console.log('ok response', response); return response.json() }
            else {
                throw response.json();
            }
            //return response.json()
        })
    }
    else{
        return fetch((`${url}`), {
            method: 'PUT',
            headers: {
                //'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': token || '',
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization",
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
                "Access-Control-Allow-Credentials": "true"
            },
            body: {}

        }).then(response => {
            if (response.ok) { console.log('ok response', response); return response.json() }
            else {
                throw response.json();
            }
            //return response.json()
        })
    }
}
