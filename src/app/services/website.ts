export interface Website {
    url: string;
    status: string;
    responseTime: number;
    screen: string
    retryCount: number;
}

export interface ApiResponse {
  results: Website[];
  logs: string;
}
