class CreatePictures < ActiveRecord::Migration
  def change
    create_table  :pictures do |t|
      t.string    :title
      t.text      :comment
      # used only to pass url to view
      t.text      :url
#      t.foreign_key :albums
#      t.foreign_key :locations
      t.integer   :album_id
      t.integer   :location_id
      t.timestamps
    end

#    add_foreign_key(:pictures, :albums)
#    add_foreign_key(:pictures, :locations)
#    add_foreign_key :albums, :pictures
#    add_foreign_key :locations, :pictures
  end
end
