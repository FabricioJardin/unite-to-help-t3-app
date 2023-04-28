let authorize = {
  credentials:  {
    csrfToken: 'a3bab9ea63b133a252af8c432dfd44a9e33cb1f63c1f86b88c6879230443d64f',
    email: 'teste@teste.com',
    password: '123'
  },
  req: {
    query: {},
    body:  {
      csrfToken: 'a3bab9ea63b133a252af8c432dfd44a9e33cb1f63c1f86b88c6879230443d64f',
      email: 'teste@teste.com',
      password: '123'
    },
    headers: {
      'cache-control': 'max-age=0',
      'x-forwarded-host': 'localhost:3000',
      'x-forwarded-proto': 'http',
      'x-forwarded-port': '3000',
      'x-forwarded-for': '::1',
      cookie: 'next-auth.callback-url=http%3A%2F%2Flocalhost%3A3000%2F; next-auth.csrf-token=a3bab9ea63b133a252af8c432dfd44a9e33cb1f63c1f86b88c6879230443d64f%7C5f8ddc312cff6898259462f60080439e0439eb55615216d58fc6aa81c0871a21',
      'accept-language': 'en-US,en;q=0.9,pt;q=0.8',
      referer: 'http://localhost:3000/api/auth/signin?csrf=true',
      'sec-fetch-dest': 'document',
      'sec-fetch-user': '?1',
      'sec-fetch-mode': 'navigate',
      'sec-fetch-site': 'same-origin',
      accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36',
      'content-type': 'application/x-www-form-urlencoded',
      origin: 'http://localhost:3000',
      'upgrade-insecure-requests': '1',
      'sec-ch-ua-platform': '"Windows"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
      host: 'localhost:3000',
      'x-middleware-invoke': '',
      'x-invoke-path': '/api/auth/callback/credentials',
      'x-invoke-query': '%7B%7D',
      connection: 'close',
      'transfer-encoding': 'chunked'
    },
    method: 'POST'
  }
}

let signIn = {
  account: {
    providerAccountId: '1',
    type: 'credentials',
    provider: 'credentials'
  },
  user: { id: '1', name: 'J Smith', email: 'jsmith@example.com' },
  credentials:  {
    csrfToken: 'a3bab9ea63b133a252af8c432dfd44a9e33cb1f63c1f86b88c6879230443d64f',
    email: 'teste@teste.com',
    password: '123'
  },
  profile: undefined,
  email: undefined
}