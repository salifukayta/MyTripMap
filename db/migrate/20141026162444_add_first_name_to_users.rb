class AddFirstNameToUsers < ActiveRecord::Migration
  def change
    add_column :users, :firstName, :string
  end
end
