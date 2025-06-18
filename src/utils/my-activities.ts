import {
  MyActivitiesFormData,
  CreateScheduleBody,
  UpdateMyActivityPayload,
} from '../types/my-activities.types';

export function mapToApiPayload(
  formData: MyActivitiesFormData,
  mode: 'create' | 'edit',
  options?: {
    subImageIdsToRemove?: number[];
    scheduleIdsToRemove?: number[];
    schedulesToAdd?: CreateScheduleBody[];
  }
): MyActivitiesFormData | UpdateMyActivityPayload {
  if (mode === 'create') {
    return formData;
  }

  return {
    title: formData.title,
    description: formData.description,
    category: formData.category,
    price: formData.price,
    address: formData.address,
    bannerImageUrl: formData.bannerImageUrl,
    subImageUrlsToAdd: formData.subImageUrls ?? [],
    subImageIdsToRemove: options?.subImageIdsToRemove ?? [],
    scheduleIdsToRemove: options?.scheduleIdsToRemove ?? [],
    schedulesToAdd: options?.schedulesToAdd ?? [],
  };
}
