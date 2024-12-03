from db.connect import con

def get_user(id):
    cursor = con.cursor()
    cursor.execute(f"SELECT * FROM User WHERE ID='{id}';")
    return cursor.fetchall()

def add_user(id,pw,name):
    cursor = con.cursor()
    cursor.execute(f"INSERT INTO User VALUES('{id}','{pw}','{name}',0);")
    con.commit()