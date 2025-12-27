export interface Category {
  id: string;
  title: string;
  icon: string;
  emissions: string;
  dataQuality: string;
  coverage: number;
  colorClass: string;
  headerBg: string;
  route: string;
}

export interface Scope {
  id: string;
  title: string;
  description: string;
  icon: string;
  progress: number;
  iconBg: string;
  categories: Category[];
}