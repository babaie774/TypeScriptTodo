export interface TodoType {
  id: number;
  content: string;
  time: number;
  status: 'active' | 'completed';
}

export type StatusType = 'all' | 'completed' | 'active';
