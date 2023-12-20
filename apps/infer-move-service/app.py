from dotenv import load_dotenv
import os
import psycopg
load_dotenv()

def get_connection():
  DATABASE_URL = os.getenv('DATABASE_URL')
  CONNECTION_DICT = psycopg.conninfo.conninfo_to_dict(DATABASE_URL)
  conn = psycopg.connect(**CONNECTION_DICT)
  return conn

def main():
  conn = get_connection()
  res = conn.execute('''
    Select name from "Session" as s where "moveId" = 'clmb30cta0000m3j9cca5qb94';
  ''')
  moves = res.fetchall()
  print(moves)
  conn.close()

main()
