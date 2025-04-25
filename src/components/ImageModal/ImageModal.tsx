import Modal from 'react-modal';
import { IoIosClose, IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { Photo } from '../../types';

Modal.setAppElement('#root');

interface ImageModalProps {
  onClose: () => void;
  photo: Photo | null;
  onNext: () => void;
  onPrev: () => void;
}

export default function ImageModal({
  onClose,
  photo,
  onNext,
  onPrev,
}: ImageModalProps) {
  const isOpen = Boolean(photo);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        content: {
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          height: '80%',
          padding: '0',
          background: 'transparent',
          border: 'none',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
        },
      }}
    >
      {photo && (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              background: 'none',
              border: 'none',
              fontSize: '24px',
              color: '#fff',
            }}
          >
            <IoIosClose />
          </button>

          <img
            src={photo.urls.regular}
            alt={photo.alt_description}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              display: 'block',
            }}
          />

          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '0',
              right: '0',
              display: 'flex',
              justifyContent: 'space-between',
              zIndex: 1,
            }}
          >
            <button
              onClick={onPrev}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '30px',
                color: '#fff',
              }}
            >
              <IoIosArrowBack />
            </button>
            <button
              onClick={onNext}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '30px',
                color: '#fff',
              }}
            >
              <IoIosArrowForward />
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}
