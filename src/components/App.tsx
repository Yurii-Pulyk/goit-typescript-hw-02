import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { fetchPhoto } from './SearchService';

import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import ErrorMessage from './ErrorMessage/ErrorMessage';
import LoadMoreBtn from './LoadMoreBtn/LoadMoreBtn';
import ImageModal from './ImageModal/ImageModal';

import { Photo } from '../types';

function App() {
  const [query, setQuery] = useState<string>('');
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [hasMorePhotos, setHasMorePhotos] = useState<boolean>(true);

  // Функція для пошуку фотографій
  const handleSearch = async (searchQuery: string): Promise<void> => {
    setQuery(searchQuery);
    setPage(1);
    setPhotos([]);
    setHasMorePhotos(true);
    await fetchPhotos(searchQuery, 1);
  };

  const handleLoadMore = async (): Promise<void> => {
    const nextPage = page + 1;
    setPage(nextPage);
    await fetchPhotos(query, nextPage);
  };

  // Функція для натискання на фото
  const handleImageClick = (photo: Photo): void => {
    setSelectedPhoto(photo);
  };

  // Функція для закриття модального вікна
  const closeModal = (): void => {
    setSelectedPhoto(null);
  };

  // Функція для отримання фото
  const fetchPhotos = async (
    searchQuery: string,
    page: number
  ): Promise<void> => {
    if (!searchQuery) return;

    if (page === 1) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }
    setError(null);
    try {
      const data = await fetchPhoto(searchQuery, page);

      if (data.length === 0) {
        if (page === 1) {
          toast('Nothing found', {
            duration: 3000,
          });
        }
      } else {
        setPhotos(prevPhotos => [...prevPhotos, ...data]);
        if (data.length < 12) {
          toast('End of collection', {
            duration: 3000,
          });
          setHasMorePhotos(false);
        }
      }
    } catch (error) {
      setError('Pls reload page...');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const nextImage = (): void => {
    const currentIndex = photos.findIndex(photo => photo === selectedPhoto);
    if (currentIndex < photos.length - 1) {
      setSelectedPhoto(photos[currentIndex + 1]);
    }
  };

  const prevImage = (): void => {
    const currentIndex = photos.findIndex(photo => photo === selectedPhoto);
    if (currentIndex > 0) {
      setSelectedPhoto(photos[currentIndex - 1]);
    }
  };

  return (
    <>
      <SearchBar onSubmit={handleSearch} initialQuery={query || ''} />
      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      <ImageGallery photos={photos} onImageClick={handleImageClick} />
      {photos.length > 0 && !loading && !loadingMore && hasMorePhotos && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      {loadingMore && <Loader />}
      <ImageModal
        onClose={closeModal}
        photo={selectedPhoto}
        onNext={nextImage}
        onPrev={prevImage}
      />
      <Toaster position="top-center" />
    </>
  );
}

export default App;
