# rails g controller Uploads

class Api::UploadsController < ApplicationController

  def create
    # Upload done with paperclip

#    DataFile.save(params[:file], params[:user_id], params[:data])
    DataFile.save(params[:file], "1", params[:data])
    render json: {"updated" => "File has been uploaded successfully"}, status: 201
  end
  
end
