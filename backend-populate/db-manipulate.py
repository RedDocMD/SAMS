from pymongo import MongoClient
import datetime
import argparse

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

users = [
    {
        'username': 'deep',
        'password': 'blue',
        'type': 'Customer'
    },
    {
        'username': 'bob',
        'password': 'thebuilder',
        'type': 'Customer'
    },
    {
        'username': 'aaditya',
        'password': 'godspeed',
        'type': 'Customer'
    },
    {
        'username': 'motu',
        'password': 'samosa',
        'type': 'Salesperson'
    },
    {
        'username': 'patlu',
        'password': 'idea',
        'type': 'Salesperson'
    },
    {
        'username': 'borda',
        'password': 'chade',
        'type': 'Accountant'
    },
    {
        'username': 'mejda',
        'password': 'useless',
        'type': 'Accountant'
    },
    {
        'username': 'chorda',
        'password': 'overworked',
        'type': 'Accountant'
    },
]


def prepopulate():
    db.user.insert_many(users)
    db.show.insert_many(shows)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument(
        '-c', '--clear', help='Clear all data in test db', action='store_true')
    parser.add_argument('-p', '--populate',
                        help='Populate db with some init data', action='store_true')
    args = parser.parse_args()
    if args.clear:
        clear_all_collections()
    if args.populate:
        prepopulate()


if __name__ == '__main__':
    main()
