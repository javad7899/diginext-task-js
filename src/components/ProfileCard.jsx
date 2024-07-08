import { useState } from "react";
import { FaRegUser, FaEnvelope, FaHeart, FaRegCommentAlt, FaTrashAlt } from "react-icons/fa";
import { handleCommet } from "../utils/handleSubmitComment";

const ProfileCard = ({ userId, name, specialization, email, onIncreaseLike, onDecreaseLike, like, comments, onAddComment, onDelete, onDeleteComment }) => {
  const [commentText, setCommentText] = useState("");

  return (
    <div className="w-full max-w-lg overflow-hidden bg-white rounded-lg border border-gray-200">
      <div className="px-6 py-4">
        <div className="flex gap-4 w-full justify-between">
          <div className="flex flex-col gap-2">
            <FaRegUser
              size={48}
              className="transition-colors duration-300 text-gray-800 hover:text-white"
            />
            <div className="flex flex-col">
              <h1 className="text-xl font-semibold text-gray-800">{name}</h1>
              <p className="py-2 text-gray-700">{specialization}</p>
              <div className="flex items-center gap-1 text-gray-700">
                <FaEnvelope size={20} />
                <h1 className="px-2 text-sm">{email}</h1>
              </div>
            </div>
          </div>
          <button onClick={onDelete} className="px-6 py-2 h-fit text-red-600 hover:text-red-500 transition duration-300 transform underline">
            Delete Profile
          </button>
        </div>
        <div className="mt-6 flex items-center justify-between">
          <div className="flex overflow-hidden bg-white border divide-x rounded-lg">
            <button className="px-4 py-2 text-sm font-medium text-gray-600 transition-colors duration-200 sm:text-base sm:px-6 hover:bg-gray-100" onClick={onIncreaseLike}>
              Like
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-600 transition-colors duration-200 sm:text-base sm:px-6 hover:bg-gray-100" onClick={onDecreaseLike}>
              Dislike
            </button>
          </div>
          <div className="flex items-center gap-2">
            <FaHeart className="text-red-600" size={28} />
            <span>{like}</span>
          </div>
        </div>
        <form onSubmit={(event) => handleCommet(event, comments, commentText, setCommentText, onAddComment, userId)} className="max-w-lg overflow-hidden bg-white rounded-lg border border-gray-200 flex items-center justify-between w-full p-2 px-3 mt-8">
          <FaRegCommentAlt size={28} />
          <input value={commentText} onChange={(e) => setCommentText(e.target.value)} type="text" placeholder="Write a comment for this user..." className="w-full p-2 text-gray-700 placeholder-gray-400/70 focus:outline-none" />
          <button type="submit" className="px-6 py-2 font-medium text-white transition-all duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500">
            Comment
          </button>
        </form>
        {comments.length > 0 && <div className="border border-gray-200 mt-8 w-full p-2 px-3 flex flex-col gap-3">
          {comments.map((comment, index) => (
            <div key={comment.id} className="flex justify-between">
              <p>{index + 1}: {comment.text}</p>
              <FaTrashAlt size={16} className="text-gray-500 hover:text-red-600 cursor-pointer transition duration-300" onClick={() => onDeleteComment(comment.id)} />
            </div>
          ))}
        </div>}
      </div>
    </div>
  );
};

export default ProfileCard;
