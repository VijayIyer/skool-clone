export function checkNewPostRequiredContent (
    title: string,
    content: string,
    category: string,
    user_id: string,
    user_name: string
) {
    if (!title || !content || !category) {
        return {
            isValid: false,
            message: 'Title, content, and categories are required'
        }
    }

    if (!user_id || !user_name) {
        return {
            isValid: false,
            message: 'user_id and user_name are required'
        }
    }

    return {
        isValid: true,
    }
}

export function checkNewPostRequiredEmptyContent (
    comments: string[],
    likes: string[],
) {
    if (comments.length !== 0 || likes.length !== 0) {
        return {
            isEmpty: false,
            message: 'Comments or likes are not empty'
        }
    }

    return {
        isEmpty: true,
    }
}

export function checkNewPostPollContent (poll: { option: string; votes: number[] }[]) {
    for (const optionObj of poll) {
        if (optionObj.votes.length !== 0) {
            return {
                isValid: false,
                message: 'Poll\'s vote is not empty'
            }
        }
        if (optionObj.option === '') {
            return {
                isValid: false,
                message: 'Poll\'s option is empty'
            }
        }
    }

    return {
        isValid: true,
    }
}