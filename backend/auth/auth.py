from flask import Flask, request, jsonify
from functools import wraps
import jwt
import requests
import json
from urllib.parse import urljoin
import os
from datetime import datetime, timedelta
import logging
import sys

app = Flask(__name__)

AUTH0_DOMAIN = os.environ.get('AUTH0_DOMAIN')
AUTH0_AUDIENCE = os.environ.get('AUTH0_AUDIENCE')
AUTH0_ALGORITHMS = ['RS256']

jwks_cache = {'keys': None, 'expires': None}
JWKS_CACHE_DURATION = 3600

class AuthError(Exception):
    def __init__(self, error, status_code):
        self.error = error
        self.status_code = status_code

def get_jwks():
    global jwks_cache
    
    if (jwks_cache['keys'] and jwks_cache['expires'] and 
        datetime.now() < jwks_cache['expires']):
        return jwks_cache['keys']
    
    try:
        jwks_url = f"https://{AUTH0_DOMAIN}/.well-known/jwks.json"
        response = requests.get(jwks_url, timeout=10)
        response.raise_for_status()
        
        jwks = response.json()
        
        jwks_cache['keys'] = jwks
        jwks_cache['expires'] = datetime.now() + timedelta(seconds=JWKS_CACHE_DURATION)
        
        return jwks
    except Exception as e:
        print(f"Failed to fetch JWKS: {str(e)}", flush=True, file=sys.stderr)
        raise AuthError({
            'code': 'jwks_fetch_failed',
            'description': 'Unable to fetch JWKS'
        }, 500)

def get_token_from_header():
    auth_header = request.headers.get('Authorization')
    
    if not auth_header:
        raise AuthError({
            'code': 'authorization_header_missing',
            'description': 'Authorization header is expected'
        }, 401)
    
    parts = auth_header.split()
    
    if parts[0].lower() != 'bearer':
        raise AuthError({
            'code': 'invalid_header',
            'description': 'Authorization header must start with "Bearer"'
        }, 401)
    
    if len(parts) == 1:
        raise AuthError({
            'code': 'invalid_header',
            'description': 'Token not found'
        }, 401)
    
    if len(parts) > 2:
        raise AuthError({
            'code': 'invalid_header',
            'description': 'Authorization header must be Bearer token'
        }, 401)
    
    return parts[1]

def verify_token(token):
    try:
        unverified_header = jwt.get_unverified_header(token)
        
        jwks = get_jwks()
        
        rsa_key = {}
        for key in jwks['keys']:
            if key['kid'] == unverified_header['kid']:
                rsa_key = {
                    'kty': key['kty'],
                    'kid': key['kid'],
                    'use': key['use'],
                    'n': key['n'],
                    'e': key['e']
                }
                break
        
        if not rsa_key:
            raise AuthError({
                'code': 'invalid_header',
                'description': 'Unable to find appropriate key'
            }, 401)
        
        payload = jwt.decode(
            token,
            rsa_key,
            algorithms=AUTH0_ALGORITHMS,
            audience=AUTH0_AUDIENCE,
            issuer=f'https://{AUTH0_DOMAIN}/'
        )
        
        return payload
        
    except jwt.ExpiredSignatureError:
        raise AuthError({
            'code': 'token_expired',
            'description': 'Token has expired'
        }, 401)
    
    except jwt.JWTClaimsError:
        raise AuthError({
            'code': 'invalid_claims',
            'description': 'Incorrect claims, please check the audience and issuer'
        }, 401)
    
    except Exception as e:
        print(f"Token verification failed: {str(e)}", flush=True, file=sys.stderr)
        raise AuthError({
            'code': 'invalid_token',
            'description': 'Unable to parse authentication token'
        }, 401)


@app.route('/auth', methods=['GET', 'POST', 'PUT', 'DELETE', 'PATCH'])
def auth():
    try:
        token = get_token_from_header()
        payload = verify_token(token)
        
        response = app.make_response('', 200)
        
        response.headers['X-User-ID'] = payload.get('sub', '')
        response.headers['X-User-Email'] = payload.get('email', '')
        response.headers['X-User-Email-Verified'] = str(payload.get('email_verified', False))
        
        permissions = payload.get('permissions', [])
        if permissions:
            response.headers['X-User-Permissions'] = ','.join(permissions)
        
        scope = payload.get('scope', '')
        if scope:
            response.headers['X-User-Scope'] = scope.replace(' ', ',')
        
        if payload.get('exp'):
            response.headers['X-Token-Expires'] = str(payload.get('exp'))
        
        return response
        
    except AuthError as e:
        if e.status_code == 401:
            return '', 401
        else:
            return '', 403
        
        
@app.errorhandler(AuthError)
def handle_auth_error(ex):
    return jsonify(ex.error), ex.status_code

@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)