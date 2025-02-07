export type User = {
    userName?:string;
    id: string;
    email:string;
}

export interface Picture {
    copyright: string;
    date: string;
    explanation: string;
    hdurl: string;
    media_type: string;
    service_version: string;
    title: string;
    url: string;
  }