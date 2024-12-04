from db.connect import con

def get_game_team_win_num(year,team):
    cursor = con.cursor()
    cursor.execute(f"SELECT count(*) from Game where year = '{year}' and ((home_team = '{team}' and home_result = '승') or (away_team = '{team}' and home_result = '패'));")
    return cursor.fetchone()[0]

def get_game_team_lose_num(year,team):
    cursor = con.cursor()
    cursor.execute(f"SELECT count(*) from Game where year = '{year}' and ((home_team = '{team}' and home_result = '패') or (away_team = '{team}' and home_result = '승'));")
    return cursor.fetchone()[0]

def get_game_team_draw_num(year,team):
    cursor = con.cursor()
    cursor.execute(f"SELECT count(*) from Game where year = '{year}' and (home_team = '{team}'or away_team = '{team}') and home_result = '무';")
    return cursor.fetchone()[0]

def get_game_month(year,month):
    cursor = con.cursor()
    cursor.execute(f"SELECT * from Game WHERE year = '{year}' and date like '{month}월%';")
    return cursor.fetchall()

def get_game_team_result(year,team):
    cursor = con.cursor()
    cursor.execute(f"SELECT * from Game where year = '{year}' and (home_team = '{team}' or away_team = '{team}');")
    return cursor.fetchall()