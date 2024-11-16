import { Priority } from "./todo"

export interface TodoFilterRequest{
    title?: string
    from?: string;
    to?: string;
    is_completed?: boolean | string;
    limit?: number
    priority: Priority,
    page?: string
}