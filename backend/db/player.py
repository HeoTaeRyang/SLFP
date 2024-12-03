from db.connect import con

def add_player(name,number,roll):
    cursor = con.cursor()
    cursor.execute(f"INSERT INTO Player VALUES('{name}','{number}','{roll}');")
    con.commit()

def del_player(number):
    cursor = con.cursor()
    cursor.execute(f"DELETE FROM Player WHERE number='{number}';")
    con.commit()

def get_player_name(number):
    cursor = con.cursor()
    cursor.execute(f"SELECT name from Player WHERE number = '{number}';")
    return cursor.fetchone()[0]

def get_players(roll):
    cursor = con.cursor()
    cursor.execute(f"SELECT name,number from Player WHERE roll = '{roll}';")
    return cursor.fetchall()