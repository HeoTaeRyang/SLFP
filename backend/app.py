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

from ai import find_similar_player

app = Flask(__name__)
CORS(app)  # 모든 도메인에서 오는 요청을 허용

IMAGE_FOLDER = "./db/players"

#자유게시판 페이지별 조회
# @app.route('/postPages', methods=['POST'])
# def get_PostPages():
#     try:
#         data = request.get_json()
#         number = data.get('pageNumber', '')
#         sortMethod = data.get('sortMethod', '')
#         key = data.get('searchKey', '')
        
#         totalPages = post.get_max_page()
#         pages = []
#         if sortMethod == 0:
#             tmp1 = post.get_page_post_date(number)
#         else:
#             tmp1 = post.get_page_post_views(number)
#         for i in tmp1:
#             comment_num = comment.get_comment_num("Post",i[0])
#             recommend_num = recommend.get_recommend_num(i[0])
#             tmp2 = {'id':i[0], 'title':i[1], 'user':i[2],'time':i[3],'views':i[4],'comments':comment_num, 'recommends':recommend_num}
#             pages.append(tmp2)

#         response = {
#             'totalPages' : totalPages,
#             'Pages' : pages
#         }
        
#         # 결과를 JSON 형식으로 반환
#         return jsonify(response)        
#     except Exception as e:
#         # 예외 처리: 에러 메시지를 클라이언트에 반환
#         return jsonify({'error': str(e)}), 500

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
    
# 선수 맞추기
@app.route('/matchPlayer', methods=['POST'])
def match_player():
    all_files = os.listdir(IMAGE_FOLDER)
    
    random_image_file = random.choice(all_files)
    random_image_path = os.path.join(IMAGE_FOLDER, random_image_file) 
    
    player_number = os.path.splitext(random_image_file)[0]
    
    with open(random_image_path, "rb") as f:
            player_photo = base64.b64encode(f.read()).decode('utf-8')
    
    player_name = player.get_player_name(player_number)

    random_player = {
        'number': player_name,
        'image': player_photo
    }
    
    return jsonify(random_player)

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

        print(id,date)
        print(user.get_last_login(id))
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
    
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)