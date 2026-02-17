import { Application } from '@/types/index';

export async function getApplications(): Promise<Application[]> {
  // Mock: Replace with actual fetch call to your API or DB
  return [
    {
      _id: '1234567890abcdef',
      submittedAt: new Date().toISOString(),
      state: 'Approved',
    },
    {
      _id: 'abcdef1234567890',
      submittedAt: new Date().toISOString(),
      state: 'Pending',
    },
  ];
}

export async function deleteApplication(id: string): Promise<void> {
  // Mock: Replace with actual API call
  console.log(`Deleted application ${id}`);
}

export async function deleteAllApplications(): Promise<void> {
  // Mock: Replace with actual API call
  console.log('Deleted all applications');
}
