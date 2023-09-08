
export function isLiked(card, currentUser) {
  return card.likes.some(likeId => likeId === currentUser._id);
}