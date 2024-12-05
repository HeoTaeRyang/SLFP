from db.connect import con

def get_user(id):
    cursor = con.cursor()
    cursor.execute(f"SELECT * FROM User WHERE ID='{id}';")
    return cursor.fetchall()

def add_user(id,pw,name,date):
    cursor = con.cursor()
    cursor.execute(f"INSERT INTO User VALUES('{id}','{pw}','{name}',100,'{date}');")
    con.commit()

def add_point(id,point):
    cursor = con.cursor()
    cursor.execute(f"UPDATE User SET Point = Point + {point} WHERE ID='{id}';")
    con.commit()

def sub_point(id,point):
    cursor = con.cursor()
    cursor.execute(f"UPDATE User SET Point = Point - {point} WHERE ID='{id}';")
    con.commit()

def check_point(id,point):
    cursor = con.cursor()
    cursor.execute(f"SELECT Point from User WHERE ID = '{id}';")
    user_point = cursor.fetchone()[0]
    if user_point >= point:
        return 1
    else:
        return 0
    
def get_last_login(id):
    cursor = con.cursor()
    cursor.execute(f"SELECT date from User WHERE ID = '{id}';")
    return cursor.fetchone()[0]

def set_last_login(id,date):
    cursor = con.cursor()
    cursor.execute(f"UPDATE User SET date = '{date}' WHERE ID='{id}';")
    con.commit()
    
# 상위 포인트 10명
def get_point_user():
    cursor = con.cursor()
    cursor.execute("SELECT name, point FROM User ORDER BY point DESC LIMIT 10;")
    return cursor.fetchall()