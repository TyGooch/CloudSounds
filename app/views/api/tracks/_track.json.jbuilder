user = User.find(track.user_id);
weather = Weather.find(track.weather_id)
json.set! track.id do
  json.id track.id
  json.title track.title
  json.description track.description
  json.user_id track.user_id if user
  json.username user.username if user
  json.weather_id track.weather_id
  json.audio_url track.audio_url
  json.image_url track.image_url
  json.peaks track.peaks
  json.weather_name weather.name
  json.like_count track.likes.count
  json.liked current_user.likes.where({track_id: track.id}).any? if current_user
  json.set! 'comments' do
    Track.find(track.id).comments.reverse.each do |comment|
      json.partial! 'api/comments/comment', comment: comment
    end
  end

end

# params.require(:track).permit(:title, :description, :audio_url,
#  :user_id, :image_url, :weather_id)
