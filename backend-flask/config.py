import os
from dotenv import load_dotenv

load_dotenv()

DEFAULT_PORT = 5005
PORT = int(os.getenv('PORT', DEFAULT_PORT))
DATABASE = ':memory:'  # Using in-memory SQLite database like the original