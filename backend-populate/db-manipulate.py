from pymongo import MongoClient
import datetime

client = MongoClient('localhost', 27017)
db = client['test']


def clear_all_collections():
    for coll_name in db.list_collection_names():
        coll = db[coll_name]
        coll.drop()


show_date = datetime.date.today()

shows = [
    {
        'name': 'You Name',
        'date': show_date.strftime('%Y-%m-%d'),
        'time': '16:00:00',
        'duration': 'PT90M',
        'balconyTicketCount': 250,
        'balconyTicketPrice': 1000,
        'regularTicketCount': 750,
        'regularTicketPrice': 500
    },
    {
        'name': 'DJ Aajgar',
        'date': show_date.strftime('%Y-%m-%d'),
        'time': '20:00:00',
        'duration': 'PT15M',
        'balconyTicketCount': 250,
        'balconyTicketPrice': 100,
        'regularTicketCount': 750,
        'regularTicketPrice': 50
    },
    {
        'name': 'Frozen 2',
        'date': show_date.strftime('%Y-%m-%d'),
        'time': '9:00:00',
        'duration': 'PT100M',
        'balconyTicketCount': 250,
        'balconyTicketPrice': 750,
        'regularTicketCount': 750,
        'regularTicketPrice': 400
    },
]
