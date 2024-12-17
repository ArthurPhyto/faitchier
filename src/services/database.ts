import { db } from '../config/firebase';
import { collection, addDoc, deleteDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import type { Project, RandomURL, TargetURL } from '../types';
import { COLLECTIONS } from './collections';

export const createProject = async (name: string): Promise<void> => {
  const projectData = {
    name,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };
  
  await addDoc(collection(db, COLLECTIONS.PROJECTS), projectData);
};

export const createRandomUrl = async (
  projectId: string,
  path: string,
  targets: Omit<TargetURL, 'id'>[]
): Promise<void> => {
  const urlData = {
    projectId,
    path,
    targets: targets.map((target, index) => ({ 
      ...target, 
      id: `target-${Date.now()}-${index}` 
    })),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    active: true
  };
  
  await addDoc(collection(db, COLLECTIONS.URLS), urlData);
};

export const updateUrlTargets = async (
  urlId: string,
  targets: TargetURL[]
): Promise<void> => {
  const urlRef = doc(db, COLLECTIONS.URLS, urlId);
  await updateDoc(urlRef, { 
    targets,
    updatedAt: serverTimestamp()
  });
};

export const deleteUrl = async (urlId: string): Promise<void> => {
  await deleteDoc(doc(db, COLLECTIONS.URLS, urlId));
};