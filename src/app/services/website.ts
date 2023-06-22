export interface Website {
    url: string;
    status: string;
    responseTime: number;
    screen: string
}

export interface ApiResponse {
  results: Website[];
  logs: string;
}
