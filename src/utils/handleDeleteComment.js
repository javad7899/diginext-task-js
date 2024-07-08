export const handleCommet = async (event, comments, commentText, setCommentText, onAddComment, userId) => {
    event.preventDefault();

    const newComment = {
        id: comments.length + 1,
        text: commentText
    };

    try {
        const response = await fetch(`http://localhost:4000/profile-data/${userId}`);
        const profileData = await response.json();

        const updatedComments = [...profileData.comments, newComment];

        const updateResponse = await fetch(`http://localhost:4000/profile-data/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...profileData, comments: updatedComments })
        });

        if (!updateResponse.ok) {
            throw new Error('Failed to post comment');
        }

        console.log('Comment posted successfully!');

        onAddComment(newComment);
    } catch (error) {
        console.error('Error posting comment:', error);
    }

    setCommentText("");
};