export interface IDocument {
  id: number;
  name: string;
  original_name: string;
  path: string;
  mime_type: string;
  size: number;
}

export interface IDocumentUpdate {
  id: number;
  name: string;
  file?: File | null;
}

export interface IDocumentUpdateForm {
  name: string;
  file?: File | null;
}
export interface IDocumentAddForm {
  name: string;
  file?: File | null;
}

export interface IDocumentColumn {
  id: string;
  label: string;
  minWidth?: number;
  align?: string;
}

export interface ISearchDocumentForm {
  name?: string;
}
