export interface Group {
    name: string,
    type: string,
    about: {
        text: string,
        media: string[] | null;
    },
    paymentType: string
}

export interface AboutProps {
    group?: Group;
    creator?: {
        fullName: string
    };
    memberNum?: number
}
