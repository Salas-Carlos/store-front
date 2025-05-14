import axios from 'axios';


type HttpStatusCode = 'get ' | 'post' | 'put' | 'patch' | 'delete';

interface OptionRequest {
    url: string;
    method: HttpStatusCode;
    data?: any;
    headers?: any;
}

interface Response<T> {
    status: number;
    code: string;
    messsage: string;
    data: T;
}


export class BackClient {

    private baseURL: string;

    constructor(baseURL: string) {
        this.baseURL = baseURL;
    }

    async call<T>({ url, method, data, headers }: OptionRequest): Promise<Response<T>> {

        const response = await axios.request({
            url: `${this.baseURL}/${url}`,
            method,
            data,
            headers,
        })
        return response.data;
    }
}

export const Client = new BackClient(process.env.NEXT_PUBLIC_BACK_API_URL);