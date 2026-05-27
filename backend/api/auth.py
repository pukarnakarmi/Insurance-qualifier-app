import jwt
from flask import request, jsonify

SECRET_KEY = 'this_is_a_secret_key'

def generate_jwt(payload):
    # Generate JWT token
    token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')
    return token

def verify_jwt():
    # Middleware for API authorization
    token = request.headers.get('Authorization')
    if not token:
        return jsonify({"error": "Missing Token"}), 401
    
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        return payload
    except jwt.ExpiredSignatureError:
        return jsonify({"error": "Token Expired"}), 403
    except jwt.InvalidTokenError:
        return jsonify({"error": "Invalid Token"}), 403