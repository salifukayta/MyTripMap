#rails generate model Location place:string city:string country:string latitude:float longitude:float
class Location < ActiveRecord::Base
   has_many :pictruces, dependent: :destroy

end



