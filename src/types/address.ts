export interface IProvince {
  id: string;
  name: string;
}

export interface IDistrict {
  id: string;
  name: string;
  province_id: string;
}

export interface IWard {
  id: string;
  name: string;
  district_id: string;
}

export interface IProvinceForm {
  province: string;
  district: string;
  ward: string;
}
