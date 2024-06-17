interface IBase {
  id: number
  lo: string
  en: string
  is_active: boolean | null
}

export interface Province extends IBase {

}

export interface District extends IBase {
  prov_id?: number
  provinces: Province | null
}

export interface Village extends IBase {
  dist_id?: number
  districts: District | null
}
