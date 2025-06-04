export interface RatingLabelProps {
  rating: number;
}

export interface MyActivitiesProps extends RatingLabelProps {
  id: number;
  title: string;
  imageUrl: string;
  price: number;
}

// export interface ManagementDropdownProps {
//   isOpen: boolean;
//   onToggle: () => void;
//   onEdit: () => void;
//   onDelete: () => void;
// }
