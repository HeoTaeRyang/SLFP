from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
import numpy as np
import base64
import sys
import os
import traceback
from datetime import datetime as dt
sys.path.append(os.path.dirname(os.path.abspath(__file__)) + "/..")
import random
from werkzeug.security import generate_password_hash, check_password_hash
from backend.db import user
from backend.db import player
from backend.db import post
from backend.db import comment
from backend.db import recommend
from backend.db import game
from backend.db import record

from ai import find_similar_player

app = Flask(__name__)
CORS(app)  # 모든 도메인에서 오는 요청을 허용

IMAGE_FOLDER = "./db/players"

# 경기결과 달별 조회
@app.route('/gameResultMonth', methods=['POST'])
def get_gameResultMonth():
    try:
        data = request.get_json()
        year = data.get('year', '')
        month = data.get('month', '')
        games = []
        tmp1 = game.get_game_month(year,month)
        for i in tmp1:
            tmp2 = {'day':i[1].split()[1][:-1], 'time':i[2], 'stadium':i[3],'status':i[4],'home_team':i[5],'away_team':i[6],'home_result':i[7],'home_score':i[8],'away_score':i[9],'home_pitcher':i[10], 'away_pitcher':i[11],'dh':i[-1]}
            games.append(tmp2)
        response = {
            'games' : games,
        }
        # 결과를 JSON 형식으로 반환
        return jsonify(response)        
    except Exception as e:
        # 예외 처리: 에러 메시지를 클라이언트에 반환
        return jsonify({'error': str(e)}), 500
    
@app.route('/gameResultDetail', methods=['POST'])
def get_gameResultDetail():
    try:
        data = request.get_json()
        year = data.get('year', '')
        month = data.get('month', '')
        day = data.get('day', '')
        home_team = data.get('home_team','')
        away_team = data.get('away_team','')
        dh = data.get('dh','')
        
        dic = {
            'KIA':"HT",
            '삼성':"SS",
            'LG':"LG",
            '두산':"OB",
            'KT':"KT",
            'SSG':"SK",
            '롯데':"LT",
            '한화':"HH",
            'NC':"NC",
            '키움':"WO"
        }
        
        home_team = dic[home_team]
        away_team = dic[away_team]
        
        if len(month) == 1:
            month = '0' + month
        if len(day) == 1:
            day = '0' + day    
        
        date = year+'-'+month+'-'+day
        
        home_batter = []
        tmp = record.get_record_batter(date,home_team,dh)
        for i in tmp:
            tmp2 = {'bo':i[3], 'name':i[4], 'position':i[5],'ab':i[6],'r':i[7],'h':i[8],'rbi':i[9],'hr':i[10],'bb':i[11],'k':i[12], 'avg':i[13]}
            home_batter.append(tmp2)
        
        away_batter = []
        tmp = record.get_record_batter(date,away_team,dh)
        for i in tmp:
            tmp2 = {'bo':i[3], 'name':i[4], 'position':i[5],'ab':i[6],'r':i[7],'h':i[8],'rbi':i[9],'hr':i[10],'bb':i[11],'k':i[12], 'avg':i[13]}
            away_batter.append(tmp2)
            
        home_pitcher = []
        tmp = record.get_record_pitcher(date,home_team,dh)
        for i in tmp:
            tmp2 = {'name':i[3],'ip':i[4], 'h':i[5], 'r':i[6],'er':i[7],'bb':i[8],'k':i[9],'hr':i[10],'bf':i[11],'ab':i[12],'p':i[13], 'era':i[14], 'whs':i[15]}
            home_pitcher.append(tmp2)
            
            
        away_pitcher = []
        tmp = record.get_record_pitcher(date,away_team,dh)
        for i in tmp:
            tmp2 = {'name':i[3],'ip':i[4], 'h':i[5], 'r':i[6],'er':i[7],'bb':i[8],'k':i[9],'hr':i[10],'bf':i[11],'ab':i[12],'p':i[13], 'era':i[14], 'whs':i[15]}
            away_pitcher.append(tmp2)
        
        response = {
            'home_batters':home_batter,
            'away_batters':away_batter,
            'home_pitchers':home_pitcher,
            'away_pitchers':away_pitcher
        }
        # 결과를 JSON 형식으로 반환
        return jsonify(response)        
    except Exception as e:
        # 예외 처리: 에러 메시지를 클라이언트에 반환
        return jsonify({'error': str(e)}), 500
    
# 시즌 순위 조회
@app.route('/rank', methods=['POST'])
def get_rank():
    try:
        data = request.get_json()
        year = data.get('year', '')
        teams = ['KIA','삼성','LG','두산','KT','SSG','NC','한화','롯데','키움']
        rank = []
        for i in teams:
            win = game.get_game_team_win_num(year,i)
            lose = game.get_game_team_lose_num(year,i)
            draw = game.get_game_team_draw_num(year,i)
            games = win+lose+draw
            win_rate = round(win/(win+lose),3)
            rank.append([0,i,games,win,lose,draw,win_rate])
        rank.sort(key=lambda x:x[6],reverse=True)
        rank[0][0] = 1
        for i in range(1,10):
            if rank[i][6] == rank[i-1][6]:
                rank[i][0] = rank[i-1][0]
            else:
                rank[i][0] = i+1
        ranking = []
        for i in rank:
            tmp = {'rank':i[0], 'team':i[1], 'game':i[2],'win':i[3],'lose':i[4],'draw':i[5],'win_rate':i[6]}
            ranking.append(tmp)
        response = {
            'ranking' : ranking,
        }
        # 결과를 JSON 형식으로 반환
        return jsonify(response)        
    except Exception as e:
        # 예외 처리: 에러 메시지를 클라이언트에 반환
        return jsonify({'error': str(e)}), 500

# 자유게시판 페이지별 조회
@app.route('/postPages', methods=['POST'])
def get_PostPages():
    try:
        data = request.get_json()
        number = data.get('pageNumber', '')
        sortMethod = data.get('sortMethod', '')
        # key = data.get('searchKey', '')
        
        totalPages = post.get_max_page()
        pages = []
        if sortMethod == 0:
            tmp1 = post.get_page_post_date(number)
        else:
            tmp1 = post.get_page_post_views(number)
        for i in tmp1:
            comment_num = comment.get_comment_num(i[0])
            recommend_num = recommend.get_recommend_num(i[0])
            tmp2 = {'id':i[0], 'title':i[1], 'user':i[2],'time':i[3],'views':i[4],'comments':comment_num, 'recommends':recommend_num}
            pages.append(tmp2)
        response = {
            'totalPages' : totalPages,
            'Pages' : pages
        }
        
        # 결과를 JSON 형식으로 반환
        return jsonify(response)        
    except Exception as e:
        # 예외 처리: 에러 메시지를 클라이언트에 반환
        return jsonify({'error': str(e)}), 500
    
#자유게시판 작성
@app.route('/post', methods=['POST'])
def add_post():
    try:
        data = request.get_json()
        title = data.get('title', '')
        content = data.get('content', '')
        id = data.get('id', '')
        now = dt.now()
        datetime = now.strftime("%Y-%m-%d %H:%M:%S")
        post.add_post(title,id,datetime,content)
        res = "글 작성이 완료되었습니다"
        
        response = {
            'answer': res,
        }
        
        # 결과를 JSON 형식으로 반환
        return jsonify(response)
    except Exception as e:
        # 예외 처리: 에러 메시지를 클라이언트에 반환
        return jsonify({'error': str(e)}), 500
    
#자유게시판 게시글 조회
@app.route('/postLook', methods=['POST'])
def get_post():
    try:
        data = request.get_json()
        number = data.get('postNumber', '')
        
        post.add_views_post(number)
        tmp_post = post.get_content_post(number)
        tmp1 = comment.get_comment(number)
        recommends = recommend.get_recommend_num(number)
        comments = []

        free_post = {'title':tmp_post[0], 'id':tmp_post[1], 'datetime':tmp_post[2], 'views':tmp_post[3],'recommends':recommends, 'content':tmp_post[4]}

        for i in tmp1:
            tmp2 = {'id':i[0], 'datetime':i[1], 'content':i[2]}
            comments.append(tmp2)

        response = {
            'post' : free_post,
            'comments' : comments,
        }
        
        # 결과를 JSON 형식으로 반환
        return jsonify(response)        
    except Exception as e:
        # 예외 처리: 에러 메시지를 클라이언트에 반환
        return jsonify({'error': str(e)}), 500 
    
#자유게시판 추천 기능
@app.route('/recommend', methods=['POST'])
def add_recommend():
    try:
        data = request.get_json()
        id = data.get('id','')
        number = data.get('postNumber', '')

        if(recommend.get_recommend(id,number)):
            res = "이미 추천했습니다."
        else:
            recommend.add_recommend(id,number)
            res = "추천했습니다"
        
        response = {
            'answer': res,
        }
        
        # 결과를 JSON 형식으로 반환
        return jsonify(response)
    except Exception as e:
        # 예외 처리: 에러 메시지를 클라이언트에 반환
        return jsonify({'error': str(e)}), 500

#자유게시판 댓글 기능
@app.route('/comment', methods=['POST'])
def add_comment():
    try:
        data = request.get_json()
        number = data.get('postNumber','')
        content = data.get('content', '')
        id = data.get('id', '')
        now = dt.now()
        datetime = now.strftime("%Y-%m-%d %H:%M:%S")
        comment.add_comment(number,id,datetime,content)
        res = "댓글 작성이 완료되었습니다"
        
        response = {
            'answer': res,
        }
        
        # 결과를 JSON 형식으로 반환
        return jsonify(response)
    except Exception as e:
        # 예외 처리: 에러 메시지를 클라이언트에 반환
        return jsonify({'error': str(e)}), 500

#닮은 선수 찾기
@app.route('/findLike', methods=['POST'])
def find_player():
    file = request.files.get('image')
    if not file:
        return jsonify({"error": "No file uploaded"}), 400

    # 파일을 OpenCV 이미지로 읽기
    file_bytes = np.frombuffer(file.read(), np.uint8)
    img = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)
    
    try:
        # 닮은 선수 번호 가져오기
        player_num = find_similar_player.find_similar_player(img)
        
        # 폴더에서 이미지 가져오기
        server_image_path = os.path.join(IMAGE_FOLDER, f"{player_num}.jpg")
        if not os.path.exists(server_image_path):
            return jsonify({"error": "Server image not found"}), 404
        
        # 이미지를 Base64로 변환
        with open(server_image_path, "rb") as f:
            player_photo = base64.b64encode(f.read()).decode('utf-8')
        
        player_name = player.get_player_name(player_num)

        #db 연결시 번호 -> 이름 및 사진
        # 결과를 JSON 형식으로 반환
        return jsonify({
            'photo' : player_photo,
            'name': player_name,
        })
    except Exception as e:
        print("Error occurred:", e)
        print(traceback.format_exc())  # 전체 오류 메시지 출력
        return jsonify({'error': str(e)}), 500

# 회원가입
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    userid = data.get('id')
    password = data.get('password')
    username = data.get('username')
    now = dt.now()
    date = now.strftime("%Y-%m-%d")
    
    # 아이디 중복 확인
    check_id = user.get_user(userid)
    if check_id:
        return jsonify({'error': '이미 존재하는 아이디 입니다.'}), 400
    
    # 비밀번호 해시 처리
    hashed_password = generate_password_hash(password)
    
    # 사용자 추가
    user.add_user(userid, hashed_password, username,date)
    
    return jsonify({'message': '회원가입에 성공 했습니다.'}), 200

# 로그인
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    
    userid = data.get("id")
    password = data.get("password")
    
    # 사용자 존재 여부 확인
    ckeck_id = user.get_user(userid)
    if not ckeck_id:
        return jsonify({'error': '존재하지 않는 아이디 입니다.'}), 400
    
    db_password = ckeck_id[0][1]
    
    if not check_password_hash(db_password, password):
        return jsonify({'error': '잘못된 비밀번호 입니다.'}), 400
    
    return jsonify({'message': '로그인에 성공 했습니다.'}), 200    

#출석
@app.route('/attendence', methods=['POST'])
def attendence():
    try:
        data = request.get_json()
        id = data.get('id', '')
        
        now = dt.now()
        date = now.strftime("%Y-%m-%d")
        
        if(user.get_last_login(id) != date):
            user.set_last_login(id,date)
            user.add_point(id,100)
            res = "출석! 100포인트 지급."
        else:
            res = "이미 출석했습니다"
        
        response = {
            'answer': res,
        }
        
        # 결과를 JSON 형식으로 반환
        return jsonify(response)
    except Exception as e:
        # 예외 처리: 에러 메시지를 클라이언트에 반환
        return jsonify({'error': str(e)}), 500
    
# 선수단
@app.route('/players', methods=['POST'])
def players():
    data = request.get_json()
    type = data.get('type', '')
    
    result = player.get_player_info(type)
    
    numbers = [row[1] for row in result]
    
    combined_result = []
    for row in result:
        name, number, roll = row
        
        photo_path = os.path.join(IMAGE_FOLDER, f"{number}.jpg")
        
        if os.path.exists(photo_path):
            with open(photo_path, "rb") as f:
                photo_base64 = base64.b64encode(f.read()).decode('utf-8')
        else:
            photo_base64 = None
            
        combined_result.append({
            'name': name,
            'number': number,
            'roll': roll,
            'photo': photo_base64
        })
        
    return jsonify({'player': combined_result})

# 선수 맞추기
@app.route('/matchPlayer', methods=['POST'])
def match_player():
    random_player = player.get_random_player()
    target_number = random_player[0][1]
    
    result = []
    for row in random_player:
        name, number = row
        
        photo_path = os.path.join(IMAGE_FOLDER, f"{target_number}.jpg")
        
        if os.path.exists(photo_path):
            with open(photo_path, "rb") as f:
                photo_base64 = base64.b64encode(f.read()).decode('utf-8')
        else:
            photo_base64 = None
            
        result.append({
            'name': name,
            'number': number,
            'photo': photo_base64
        })
        
    return jsonify({'player': result})
    
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
    print(record.get_record_batter('2024-06-30','삼성',1))
    