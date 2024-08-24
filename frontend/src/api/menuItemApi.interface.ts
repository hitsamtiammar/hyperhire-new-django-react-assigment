import { ListDataItem } from "@/components/data/ListData"

export interface GetRootResponse {
    data: RootMenuItem[]
}

export interface UpdateDeleteResponse{
  status: boolean;
  message: string
}

export interface AddResponse extends UpdateDeleteResponse{
  new_data: RootMenuItem
}

export interface UpdateRequest{
  name: string;
  id: string | null
}

export interface AddRequest{
  name: string;
  parent: string | null
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
  