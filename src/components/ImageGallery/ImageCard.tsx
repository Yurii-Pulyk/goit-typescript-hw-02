import { Photo } from '../../types';
import React from 'react';
interface ImageCardProps {
  photo: Photo;
  onImageClick: (photo: Photo) => void;
}

export default function ImageCard({ photo, onImageClick }: ImageCardProps) {
  const { urls, alt_description } = photo;
  return (
    <div onClick={() => onImageClick(photo)}>
      <img src={urls.small} alt={alt_description} />
    </div>
  );
}
