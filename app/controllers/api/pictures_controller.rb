# rails g controller Pictures
#require 'fileutils'

class Api::PicturesController < ApplicationController
  before_action :set_picture, only: [:show, :update, :destroy]
  after_action :remove_hard_picture, only: [:destroy]
  
  def create
    @picture = Picture.new(picture_params)
    if @picture.save
      render json: @picture, status: 201
    else
      render json: @picture.errors, status: 201
    end
  end
  
  def update
    if @picture.update(picture_params)
      render json: @picture, status: 201
    else
      render json: @picture.errors, status: 201
    end
  end

  # If numberGet exist, we inverse the order and take the last 'numberGet' ones 
  def index
    @pictures = Picture.where(album_id: params[:album_id])
    if (params.has_key?(:numberGet))
      @pictures = @pictures.last(params[:numberGet]).reverse;
    end
    # loop on pictures and add urlPicture to every picture
    for picture in @pictures
      picture.url = {
        'tsquare' => picture.file.url(:tsquare), 
        'medium' => picture.file.url(:medium),
        'small' => picture.file.url(:small)
      }
    end
    render json: @pictures, status: 201
  end
  
  def show
  end

  def destroy
    if @picture.delete
      render json: @picture, status: 201
    else
      render json: @picture.errors, status: 201
    end
  end
  
  private
    def picture_params
      params.permit(:title, :file, :comment, :album_id, :location_id)
    end
    
    def set_picture
      @picture = Picture.find(params[:id])
    end

  def remove_hard_picture
    FileUtils.rm_r(Rails.public_path.to_s + "/pictures/" + @picture.id.to_s)
  end
end
