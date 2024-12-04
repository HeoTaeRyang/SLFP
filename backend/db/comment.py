from db.connect import con

#댓글 개수 리턴
def get_comment_num(num):
    cursor = con.cursor()
    cursor.execute(f"SELECT Count(*) FROM Comment WHERE post_number={num};")
    res = cursor.fetchone()[0]
    if res:
        return res
    else:
        return 0

#댓글들 리턴
def get_comment(num):
    cursor = con.cursor()
    cursor.execute(f"SELECT id,datetime,content FROM Comment WHERE post_number={num};")
    return cursor.fetchall()

def add_comment(num,id,datetime,content):
    cursor = con.cursor()
    cursor.execute(f"INSERT INTO Comment VALUES('{num}','{id}','{datetime}','{content}');")
    con.commit()