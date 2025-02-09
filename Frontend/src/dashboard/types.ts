export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  percentage: number;
  subjects: {
    math: number;
    science: number;
    english: number;
    socialStudies: number;
    hindi: number;
  };
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (student: Omit<Student, 'id'>) => void;
}