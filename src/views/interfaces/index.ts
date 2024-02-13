export interface talksInterface {
    id: string;
    title: string;
    name: string;
    description: string;
    image: string;
    thumbnail:string;
}

export interface talkDataInterface {
    videos: talksInterface[],
    spanSize: number;
}

export interface featuredTalkInterface {
    data: {
        title: string;
        description: string;
        thumbnail: string;
    }
}

export interface DynammicTalksArray {
    data: talkDataInterface | undefined
}