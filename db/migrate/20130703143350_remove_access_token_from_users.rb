class RemoveAccessTokenFromUsers < ActiveRecord::Migration
  def change
    remove_index :users, name: 'index_users_on_access_token'
    remove_column :users, :access_token
  end
end
