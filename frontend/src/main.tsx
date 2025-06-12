import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react';

import './index.css'
import App from './App.tsx'

const AUTH0_DOMAIN=import.meta.env.VITE_AUTH0_DOMAIN
const AUTH0_CLIENT_ID=import.meta.env.VITE_AUTH0_CLIENT_ID

console.log(AUTH0_DOMAIN)
console.log(AUTH0_CLIENT_ID)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    { AUTH0_DOMAIN && AUTH0_CLIENT_ID ? (
      <Auth0Provider
        domain={AUTH0_DOMAIN}
        clientId={AUTH0_CLIENT_ID}
        authorizationParams={{
          redirect_uri: "http://localhost:3000/websites-overview"
        }}
      >
        <App />
      </Auth0Provider>
    ): null}
  </StrictMode>,
)
