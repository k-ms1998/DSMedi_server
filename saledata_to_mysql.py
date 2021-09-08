import os
import sys
import pandas as pd
import mysql.connector
from sqlalchemy import create_engine
from dotenv import load_dotenv

load_dotenv()
hostname=os.getenv('DB_HOST')
uname=os.getenv('DB_USER')
pwd= os.getenv('DB_PASS')
dbname=os.getenv('DB_DATABASE')
engine = create_engine("mysql+pymysql://{user}:{pw}@{host}/{db}"
				.format(host=hostname, db=dbname, user=uname, pw=pwd))
mall = sys.argv[1]
mall = 'hmp'
if mall == 'hmp':
    data = pd.read_excel('./raw_data/hmp/2021_8_3.xlsx')
    df = pd.DataFrame(data, columns = ['주문번호', '거래처명', '거래처코드', '상품마스터ID', '상품명'])
    df.insert(loc=0, column='mall', value='hmp')
    df = df.rename(columns={'주문번호':'order_id', '거래처명':'storeName', '거래처코드':'store_id','상품마스터ID':'product_id', '상품명':'productName'})
    df.to_sql('saledata', engine, if_exists='append', index=False)
    print('Data Appended')

elif mall == 'theshop':
    print("theshop")
