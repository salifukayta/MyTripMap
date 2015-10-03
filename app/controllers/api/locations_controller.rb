# rails g controller Locations
class Api::LocationsController < ApplicationController
  before_action :set_location, only: [:update, :destroy, :show]
  
  def create
    @location = Location.new(location_params)
    @location.save
    render json: @location, status: 201
  end

  def update
    @location.update(location_params)
    render json: @location, status: 201
  end

  def show
    render json: @location, status: 201
  end

  def index
    @locations = Location.all()
    render json: @locations, status: 201
  end
  
  def destroy
    @location.delete
    render json: @location, status: 201
  end

  private
  def location_params
    params.require(:location).permit(:id, :place, :city, :country, :latitude, :longitude)
  end

  def set_location
    @location = Location.find(params[:id])
  end
end
