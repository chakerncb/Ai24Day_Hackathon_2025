import tensorflow as tf

def setup_gpu():
    gpus = tf.config.list_physical_devices('GPU')
    if gpus:
        try:
            # Limit TensorFlow to only use the first GPU
            tf.config.set_visible_devices(gpus[0], 'GPU')
            tf.config.experimental.set_memory_growth(gpus[0], True)
            print("GPU is set up correctly!")
        except RuntimeError as e:
            print(e)
    else:
        print("No GPU detected!")

setup_gpu()
