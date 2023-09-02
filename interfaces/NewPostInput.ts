export interface gifDataElementType {
    id: string,
    images: {
        fixed_height: {
            url: string
        }
    },
}

export interface gifDataType {
    type: string,
    gifArr: gifDataElementType[],
    offset: number,
}

export interface fileObj {
    type: string,
    fileId: string,
    uploadState: 'selection' | 'uploading' | 'preview',
    data: File | null | string,
}

export interface pollOptionType {
    optionId: string,
    content: string
}

export type pollOptionsArrType = pollOptionType[]