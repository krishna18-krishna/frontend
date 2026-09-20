export type Task = {
  id: number;
  title: string;
  project: { name: string };
  priority: string;
  status: string;
  dueDate: string;
  isOverdue: boolean;
};

export type ActivityItem = {
  id: number;
  action: string;
  createdAt: string;
  user: { name: string };
  task?: { title: string };
};
