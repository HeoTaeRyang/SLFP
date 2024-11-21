from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
import numpy as np
import base64
import sys
import os
import traceback
sys.path.append(os.path.dirname(os.path.abspath(__file__)) + "/..")

from ai import find_similar_player

app = Flask(__name__)
CORS(app)  # 모든 도메인에서 오는 요청을 허용

IMAGE_FOLDER = "./db/players"

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
        
        #db 연결시 번호 -> 이름 및 사진
        # 결과를 JSON 형식으로 반환
        return jsonify({
            'photo' : player_photo,
            'name': player_num,
        })
    except Exception as e:
        print("Error occurred:", e)
        print(traceback.format_exc())  # 전체 오류 메시지 출력
        return jsonify({'error': str(e)}), 500
    
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)