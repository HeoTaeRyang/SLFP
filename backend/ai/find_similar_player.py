from deepface import DeepFace
import numpy as np
import tempfile
import cv2
import os


def find_similar_player(img):
  embedding_file = 'ai/reference_embeddings.npy'
  paths_file = 'ai/reference_image_paths.npy'
  reference_embeddings = np.load(embedding_file)
  reference_image_paths = np.load(paths_file)
  
  # 이미지를 임시 파일로 저장
  _, img_path = tempfile.mkstemp(suffix='.jpg')
    
  img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
  # OpenCV로 이미지를 저장
  cv2.imwrite(img_path, img)

  img_embedding = DeepFace.represent(img_path=img_path,
                                      model_name='Facenet',
                                      detector_backend='retinaface')[0]["embedding"]

  # 임시 파일 삭제
  # os.remove(img_path)

  reference_embeddings = np.array(reference_embeddings)
  img_embedding = np.array(img_embedding)
  distances = np.linalg.norm(reference_embeddings - img_embedding, axis=1)
  closest_index = np.argmin(distances)
  
  # print("유사도 거리:", distances[closest_index])
  
  return(reference_image_paths[closest_index])
  