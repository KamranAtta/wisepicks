export interface talksInterface {
    videoId: string;
    iframeURL: string;
    _id: string;
    id: string;
    title: string;
    name: string;
    description: string;
    image: string;
    thumbnail:string;
    category: string;
    views: string;
    publishedAt: string;
    tags: string[];
    duration: string;
    channelTitle: string;
}

export interface talkDataInterface {
    videos: talksInterface[],
    spanSize: number,
}

export interface featuredTalkInterface {
    data: {
        id: string;
        _id: string;
        title: string;
        category: string;
        description: string;
        thumbnail: string;
        views: string;
        publishedAt: string;
        tags: string[];
        image: string;
    }
}

export interface DynammicTalksArray {
    data: talkDataInterface | undefined,
}