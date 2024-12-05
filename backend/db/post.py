from db.connect import con

MAX_PAGE = 10

def get_post_current_num():
    cursor = con.cursor()
    cursor.execute("SELECT MAX(Number) FROM Post;")
    res = cursor.fetchone()[0]
    if res:
        return res
    else:
        return 0

def get_post_num():
    cursor = con.cursor()
    cursor.execute("SELECT COUNT(*) FROM Post WHERE is_del = 0;")
    return cursor.fetchone()[0]

#페이지 개수 리턴
def get_max_page():
    num = get_post_num()
    if num % MAX_PAGE != 0:
        return num // MAX_PAGE + 1
    else:
        return num // MAX_PAGE

#입력한 페이지의 글들 리턴
def get_page_post_date(page):
    cursor = con.cursor()
    cursor.execute(f"SELECT number,title,id,datetime,view_count FROM Post WHERE is_del = 0 ORDER BY number DESC LIMIT {MAX_PAGE} OFFSET {page-1} * {MAX_PAGE};")
    return cursor.fetchall()

def get_page_post_views(page):
    cursor = con.cursor()
    cursor.execute(f"SELECT number,title,id,datetime,view_count FROM Post WHERE is_del = 0 ORDER BY view_count DESC, number DESC LIMIT {MAX_PAGE} OFFSET {page-1} * {MAX_PAGE};")
    return cursor.fetchall()

#제목 검색
def get_page_post_date_search(key,page):
    cursor = con.cursor()
    cursor.execute(f"SELECT number,title,id,datetime,view_count FROM Post WHERE is_del = 0 and title like '%{key}%' ORDER BY number DESC LIMIT {MAX_PAGE} OFFSET {page-1} * {MAX_PAGE};")
    return cursor.fetchall()

def get_page_post_views_search(key,page):
    cursor = con.cursor()
    cursor.execute(f"SELECT number,title,id,datetime,view_count FROM Post WHERE is_del = 0 and title like '%{key}%' ORDER BY view_count DESC, number DESC LIMIT {MAX_PAGE} OFFSET {page-1} * {MAX_PAGE};")
    return cursor.fetchall()

#입력한 번호의 글 리턴
def get_content_post(num):
    cursor = con.cursor()
    cursor.execute(f"SELECT title,id,datetime,view_count,content FROM Post WHERE Number={num};")
    return cursor.fetchone()

#글 추가
def add_post(title,id,datetime,content):
    cursor = con.cursor()
    num = get_post_current_num()
    cursor.execute(f"INSERT INTO Post VALUES('{num+1}','{title}','{id}','{datetime}',0,'{content}',0);")
    con.commit()

#글 삭제
def del_post(num):
    cursor = con.cursor()
    cursor.execute(f"UPDATE Post SET is_del = 1 WHERE number='{num}';")
    con.commit()

#조회수 증가
def add_views_post(num):
    cursor = con.cursor()
    cursor.execute(f"UPDATE Post SET view_Count = View_Count + 1 WHERE number='{num}';")
    con.commit()
    
def get_id(num):
    cursor = con.cursor()
    cursor.execute(f"SELECT id FROM Post WHERE Number={num};")
    return cursor.fetchone()[0]