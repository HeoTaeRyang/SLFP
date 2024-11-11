from deepface import DeepFace
import numpy as np


def find_similar_player(img_path):
  embedding_file = 'backend/ai/reference_embeddings.npy'
  paths_file = 'backend/ai/reference_image_paths.npy'
  reference_embeddings = np.load(embedding_file)
  reference_image_paths = np.load(paths_file)

  img_embedding = DeepFace.represent(img_path=img_path,
                                      model_name='Facenet',
                                      detector_backend='retinaface')[0]["embedding"]

  reference_embeddings = np.array(reference_embeddings)
  img_embedding = np.array(img_embedding)
  distances = np.linalg.norm(reference_embeddings - img_embedding, axis=1)
  closest_index = np.argmin(distances)
  
  # print("유사도 거리:", distances[closest_index])
  
  return(reference_image_paths[closest_index])
  