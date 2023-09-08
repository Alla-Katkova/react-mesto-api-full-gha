
export function isLiked(card, currentUser) {
  //console.log('i._id')
  //console.log(currentUser._id)
  if (card.likes === undefined) {
    return false
  }
  console.log(card.likes)
  return card.likes.some(i => i._id === currentUser._id);
}