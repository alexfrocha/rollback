export interface ArchiveProps {
  id?: string;
  name: string;
  folderId: string;
  userId: string;
  content: string;
  type: string;
}

export interface ArchiveNameAndIdProps {
  id: string;
  name: string;
}
