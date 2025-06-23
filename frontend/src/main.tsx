import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react';

import './index.css'
import App from './App.tsx'

const AUTH0_DOMAIN=import.meta.env.VITE_AUTH0_DOMAIN
const AUTH0_CLIENT_ID=import.meta.env.VITE_AUTH0_CLIENT_ID
const AUTH0_AUDIENCE=import.meta.env.VITE_AUTH0_AUDIENCE

console.log(AUTH0_DOMAIN)
console.log(AUTH0_CLIENT_ID)
console.log(AUTH0_AUDIENCE)

const isProduction = import.meta.env.VITE_MODE === 'production';
const redirect_uri = isProduction ? "https://qwdashboard.di.fc.ul.pt/websites-overview" : "http://localhost:8080/websites-overview";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    { AUTH0_DOMAIN && AUTH0_CLIENT_ID ? (
      <Auth0Provider
        domain={AUTH0_DOMAIN}
        clientId={AUTH0_CLIENT_ID}
        authorizationParams={{
          redirect_uri: redirect_uri,
          audience: AUTH0_AUDIENCE,
        }}
      >
        <App />
      </Auth0Provider>
    ): null}
  </StrictMode>,
)
