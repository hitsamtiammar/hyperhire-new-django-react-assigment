import { ListDataItem } from "@/components/data/ListData"

export interface GetRootResponse {
    data: RootMenuItem[]
}

export interface GetAllDataResponse {
  data: ListDataItem
}
  
export interface RootMenuItem {
  menu_id: string
  name: string
  parent: string
  created_at: string
  updated_at: string
}
  