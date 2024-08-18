import os
from cryptography.hazmat.primitives.asymmetric import ec
from cryptography.hazmat.primitives import hashes, serialization
from cryptography import x509
from cryptography.x509.oid import NameOID
from cryptography.hazmat.backends import default_backend
import datetime

# File paths
private_key_path = "private_key.pem"
signature_path = "signature.sig"
cert_path = "my_certificate.crt"
message_path = "mensage.txt"

# Step 1: Check if the private key already exists
if os.path.exists(private_key_path):
    # Load the existing private key from the .pem file
    with open(private_key_path, "rb") as key_file:
        private_key = serialization.load_pem_private_key(
            key_file.read(),
            password=None,
            backend=default_backend()
        )
    print("Loaded existing private key.")
else:
    # Generate a new private key if it doesn't exist
    private_key = ec.generate_private_key(ec.SECP256R1(), default_backend())
    # Save the private key to a .pem file
    with open(private_key_path, "wb") as key_file:
        key_file.write(private_key.private_bytes(
            encoding=serialization.Encoding.PEM,
            format=serialization.PrivateFormat.PKCS8,
            encryption_algorithm=serialization.NoEncryption()
        ))
    print("Generated and saved a new private key.")

# Step 2: Read the message from mensage.txt
with open(message_path, "rb") as f:
    message = f.read()

# Step 3: Sign the message using the private key
signature = private_key.sign(
    message,
    ec.ECDSA(hashes.SHA256())
)

# Save the signature to a file
with open(signature_path, "wb") as f:
    f.write(signature)

# Step 4: Create a self-signed certificate
subject = issuer = x509.Name([
    x509.NameAttribute(NameOID.COUNTRY_NAME, u"US"),
    x509.NameAttribute(NameOID.STATE_OR_PROVINCE_NAME, u"California"),
    x509.NameAttribute(NameOID.LOCALITY_NAME, u"San Francisco"),
    x509.NameAttribute(NameOID.ORGANIZATION_NAME, u"My Company"),
    x509.NameAttribute(NameOID.COMMON_NAME, u"mycompany.com"),
])

cert = x509.CertificateBuilder().subject_name(
    subject
).issuer_name(
    issuer
).public_key(
    private_key.public_key()
).serial_number(
    x509.random_serial_number()
).not_valid_before(
    datetime.datetime.utcnow()
).not_valid_after(
    # Certificate valid for 1 day
    datetime.datetime.utcnow() + datetime.timedelta(days=1)
).add_extension(
    x509.SubjectAlternativeName([x509.DNSName(u"mycompany.com")]),
    critical=False,
).sign(private_key, hashes.SHA256(), default_backend())

# Step 5: Serialize the certificate to PEM format
cert_pem = cert.public_bytes(serialization.Encoding.PEM)

# Save the certificate to a .crt file
with open(cert_path, "wb") as f:
    f.write(cert_pem)
