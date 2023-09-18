export function getImageArray(attachments: { id: string, url: string, fileType: string }[]) {
    const imageArr = [];
    for (const attachment of attachments) {
        const {fileType} = attachment;
        if (fileType === 'attachment') {
            const {id, url} = attachment;
            imageArr.push({id, url});
        }
    }
    return imageArr;
}