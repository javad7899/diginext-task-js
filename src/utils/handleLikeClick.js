export const handleLikeClick = async (setProfilesData, userId, increment) => {
    setProfilesData((prevProfilesData) => {
        const updatedProfilesData = prevProfilesData.map(profile => {
            if (profile.id === userId) {
                const updatedProfile = {
                    ...profile,
                    like: profile.like + increment,
                };

                fetch(`http://localhost:4000/profile-data/${updatedProfile.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedProfile),
                })
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then((data) => {
                        console.log('Success:', data);
                    })
                    .catch((error) => {
                        console.error('Fetch error:', error);
                    });

                return updatedProfile;
            }
            return profile;
        });

        return updatedProfilesData;
    });
};
