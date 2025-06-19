import { SubImage } from '../types/activity.types';
import { Schedule } from '../types/activity.types';
import {
  MyActivitiesFormData,
  CreateScheduleBody,
  UpdateMyActivityPayload,
} from '../types/my-activities.types';

export function mapToApiPayload(
  formData: MyActivitiesFormData,
  mode: 'create' | 'edit',
  options?: {
    subImageUrlsToAdd?: string[];
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

// 이미지 수정 로직
export function getSubImagesDiff(
  initialImages: SubImage[],
  currentImageUrls: string[]
): { subImageUrlsToAdd: string[]; subImageIdsToRemove: number[] } {
  const subImageUrlsToAdd = currentImageUrls.filter(
    (url) => !initialImages.some((img) => img.imageUrl === url)
  );
  const subImageIdsToRemove = initialImages
    .filter((img) => !currentImageUrls.includes(img.imageUrl))
    .map((img) => img.id);

  return { subImageUrlsToAdd, subImageIdsToRemove };
}

// 스케줄 수정 로직
export function getScheduleDiff(initial: Schedule[], current: CreateScheduleBody[]) {
  const schedulesToAdd: CreateScheduleBody[] = current.filter(
    (sch) =>
      !initial.some(
        (ini) =>
          ini.date === sch.date && ini.startTime === sch.startTime && ini.endTime === sch.endTime
      )
  );
  const scheduleIdsToRemove: number[] = initial
    .filter(
      (sch) =>
        !current.some(
          (cur) =>
            cur.date === sch.date && cur.startTime === sch.startTime && cur.endTime === sch.endTime
        )
    )
    .map((sch) => sch.id);

  return { schedulesToAdd, scheduleIdsToRemove };
}

// 🔥 diff + 변환 한 번에!
export function buildUpdateActivityPayload({
  initialImages,
  initialSchedules,
  formData,
}: {
  initialImages: SubImage[];
  initialSchedules: Schedule[];
  formData: MyActivitiesFormData;
}): UpdateMyActivityPayload {
  const { subImageUrlsToAdd, subImageIdsToRemove } = getSubImagesDiff(
    initialImages,
    formData.subImageUrls ?? []
  );
  console.log('🟦 getSubImagesDiff:');
  console.log(
    '  - initial:',
    initialImages.map((i) => i.imageUrl)
  );
  console.log('  - current:', formData.subImageUrls);
  console.log('  - 추가될 url:', subImageUrlsToAdd);
  console.log('  - 삭제될 id:', subImageIdsToRemove);
  const { schedulesToAdd, scheduleIdsToRemove } = getScheduleDiff(
    initialSchedules,
    formData.schedules ?? []
  );
  return mapToApiPayload(formData, 'edit', {
    subImageUrlsToAdd,
    subImageIdsToRemove,
    schedulesToAdd,
    scheduleIdsToRemove,
  }) as UpdateMyActivityPayload;
}
