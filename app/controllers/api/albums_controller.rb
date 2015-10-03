# rails g controller Albums
class Api::AlbumsController < ApplicationController
  before_action :set_album, only: [:update, :destroy]
  
  def create
    @album = Album.new(album_params)
    @album.save
    render json: @album, status: 201
  end

  def update
    @album.update(album_params)
    render json: @album, status: 201
  end

  def index
    @albums = Album.all()
    render json: @albums, status: 201
  end
  
  def destroy
    @album.delete
    render json: @album, status: 201
  end

  private
  def album_params
#    params.permit(:id, :name, :file_name, :comment, :location_id, :user_id)
    params.require(:album).permit(:name, :file_name, :comment, :user_id)
  end

  def set_album
    @album = Album.find(params[:id])
  end
end
