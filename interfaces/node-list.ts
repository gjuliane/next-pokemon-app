export interface NodesListResponse {
    nodes: NodeListResponse[];
}

export interface NodeListResponse {
    title:  string;
    url:    string;
    images: ImagesListResponse;
}

export interface ImagesListResponse {
    desktop: string;
    ipad:    string;
    mobile:  string;
    alt:     string;
    title:   string;
    caption: string;
}
