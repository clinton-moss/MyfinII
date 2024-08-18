## Imports
import json
import sqlite3

from elasticsearch import (BadRequestError, ConflictError, ConnectionTimeout,
                           Elasticsearch)

es=Elasticsearch(hosts=["http://192.168.0.106:9200"],basic_auth=('elastic','Pass123'))

## Connect to sql lite
conn = sqlite3.connect(F'..\..\Dev.db')
# D:\Projects\MyfinII\Dev.db
# D:\Projects\MyfinII\Data\ETL
# Create a cursor object
cursor = conn.cursor()

## Pull table details
# query= """
# SELECT name FROM sqlite_master WHERE type='table';
# """
query= """
SELECT * FROM TransactionLedgerItem
LEFT JOIN Account ON Account.Id  = AccountId
"""
cursor.execute(query)

es_index = 'myfin_transaction_ledger_v2'

# Create index
try:
    es.indices.create(index=es_index)
except BadRequestError as err:
    print("Index already exists")

results = cursor.fetchall()
for row in results:
        d={}
        for i, col in enumerate(cursor.description):
            d[col[0]] = row[i]
            # result.append(d)
        try:
            obj = json.dumps(d, default=str)
            print(row[0],obj)
            # id = es_index +'_' + str(id_cnt)
            es.create(
                index=es_index,
                id=row[0],
                document= obj
            )

        except json.decoder.JSONDecodeError as err:
            print("Could not parse JSON")
        except ConflictError as err:
            print("Item Already existing for this version and ID")
        except ConnectionTimeout as err:
            print("Connection Timed Out when sending request")
        except BadRequestError as err:
            print("Invalid Request |", err)

## Log last ID

## Send to ES

## Close
# Close the connection when done
conn.close()


# GET myfin_transaction_ledger_v2/_mapping

# PUT myfin_transaction_ledger_v2
# {
#   "mappings": {
#     "properties": {
#       "AccountId": {
#         "type": "text",
#         "fields": {
#           "keyword": {
#             "type": "keyword",
#             "ignore_above": 256
#           }
#         }
#       },
#       "AccountName": {
#         "type": "text",
#         "fields": {
#           "keyword": {
#             "type": "keyword",
#             "ignore_above": 256
#           }
#         }
#       },
#       "AccountNumber": {
#         "type": "text",
#         "fields": {
#           "keyword": {
#             "type": "keyword",
#             "ignore_above": 256
#           }
#         }
#       },
#       "AccountType": {
#         "type": "text",
#         "fields": {
#           "keyword": {
#             "type": "keyword",
#             "ignore_above": 256
#           }
#         }
#       },
#       "Amount": {
#         "type": "float"
#       },
#       "DateTime": {
#         "type": "date",
#         "format": "yyyy-MM-dd HH:mm:ss||yyyy-MM-dd||epoch_millis"
#       },
#       "Description": {
#         "type": "text",
#         "fields": {
#           "keyword": {
#             "type": "keyword",
#             "ignore_above": 256
#           }
#         }
#       },
#       "Id": {
#         "type": "text",
#         "fields": {
#           "keyword": {
#             "type": "keyword",
#             "ignore_above": 256
#           }
#         }
#       }
#     }
#   }
# }


# POST _reindex
# {
#   "source": {
#     "index": "myfin_transaction_ledger"
#   },
#   "dest": {
#     "index": "myfin_transaction_ledger_v2"
#   }
# }