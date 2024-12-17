export interface TargetURL {
  id: string;
  url: string;
  percentage: number;
}

export interface RandomURL {
  id: string;
  projectId: string;
  path: string;
  targets: TargetURL[];
  createdAt: Date;
  updatedAt: Date;
  active: boolean;
}

export interface Project {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}