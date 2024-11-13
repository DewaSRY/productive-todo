import { BlobOptions } from "buffer";


export interface TodoFilterRequest{
    name?: string
    from?: string;
    to?: string;
    is_comleted?: boolean;
    limit?:number
}