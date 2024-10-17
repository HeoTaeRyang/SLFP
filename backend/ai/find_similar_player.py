import cv2
from deepface import DeepFace

#GPU 사용해서 실행 필요

#테스트 사진
test_path = 'backend/ai/data/tr.jpg'
test_img = cv2.imread(test_path)

for i in range(125): #0~124번 check
  img_path = 'backend/ai/data/' + str(i) + '.jpg'
  img = cv2.imread(img_path)
  if img is not None: #없는 번호 있을 수 있어서 check
    tmp = DeepFace.verify(img1_path=test_path,
                          img2_path=img_path,
                          detector_backend='retinaface',
                          model_name='Facenet')
    print(i,':',tmp['distance'])
    if i == 0:
      res = tmp
      res_n = i
    else:
      if res['distance'] > tmp['distance']: #distance 낮을수록 닮음
        res = tmp
        res_n = i

print(f"{res_n}번 선수")