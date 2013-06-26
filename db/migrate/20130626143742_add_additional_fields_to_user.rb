class AddAdditionalFieldsToUser < ActiveRecord::Migration
  def change
    add_column :users, :organization, :string
    add_column :users, :name, :string
  end
end
