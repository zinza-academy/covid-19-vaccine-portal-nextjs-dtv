import { IInjectionPoint } from '@/mockData/ InjectionPoints';
import { IProvinceForm } from '@/types/address';

export const SearchVaccinationPoints = (data: IInjectionPoint[], condition: IProvinceForm) => {
  return data.filter(
    (point) =>
      point.province?.id === condition.province &&
      point.district?.id === condition.district &&
      point.ward?.id === condition.ward
  );
};
