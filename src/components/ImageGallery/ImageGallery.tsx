import ImageCard from './ImageCard';
import { Photo } from '../../types';
interface ImageGalleryProps {
  photos: Photo[];
  onImageClick: (photo: Photo) => void;
}

export default function ImageGallery({
  photos,
  onImageClick,
}: ImageGalleryProps) {
  return (
    <ul>
      {photos.map(photo => (
        <li key={photo.id}>
          <ImageCard photo={photo} onImageClick={onImageClick} />
        </li>
      ))}
    </ul>
  );
}
