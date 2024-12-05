from db.connect import con

def get_record_batter(date,team,dh):
    cursor = con.cursor()
    cursor.execute(f"SELECT * FROM Record_batter WHERE date  = '{date}' and team='{team}' and dh = '{dh}';")
    return cursor.fetchall()

def get_record_pitcher(date,team,dh):
    cursor = con.cursor()
    cursor.execute(f"SELECT * FROM Record_pitcher WHERE date  = '{date}' and team='{team}' and (dh = '{dh}' or dh isnone);")
    return cursor.fetchall()