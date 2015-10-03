# rails g controller Pictures
class PicturesController < ApplicationController
def new
end

def create
  @picture = Picture.new(picture_params)
 
  @picture.save
  @album = Album.find(@picture.album_id)
  redirect_to '/locations/'+@album.location_id.to_s+'/albums/'+@picture.album_id.to_s+'/pictures/'+@picture.id.to_s
end

def show
  @picture = Picture.find(params[:id])
end

private
  def picture_params
    params.require(:picture).permit(:name, :file_name, :date_time_taken, :comment, :album_id)
  end

end
