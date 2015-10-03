#v1: rails g model album name:string file_name:string creation_date:datetime comment:text location:references user:references
#v2: rails g model album name:string file_name:string creation_date:datetime comment:text user:references --force
class Album < ActiveRecord::Base
  belongs_to :user
  
end
