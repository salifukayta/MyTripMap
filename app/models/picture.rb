#v1: rails generate model Picture name:string file_name:string date_time_taken:datetime comment:text Album:references
#v2: rails generate model Picture name:string file_name:string date_time_taken:datetime comment:text Album:references location:references
class Picture < ActiveRecord::Base
  belongs_to :Album
  belongs_to :location
  
  validates :file,
    attachment_content_type: { content_type: /\Aimage\/.*\Z/ },
    attachment_size: { less_than: 5.megabytes }
    
  has_attached_file :file, 
    :path => ':rails_root/public/pictures/:id/:style.:extension',
    :url => '/pictures/:id/:style.:extension',
    styles: {
      tsquare: '100x100#',
      thumb: '100x100>',
      square: '200x200#',
      medium: '300x300>'
  }
  
end
