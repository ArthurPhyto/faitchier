import { useState, useEffect } from 'react';
import { onSnapshot, Timestamp, QueryDocumentSnapshot } from 'firebase/firestore';
import { RandomURL } from '../types';
import { createProjectUrlsQuery } from '../services/queries';

const convertTimestamp = (timestamp: any): Date => {
  if (timestamp instanceof Timestamp) {
    return timestamp.toDate();
  }
  return new Date();
};

const convertDoc = (doc: QueryDocumentSnapshot): RandomURL => {
  const data = doc.data();
  return {
    id: doc.id,
    projectId: data.projectId,
    path: data.path,
    targets: data.targets || [],
    createdAt: convertTimestamp(data.createdAt),
    updatedAt: convertTimestamp(data.updatedAt),
    active: data.active ?? true
  };
};

export function useProjectUrls(projectId: string | undefined) {
  const [urls, setUrls] = useState<RandomURL[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!projectId) {
      setUrls([]);
      setIsLoading(false);
      return;
    }

    const urlsQuery = createProjectUrlsQuery(projectId);

    const unsubscribe = onSnapshot(
      urlsQuery,
      (snapshot) => {
        try {
          const urlsData = snapshot.docs.map(convertDoc);
          console.log('Loaded URLs:', urlsData); // Debug log
          setUrls(urlsData);
          setIsLoading(false);
          setError(null);
        } catch (err) {
          console.error('Error processing URLs:', err);
          setError(err as Error);
          setIsLoading(false);
        }
      },
      (error) => {
        console.error('Error loading URLs:', error);
        setError(error as Error);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, [projectId]);

  return { urls, isLoading, error };
}