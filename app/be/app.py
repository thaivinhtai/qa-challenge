from flask import Flask, request, jsonify
from flask_cors import CORS
import uuid
import threading

app = Flask(__name__)
CORS(app)

# In-memory storage for mock database
invite_codes = {
    "test": {
        "usage_limit": 2,
        "usage_count": 0,
        "referrer": "test@foo.bar",
    }
}
email_registry = {}
wallet_registry = {}
admin_users = {"admin": "admin123"}  # Example admin credentials
lock = threading.Lock()


def is_admin(auth):
    """
    Check if the provided authorization credentials are valid admin credentials.

    Parameters
    ----------
    auth : dict
        Authorization credentials containing 'username' and 'password'.

    Returns
    -------
    bool
        True if valid admin credentials, False otherwise.
    """
    return auth and admin_users.get(auth.get("username")) == auth.get("password")


@app.route("/api/generateInvite", methods=["POST"])
def generate_invite():
    """
    Generate a unique invite code with a specified usage limit and referrer.

    Returns
    -------
    JSON
        Generated invite code and status code 201.
    """
    data = request.json
    usage_limit = data.get("usage_limit", 1)
    referrer = data.get("referrer", None)
    invite_code = str(uuid.uuid4())[:8]

    with lock:
        invite_codes[invite_code] = {
            "usage_limit": usage_limit,
            "usage_count": 0,
            "referrer": referrer,
        }

    return jsonify({"invite_code": invite_code}), 201


@app.route("/api/verifyCode", methods=["GET"])
def verify_code():
    """
    Verify if an invite code is valid and has not exceeded its usage limit.

    Returns
    -------
    JSON
        Validity status of the invite code.
    """
    code = request.args.get("code")
    with lock:
        if code in invite_codes and invite_codes[code]["usage_count"] < invite_codes[code]["usage_limit"]:
            return jsonify({"valid": True}), 200
    return jsonify({"valid": False, "error": "Invalid or expired code"}), 400


@app.route("/api/isEmailUsed", methods=["GET"])
def is_email_used():
    """
    Check if an email has already been registered.

    Returns
    -------
    JSON
        Whether the email is used.
    """
    email = request.args.get("email")
    with lock:
        if email in email_registry:
            return jsonify({"used": True}), 200
    return jsonify({"used": False}), 200


@app.route("/api/isWalletUsed", methods=["GET"])
def is_wallet_used():
    """
    Check if a wallet has already been used for registration.

    Returns
    -------
    JSON
        Whether the wallet is used.
    """
    wallet = request.args.get("wallet")
    with lock:
        if wallet in wallet_registry:
            return jsonify({"used": True}), 200
    return jsonify({"used": False}), 200


@app.route("/api/reserve", methods=["POST"])
def reserve():
    """
    Reserve a slot using an invite code, email, and wallet.

    Returns
    -------
    JSON
        Reservation success or failure message.
    """
    data = request.json
    code = data.get("code")
    email = data.get("email")
    wallet = data.get("wallet")
    signature = data.get("signature")

    with lock:
        if email in email_registry:
            return jsonify({"error": "Email already registered"}), 400
        if wallet in wallet_registry:
            return jsonify({"error": "Wallet already used"}), 400
        if code not in invite_codes or invite_codes[code]["usage_count"] >= invite_codes[code]["usage_limit"]:
            return jsonify({"error": "Invalid or expired invite code"}), 400

        invite_codes[code]["usage_count"] += 1
        email_registry[email] = {
            "invite_code": code,
            "referrer": invite_codes[code]["referrer"],
        }
        wallet_registry[wallet] = email

    return jsonify({"message": "Reservation successful"}), 200


@app.route("/api/getReferrer", methods=["GET"])
def get_referrer():
    """
    Retrieve the referrer associated with an invite code.
    This API is restricted to admin users.

    Returns
    -------
    JSON
        Referrer information or an error message.
    """
    auth = request.authorization
    if not is_admin(auth):
        return jsonify({"error": "Unauthorized"}), 403

    code = request.args.get("code")
    with lock:
        if code in invite_codes:
            return jsonify({"referrer": invite_codes[code]["referrer"]}), 200
    return jsonify({"error": "Invalid invite code"}), 400


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5050)
