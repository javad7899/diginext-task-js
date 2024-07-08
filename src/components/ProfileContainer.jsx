import { useState } from "react";
import ProfileCard from "./ProfileCard";
import { LuSearch } from "react-icons/lu";
import { BsSortUp, BsSortDown } from "react-icons/bs";
import { handleLikeClick } from "../utils/handleLikeClick";

const ProfileContainer = ({ profilesData, setProfilesData, error }) => {
  const [isAscending, setIsAscending] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleAddComment = (userId, newComment) => {
    const updatedProfiles = profilesData.map((profile) => {
      if (profile.id === userId) {
        return {
          ...profile,
          comments: [...profile.comments, newComment]
        };
      }
      return profile;
    });

    setProfilesData(updatedProfiles);
  };

  const handleDeleteProfile = (id) => {
    fetch(`http://localhost:4000/profile-data/${id}`, {
      method: 'DELETE',
    })
      .then(res => {
        if (res.ok) {
          setProfilesData(profilesData.filter(profile => profile.id !== id));
          console.log("Data successfully deleted");
        } else {
          console.error('Failed to delete the item.');
        }
      })
      .catch(error => console.error('Error deleting data:', error));
  };

  const handleDeleteComment = (userId, commentId) => {
    const updatedProfiles = profilesData.map(profile => {
      if (profile.id === userId) {
        const updatedComments = profile.comments.filter(comment => comment.id !== commentId);
        return { ...profile, comments: updatedComments };
      }
      return profile;
    });

    setProfilesData(updatedProfiles);

    const profileToUpdate = updatedProfiles.find(profile => profile.id === userId);
    const payload = {
      ...profileToUpdate,
      comments: profileToUpdate.comments
    };

    fetch(`http://localhost:4000/profile-data/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    })
      .then(response => {
        if (!response.ok) {
          console.error("Failed to delete comment on server");
          setProfilesData(prevProfilesData => [...prevProfilesData]);
        }
      })
      .catch(error => console.error("Error deleting comment:", error));
  };




  const sortProfiles = (profiles, ascending) => {
    return profiles.sort((a, b) => {
      const profileA = a.like;
      const profileB = b.like;

      if (profileA < profileB) return ascending ? -1 : 1;
      if (profileA > profileB) return ascending ? 1 : -1;
      return 0;
    });
  };

  const filteredProfiles = profilesData.filter(profile => {
    return searchValue.toLowerCase() === ""
      ? profile
      : profile.name.toLowerCase().includes(searchValue.toLowerCase());
  });

  const sortedAndFilteredProfiles = sortProfiles(filteredProfiles, isAscending);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col gap-8 w-full border border-gray-200 items-center justify-center py-8">
      <div className="max-w-lg flex gap-6 items-center w-full">
        <div className="max-w-lg overflow-hidden bg-white rounded-lg border border-gray-200 flex items-center justify-between w-full p-2 px-3">
          <LuSearch size={28} />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search name of user..."
            className="w-full p-2 text-gray-700 placeholder-gray-400/70 focus:outline-none"
          />
        </div>
        <button onClick={() => setIsAscending(!isAscending)}>
          {isAscending ? <BsSortDown size={28} /> : <BsSortUp size={28} />}
        </button>
      </div>

      {sortedAndFilteredProfiles.length > 0 ? (
        sortedAndFilteredProfiles.map((item, index) => (
          <ProfileCard
            key={index}
            {...item}
            userId={item.id}
            onAddComment={(newComment) => handleAddComment(item.id, newComment)}
            onIncreaseLike={() => handleLikeClick(setProfilesData, index, 1)}
            onDecreaseLike={() => handleLikeClick(setProfilesData, index, -1)}
            onDelete={() => handleDeleteProfile(item.id)}
            onDeleteComment={(commentId) => handleDeleteComment(item.id, commentId)}
          />
        ))
      ) : (
        <h2 className="text-xl">There are no profiles to display.</h2>
      )}
    </div>
  );
};

export default ProfileContainer;
