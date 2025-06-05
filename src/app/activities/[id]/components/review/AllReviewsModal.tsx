'use client';

import { useEffect, useState } from 'react';
import { useInView } from 'framer-motion';
import ReviewCard from './ReviewCard';
import { useModalStore } from '@/src/store/modalStore';
import { Review } from '@/src/types/review.types';

interface AllReviewsModalProps {
  reviews: Review[];
  rating: number;
}

const ITEMS_PER_PAGE = 2;

export default function AllReviewsModalProps({ reviews, rating }: AllReviewsModalProps) {
  const { closeModal } = useModalStore();
  // const { ref, inView } = useInView();
  const [page, setPage] = useState(1);
}
