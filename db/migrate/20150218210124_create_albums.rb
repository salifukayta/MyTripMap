class CreateAlbums < ActiveRecord::Migration
  def change
    create_table :albums do |t|
      t.string  :name
      t.text    :comment
#      t.foreign_key :users
      t.integer :user_id
      t.timestamps
    end
#    add_foreign_key :users, :albums
#    add_foreign_key(:albums, :users)
  end
end
